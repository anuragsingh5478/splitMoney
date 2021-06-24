import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../App";

export default function ShowResult(props) {
  const token = useContext(AuthContext);
  const groupId = useParams().groupId;

  const [results, setResults] = useState([]);

  useEffect(() => {
    const baseUrl = "https://split-money-5478.herokuapp.com/";
    axios
      .get(baseUrl + "api/group/one/" + groupId, {
        headers: { token: token },
      })
      .then((res) => {
        setResults(res.data.groupDetail.results);
      })
      .catch((err) => console.log(err));
  }, [token, groupId]);

  const showResult = () => {
    return results.map((result) => (
      <div key={result._id}>
        {result.name}({result.email}){" "}
        {result.finalAmount < 0 ? " will get " : " will pay "} Rs.
        {Math.abs(Math.round(result.finalAmount))}
      </div>
    ));
  };
  return (
    <div className="result">
      <div className="heading">Results:</div>
      {showResult()}
    </div>
  );
}
