const Group = require("../models/GroupModel");
const mailService = require("../mailService");

module.exports.settleUp = (req, res) => {
  const groupId = req.body.groupId;
  Group.findById(groupId).then((group) => {
    group.results = getResults(group.members, group.transactions);
    group.status = "settled";
    group.save().then((group) => res.json({ msg: "success", group: group }));
  });
};

const getResults = (members, transactions) => {
  const results = [];
  members.map((member) => {
    const temp = {
      _id: member._id,
      name: member.name,
      email: member.email,
      paidAmount: 0,
      finalAmount: 0,
    };
    results.push(temp);
  });

  let totalAmount = 0;
  transactions.map((transaction) => {
    const index = results.findIndex(
      (result) => result._id == transaction.paidByUserId
    );
    results[index].paidAmount += transaction.paidAmount;
    totalAmount += transaction.paidAmount;
  });

  let totalAmountForEachMember = totalAmount / members.length;
  for (let i = 0; i < results.length; i++) {
    results[i].finalAmount = Math.ceil(
      totalAmountForEachMember - results[i].paidAmount
    );
    mailService.sendEmail(results[i].email, results[i].finalAmount);
  }

  console.log(results);

  return results;
};
