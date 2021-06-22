const Group = require("../models/GroupModel");

module.exports.listGroups = (req, res) => {
  Group.find({ userId: req.userId }).then((groups) =>
    res.send(groups).catch((err) => res.json({ msg: "error" }))
  );
};

module.exports.groupInfo = (req, res) => {
  const groupId = req.params.groupId;
  Group.findOne({ _id: groupId })
    .then((group) => res.send(group))
    .catch((err) => console.error(err));
};
