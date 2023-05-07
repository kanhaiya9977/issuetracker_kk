const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project_controller');

router.post('/create', projectController.create);
router.post('/:id', projectController.createIssue);
router.get('/projectio', projectController.createProject)
router.get('/project-data/:id', projectController.project);
router.get('/issue-form/:id', projectController.issueForm);
router.get('/show-issues/:id', projectController.showProjectIssues);

module.exports = router;
