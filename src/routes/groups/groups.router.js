const express = require('express');
const { listGroup, postGroup, updateGroup, deleteGroup } = require("./groups.controller");
const { check, param } = require('express-validator');
const   { validateBody } = require('../../middleware/validate-body');

const router = express.Router();

router.get("", listGroup);
router.post("", [
  check("id")
  .not()
  .isEmpty()
  .withMessage('must have id field'),
  check("id")
  .not()
  .isString()
  .withMessage('must have id as type integer'),
], validateBody, postGroup);
// For middleware, we need to use the .next() function to move to the next set of middleware
// the validator methods from the express-library below already have a .next() function embeded under the hood
router.put("/:groupId", [param('groupId').isInt().withMessage('must contain a number')], validateBody, updateGroup);
router.delete("/:groupId", [param('groupId').isInt().withMessage('must contain a number')], validateBody, deleteGroup);

module.exports = {
  groupsRouter: router
}

