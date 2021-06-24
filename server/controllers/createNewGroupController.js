const Group = require("../models/GroupModel");

module.exports.createNewGroup = (req, res) => {
  console.log("creating new group");
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
      console.log(group);
      res.json({ msg: "success", groupDetail: group });
    })
    .catch((err) => console.error(err));
};
