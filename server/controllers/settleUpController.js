const Group = require("../models/GroupModel");
const mailService = require("../mailService");

// Function to Settle Up Transactions of a Group with given groupId
module.exports.settleUp = (req, res) => {
  // Finding the group, calculating the result, and updating it status as "settled"
  const groupId = req.body.groupId;
  Group.findById(groupId).then((group) => {
    group.results = getResults(group.members, group.transactions);
    group.status = "settled";
    group.save().then((group) => res.json({ msg: "success", group: group }));
  });
};

// Fuction to Calculating and Returning the Result
const getResults = (members, transactions) => {
  const results = [];
  // Creating a result template for all the users.
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

  // Calculating the TotalAmount spent in the Group.
  let totalAmount = 0;
  transactions.map((transaction) => {
    const index = results.findIndex(
      (result) => result._id == transaction.paidByUserId
    );
    results[index].paidAmount += transaction.paidAmount;
    totalAmount += transaction.paidAmount;
  });

  // Calculating the Amount that each user had to pay.
  let totalAmountForEachMember = totalAmount / members.length;

  // Calculating the Amount each user owe.
  // Let Final Amount be x.
  // Amount positive -> user had to pay x amount
  //  Amount negative -> user will recieve x amount.
  for (let i = 0; i < results.length; i++) {
    results[i].finalAmount = Math.ceil(
      totalAmountForEachMember - results[i].paidAmount
    );
    mailService.sendEmail(results[i].email, results[i].finalAmount);
  }

  // console.log(results);

  return results;
};
