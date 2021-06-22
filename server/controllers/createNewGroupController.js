const Group = require("../models/GroupModel");

module.exports.createNewGroup = (req, res) => {
  console.log("creating new group");
  const data = req.body.groupData;
  const newGroup = new Group({
    name: data.name,
    userId: req.userId,
    members: data.members,
    status: "active",
  });

  newGroup
    .save()
    .then((group) => {
      console.log(group);
    })
    .catch((err) => console.error(err));

  res.send("group created");
};
