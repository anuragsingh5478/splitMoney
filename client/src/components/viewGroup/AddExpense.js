import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../App";
import axios from "axios";

export default function AddExpense(props) {
  const token = useContext(AuthContext);
  const groupId = useParams().groupId;

  const [paidByUserId, setPaidByUserId] = useState("");
  const [paidByUserName, setPaidByUserName] = useState("");
  const [paidByUserEmail, setPaidByUserEmail] = useState("");
  const [paidFor, setPaidFor] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  const handleSumbit = () => {
    const transactionData = {
      groupId: groupId,
      paidByUserId: paidByUserId,
      paidByUserName: paidByUserName,
      paidByUserEmail: paidByUserEmail,
      paidFor: paidFor,
      paidAmount: paidAmount,
      date: Date.now(),
    };

    const baseUrl = "https://split-money-5478.herokuapp.com/";
    axios
      .post(baseUrl + "api/group/add-transaction", transactionData, {
        headers: { token: token },
      })
      .then((res) => props.setTransactions(res.data.transactions));
    setPaidAmount(0);
    setPaidByUserEmail("");
    setPaidFor("");
  };

  const showOption = () => {
    return props.members.map((member) => (
      <option value={JSON.stringify(member)} key={member._id}>
        {member.name}({member.email})
      </option>
    ));
  };

  return (
    <div>
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
    </div>
  );
}
