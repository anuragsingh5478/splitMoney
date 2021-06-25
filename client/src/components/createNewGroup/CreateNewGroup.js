import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App";
import { Redirect } from "react-router";
import "./createNewGroup.css";
export default function CreateNewGroup() {
  const token = useContext(AuthContext);

  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [resMessage, setResponseMessage] = useState("");
  const [addMemberMessage, setAddMemberMessage] = useState("");
  const [createGroupMessage, setCreateGroupMessage] = useState("");
  const [groupId, setGroupId] = useState("");

  const addMember = () => {
    let newMember = {
      name: memberName,
      email: memberEmail,
    };

    if (newMember.email === "" || newMember.name === "") {
      setAddMemberMessage("Name and Email is Required!");
      return;
    }
    setMembers(members.concat(newMember));
    setMemberName("");
    setMemberEmail("");
    setAddMemberMessage("");
  };
  const deleteMember = (index) => {
    setMembers((members) =>
      members.filter((item, itemIndex) => itemIndex !== index)
    );
  };
  const showMembers = () => {
    return members.map((member, index) => (
      <div className="member-info" key={index}>
        <div>
          <div>Member{index + 1}:</div>
          <div>Name: {member.name}</div>
          <div>Email: {member.email}</div>
          <div>
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteMember(index)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const handleSubmit = () => {
    const newGroup = {
      groupName: groupName,
      groupMembers: members,
    };

    if (newGroup.groupName === "") {
      setCreateGroupMessage("Group Name is mandatory  !");
      return;
    }
    setCreateGroupMessage("");
    if (newGroup.groupMembers.length === 0) {
      setCreateGroupMessage("Minimum one member required !");
      return;
    }
    setCreateGroupMessage("");

    const baseUrl = "https://split-money-5478.herokuapp.com/";
    axios
      .post(baseUrl + "api/group/create-new-group", newGroup, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res.data);
        setGroupId(res.data.groupDetail._id);
        setResponseMessage(res.data.msg);
      })
      .catch((err) => console.log(err));
    // axios for post req

    // res -> msg, groupId

    // goto -> /group/groupId
  };
  return (
    <div className="create-new-group container">
      {/* heading - create new Group */}
      <div className="create-new-group-heading">Create New Group</div>
      {/* form */}
      {/* input - group name, add member name and email */}
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "block" }}>
        <div className="row">
          <div className="create-new-group-info col-sm-6">
            Enter Group Name:
          </div>
          <div className="col-sm-6 ">
            <input
              className="w-100 create-new-group-value "
              type="text"
              name="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group's Name"
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-6 create-new-group-info ">Add member:</div>

          <div className="col-sm-6">
            <div>
              <input
                className="w-100  create-new-group-value"
                type="text"
                name="member-name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="member's name"
              />
            </div>
            <div>
              <input
                className="w-100 create-new-group-value"
                type="text"
                name="member-email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                placeholder="member's email"
              />
            </div>
            {addMemberMessage}
            <div className="d-flex justify-content-center">
              <button
                className="w-50 m-auto btn btn-info "
                onClick={() => addMember()}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="create-new-group-info col-sm-6">Members:</div>
          <div className="member-list col-sm-6">
            {members.length === 0 ? "No Members Added" : showMembers()}
          </div>
        </div>
        <div>{createGroupMessage}</div>
        <div className="d-flex justify-content-center">
          {/* <div>{resMessage}</div> */}
          <input
            className="btn btn-info w-50"
            type="submit"
            onClick={() => handleSubmit()}
            value="Create New Group"
          />
        </div>
      </form>
      {resMessage === "success" && <Redirect to={"/group/" + groupId} />}
    </div>
  );
}
