import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../App";
import ShowResult from "./ShowResult";
import AddExpense from "./AddExpense";
import ShowTransactions from "./ShowTransactions";
import "./viewGroup.css";

export default function ViewGroup(props) {
  const token = useContext(AuthContext);
  const groupId = useParams().groupId;

  const [groupInfo, setGroupInfo] = useState({
    groupId: "",
    date: "",
    members: [],
    transactions: [],
    results: [],
    status: "active",
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Todo: Update base url
    const baseUrl = "http://localhost:5000";
    axios
      .get(baseUrl + "/api/group/one/" + groupId, {
        headers: { token: token },
      })
      .then((res) => {
        setGroupInfo(res.data.groupDetail);
        setTransactions(res.data.groupDetail.transactions);
      })
      .catch((err) => console.log(err));
  }, [token, groupId]);

  const settleUp = () => {
    const baseUrl = "http://localhost:5000";
    const data = { groupId: groupId };
    axios
      .post(baseUrl + "/api/group/settle-up", data, {
        headers: { token: token },
      })
      .then((res) => setGroupInfo(res.data.group));
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
          <div className="col-7 col-sm-9 value">
            {groupInfo.date.substr(0, 10)}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 title">Members:</div>
          <div className="col-sm-9 value">
            {groupInfo.members.map((member, index) => (
              <div key={member._id}>
                {index + 1}. {member.name} ({member.email})
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-warning  justify-items-center"
            onClick={settleUp}
          >
            {groupInfo.status === "active" ? "Settle Up" : "Settled"}
          </button>
        </div>
      </div>
      {/* Show Results or Add More Expenses*/}
      {groupInfo.status === "active" ? (
        <AddExpense
          setTransactions={setTransactions}
          members={groupInfo.members}
        />
      ) : (
        <ShowResult results={groupInfo.results} />
      )}

      {/* show transaction */}
      <ShowTransactions transactions={transactions} />
    </div>
  );
}
