import express from 'express';
import { addProject, deleteProject, getAllProjects, getProject, getProjectById, savePenSetting, searchProject, searchUsersProject, updateProject } from '../controllers/project.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';


const router = express.Router();

router.route('/addProject').post(verifyUser, addProject);
router.route('/getAllProject').get(getAllProjects);
router.route('/getProject/:id').get(verifyUser, getProject);
router.route('/getProjectById/:id').get(getProjectById);
router.route('/searchProject').get(searchProject);
router.route('/searchUsersProject').get(verifyUser, verifyUser, searchUsersProject);
router.route('/updateProject/:id').put(verifyUser, updateProject);
router.route('/deleteProject/:id').delete(verifyUser, deleteProject);
router.route('/updateSetting/:id').patch(verifyUser, savePenSetting);


export default router;