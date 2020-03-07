const groupsData = require('./../../../db/groups.data.json')
const fs = require("fs");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

const listGroup = (req, res) => {
  return res.json(groupsData);
};

const postGroup = async (req, res) => {
  const id = groupsData.groups.length + 1;
  const newgroupsData = {
    groups: [...groupsData.groups, { id: parseInt(id, 10), ...req.body }]
  };
  await writeFile("db/groups.data.json", JSON.stringify(newgroupsData));
  res.status(201);
  return res.json({
    ...req.body
  });
};

const updateGroup = async (req, res) => {
  const groupsArray = groupsData.groups
  const updatedGroupsArray = groupsArray.map((group) => {
    if (group.id === parseInt(req.params.groupId, 10)) {
      return {...group, ...req.body}
    }
    return {...group}
  }) 
  const newgroupsData = {
    groups: [...updatedGroupsArray]
  };
  await writeFile("db/groups.data.json", JSON.stringify(newgroupsData));
  res.status(200);
  return res.json({
    ...req.body
  });
};

const deleteGroup = async (req, res) => {
  const groupsArray = groupsData.groups
  const updatedGroupsArray = groupsArray.filter((group) => group.id !== parseInt(req.params.groupId, 10)) 
  const newgroupsData = {
    groups: [...updatedGroupsArray]
  };
  await writeFile("db/groups.data.json", JSON.stringify(newgroupsData));
  res.status(200);
  return res.json({
    ...req.body
  });
};


module.exports = {
  listGroup,
  postGroup,
  updateGroup,
  deleteGroup
}
