const Group = require("../models/GroupModel");

// Function to Create New Group
module.exports.createNewGroup = (req, res) => {
  const data = req.body;
  const newGroup = new Group({
    name: data.groupName,
    userId: req.userId,
    members: data.groupMembers,
    status: "active",
  });

  newGroup
    .save()
    .then((group) => {
      res.json({ msg: "success", groupDetail: group });
    })
    .catch((err) => console.error(err));
};
