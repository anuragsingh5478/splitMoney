import React, { useState, useEffect } from "react";
import "./viewGroup.css";

let resData = {
  groupId: "id-1",
  name: "Group A",
  createdAt: "20 July 2021",
  members: [
    { name: "anurag", email: "anurag@gmail.com" },
    { name: "golu", email: "golu@gmail.com" },
    { name: "molu", email: "molu@gmail.com" },
    { name: "anubhav", email: "anubhav@gmail.com" },
  ],
  transactions: [
    {
      paidByName: "anurag",
      paidByEmail: "anurag@gmail.com",
      paidFor: "milk",
      amount: 50,
      date: "22 July 2021",
    },
    {
      paidByName: "anubhav",
      paidByEmail: "anubhav@gmail.com",
      paidFor: "milk",
      amount: 50,
      date: "22 July 2021",
    },
    {
      paidByName: "anurag",
      paidByEmail: "anurag@gmail.com",
      paidFor: "milk",
      amount: 50,
      date: "22 July 2021",
    },
    {
      paidByName: "anubhav",
      paidByEmail: "anubhav@gmail.com",
      paidFor: "milk",
      amount: 50,
      date: "22 July 2021",
    },
  ],
};
export default function ViewGroup() {
  const [groupInfo, setGroupInfo] = useState({
    groupId: "",
    createdAt: "",
    members: [],
    transactions: [],
  });
  const [paidByName, setPaidByName] = useState("");
  const [paidByEmail, setPaidByEmail] = useState("");
  const [paidFor, setPaidFor] = useState("");
  const [amount, setAmount] = useState();

  //   as i have no backend yet, i use transaction state seprately
  const [transactions, setTransactions] = useState(resData.transactions);

  const showOption = () => {
    return groupInfo.members.map((member) => (
      <option value={JSON.stringify(member)}>
        {member.name}({member.email})
      </option>
    ));
  };

  useEffect(() => {
    setGroupInfo(resData);
  }, []);

  const handleSumbit = () => {
    const newTransaction = {
      paidByName: paidByName,
      paidByEmail: paidByEmail,
      paidFor: paidFor,
      amount: amount,
      date: Date.now(),
    };
    setTransactions(transactions.concat(newTransaction));
    setAmount(0);
    setPaidByEmail("");
    setPaidByName("Select User");
    setPaidFor("");
  };

  return (
    <div className="container">
      {/* group heading */}
      <div className="text-center h1">View Group</div>
      {/* group info */}
      <div className="group-info-card">
        <div className="row">
          <div className="col-5 col-sm-3 title">Group Name:</div>
          <div className="col-7  col-sm-9 value">{groupInfo.name}</div>
        </div>
        <div className="row">
          <div className="col-5 col-sm-3 title">Created At:</div>
          <div className="col-7 col-sm-9 value">{groupInfo.createdAt}</div>
        </div>
        <div className="row">
          <div className="col-sm-3 title">Members:</div>
          <div className="col-sm-9 value">
            {groupInfo.members.map((member) => (
              <div>
                {member.name} ({member.email})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* add expense */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "block" }}
        className="add-expense-card"
      >
        <div className="row">
          <div className="col-sm-3">
            <select
              className="w-100"
              required
              onChange={(e) => {
                const member = JSON.parse(e.target.value);
                setPaidByName(member.name);
                setPaidByEmail(member.email);
              }}
            >
              <option value="" disabled selected>
                Select User
              </option>
              {showOption()}
            </select>
          </div>

          <div className="col-sm-3">
            <input
              className="w-100"
              type="text"
              value={paidFor}
              onChange={(e) => setPaidFor(e.target.value)}
              placeholder="Paid For"
            ></input>
          </div>

          <div className="col-sm-3">
            <input
              className="w-100"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            ></input>
          </div>

          <div className="col-sm-3">
            <input
              className="w-100 btn btn-info"
              type="submit"
              onClick={() => handleSumbit()}
              value="add expense"
            ></input>
          </div>
        </div>
      </form>

      {/* show transaction */}
      <div className="transaction-card">
        {transactions.map((transaction) => (
          <div className="row ">
            <div className="col-sm-6">
              <div>Paid By:{transaction.paidByName}</div>
              <div>Paid By:{transaction.paidByEmail}</div>
              <div>Paid For: {transaction.paidFor}</div>
            </div>
            <div className="col-sm-6">
              <div>Amount Paid: {transaction.amount}</div>
              <div>Date: {transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
