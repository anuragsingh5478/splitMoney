const Group = require("../models/GroupModel");

module.exports.addTransaction = (req, res) => {
  console.log("adding transaction");
  console.log(req.body);

  const transactionData = req.body;
  const newTransaction = {
    paidByUserId: transactionData.paidByUserId,
    paidByUserName: transactionData.paidByUserName,
    paidByUserEmail: transactionData.paidByUserEmail,
    paidFor: transactionData.paidFor,
    paidAmount: transactionData.paidAmount,
  };

  Group.findOne({ _id: transactionData.groupId })
    .then((group) => {
      group.transactions.push(newTransaction);

      group
        .save()
        .then((group) =>
          res.json({ msg: "success", transactions: group.transactions })
        );
    })
    .catch((err) => {
      console.error(err);
    });
};
