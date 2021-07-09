const Group = require("../models/GroupModel");

// Function to Add Transactions to a Group with given groupId
module.exports.addTransaction = (req, res) => {
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
