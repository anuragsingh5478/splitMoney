const express = require("express");
const router = express.Router();

const verifyRoute = require("../routes/verifyRoute");

const createNewGroupController = require("../controllers/createNewGroupController");
const groupInfoController = require("../controllers/groupInfoContoller");
const addTransactionController = require("../controllers/addTransactionController");
router.get("/all", verifyRoute, groupInfoController.listGroups);

router.get("/one/:groupId", verifyRoute, groupInfoController.groupInfo);

router.post(
  "/create-new-group",
  verifyRoute,
  createNewGroupController.createNewGroup
);

router.post(
  "/add-transaction",
  verifyRoute,
  addTransactionController.addTransaction
);

module.exports = router;
