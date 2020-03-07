const express = require('express');

const { listGroup, postGroup, updateGroup, deleteGroup } = require("./groups.controller");

const router = express.Router();

router.get("", listGroup);
router.post("", postGroup);
router.put("/:groupId", updateGroup);
router.delete("/:groupId", deleteGroup);

module.exports = {
  groupsRouter: router
}

// For middleware, we need to use the .next() function to move to the next set of middleware
