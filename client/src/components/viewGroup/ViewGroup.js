import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewGroup.css";

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export default function ViewGroup() {
  const [groupInfo, setGroupInfo] = useState({
    groupId: "",
    date: "",
    members: [],
    transactions: [],
    result: [],
    status: "",
  });
  const [paidByUserId, setPaidByUserId] = useState("");
  const [paidByUserName, setPaidByUserName] = useState("");
  const [paidByUserEmail, setPaidByUserEmail] = useState("");
  const [paidFor, setPaidFor] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  //   as i have no backend yet, i use transaction state seprately
  const [transactions, setTransactions] = useState([]);

  const showOption = () => {
    return groupInfo.members.map((member) => (
      <option value={JSON.stringify(member)}>
        {member.name}({member.email})
      </option>
    ));
  };

  useEffect(() => {
    // Todo: Update base url
    const baseUrl = "http://localhost:5000";
    const token = getToken();
    // Todo: Update groupId retrival method - line +2 and +15

    const groupId = "60d0b71ce97655182480573a";
    axios
      .get(baseUrl + "/api/group/one/" + groupId, {
        headers: { token: token },
      })
      .then((res) => {
        setGroupInfo(res.data);
        setTransactions(res.data.transactions);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSumbit = () => {
    const transactionData = {
      groupId: "60d0b71ce97655182480573a",
      paidByUserId: paidByUserId,
      paidByUserName: paidByUserName,
      paidByUserEmail: paidByUserEmail,
      paidFor: paidFor,
      paidAmount: paidAmount,
      date: Date.now(),
    };

    const baseUrl = "http://localhost:5000";
    const token = getToken();
    axios
      .post(baseUrl + "/api/group/add-transaction", transactionData, {
        headers: { token: token },
      })
      .then((res) => setTransactions(res.data.transactions));
    setPaidAmount(0);
    setPaidByUserEmail("");
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
          <div className="col-7 col-sm-9 value">{groupInfo.date}</div>
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
                setPaidByUserName(member.name);
                setPaidByUserEmail(member.email);
                setPaidByUserId(member._id);
              }}
            >
              <option defaultValue>Select User</option>
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
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
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
    </div>
  );
}
