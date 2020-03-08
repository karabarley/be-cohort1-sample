const express = require('express');
const { listGroup, postGroup, updateGroup, deleteGroup } = require("./groups.controller");
const { check, param } = require('express-validator');
const   { validateBody } = require('../../middleware/validate-body');

const router = express.Router();
/**
 * @swagger
 * /groups:
 *   get:
 *     description: Retreive a list of community groups
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: List of community groups successfully retrieved
 *         schema:
 *           type: array
 */
router.get("", listGroup);
/**
 * @swagger
 * /groups:
 *   post:
 *     description: Creates a new community group entry
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: Community group entry has been created
 */

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
/**
 * @swagger
 * /groups/{groupId}:
 *    put:
 *     description: Updates existing community group entry by group id
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         description: group id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Succcessfully updated existing community group entry
 */
router.put("/:groupId", [param('groupId').isInt().withMessage('must contain a number')], validateBody, updateGroup);
/**
 * @swagger
 * /groups/{groupId}:
 *    delete:
 *     description: Deletes existing community group entry by group id
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         description: group id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Succcessfully delete existing community group entry
 */
router.delete("/:groupId", [param('groupId').isInt().withMessage('must contain a number')], validateBody, deleteGroup);

module.exports = {
  groupsRouter: router
}

//  QUESTIONS: 
// What should I include as the schema for post, put, delete? It would return the request body at this point, so should the schema be an object?
// When I hit http://localhost:3000/api-docs/, I am getting a "undefined - group id" in my PUT & DELETE sections,
// would you happen to know what the issue is here?
