const express = require("express");
const router = express.Router();

const verifyRoute = require("../routes/verifyRoute");

const createNewGroupController = require("../controllers/createNewGroupController");
const listGroupsController = require("../controllers/listGroupsContoller");
const viewGroupController = require("../controllers/viewGroupController");

router.get("/", verifyRoute, listGroupsController.listGroups);

router.get("/view-group/:id", verifyRoute, viewGroupController.viewGroup);

router.post("/create-new-group", createNewGroupController.createNewGroup);

module.exports = router;
