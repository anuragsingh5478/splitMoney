const Group = require("../models/GroupModel");

// Function return list of all groups of a User with given userId.
module.exports.listGroups = (req, res) => {
  Group.find({ userId: req.userId })
    .then((groups) => res.json({ msg: "success", groupsDetail: groups }))
    .catch((err) => res.json({ msg: "error" }));
};

// Funtion return group info of a particular Group with given groupId.
module.exports.groupInfo = (req, res) => {
  const groupId = req.params.groupId;
  Group.findOne({ _id: groupId })
    .then((group) => res.json({ msg: "success", groupDetail: group }))
    .catch((err) => console.error(err));
};
