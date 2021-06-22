import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../App";
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
    result: [],
    status: "",
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
        setGroupInfo(res.data);
        setTransactions(res.data.transactions);
      })
      .catch((err) => console.log(err));
  }, [token, groupId]);

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
              <div key={member._id}>
                {member.name} ({member.email})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* add expense */}
      <AddExpense
        setTransactions={setTransactions}
        members={groupInfo.members}
      />

      {/* show transaction */}
      <ShowTransactions transactions={transactions} />
    </div>
  );
}
