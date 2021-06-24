import React from "react";

export default function ShowTransactions(props) {
  return (
    <div className="transaction-card">
      <div className="heading">Transaction History:</div>
      {props.transactions.map((transaction) => (
        <div className="row " key={transaction._id}>
          <div className="col-sm-6">
            <div>Paid By:{transaction.paidByUserName}</div>
            <div>Paid By:{transaction.paidByUserEmail}</div>
            <div>Paid For: {transaction.paidFor}</div>
          </div>
          <div className="col-sm-6">
            <div>Amount Paid: {transaction.paidAmount}</div>
            <div>Date: {transaction.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
