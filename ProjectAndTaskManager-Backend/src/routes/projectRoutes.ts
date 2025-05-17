import {Router} from "express";
import {body, param} from "express-validator";
import {ProjectController} from "../controllers/projectController";
import {handleInputErrors} from "../middleware/validation";
import {validateProjectExists} from "../middleware/projects";
import {TaskController} from "../controllers/taskController";
import {validateTaskId} from "../middleware/task";
import {taskBelongsToProject} from "../middleware/task";

const router = Router()
router.post('/',
    body('projectName')
        .notEmpty()
        .withMessage("Project name is required"),
    body('clientName')
        .notEmpty()
        .withMessage("Client name is required"),
    body('description')
        .notEmpty()
        .withMessage("Description is required"),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/',
    ProjectController.getProjects
)
router.get('/:id',
    param('id').isMongoId().withMessage("Project id is required"),
    handleInputErrors,
    ProjectController.getProjectById
)
router.put('/:id',
    param('id').isMongoId().withMessage("Project id is required"),
    body('projectName')
        .notEmpty()
        .withMessage("Project name is required"),
    body('clientName')
        .notEmpty()
        .withMessage("Client name is required"),
    body('description')
        .notEmpty()
        .withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProjectById
)
router.delete('/:id',
    param('id').isMongoId().withMessage("Project id is required"),
    handleInputErrors,
    ProjectController.deleteProjectById
)


router.param('projectId', validateProjectExists)
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('Task name is required'),
    body('description')
        .notEmpty().withMessage('Description is required'),
    body('rol')
        .notEmpty().withMessage('Rol is required'),
    body ('user')
        .notEmpty().withMessage('User is required'),
    TaskController.createTask
)
router.get('/:projectId/tasks',
    TaskController.getTasks
)
router.param('taskId', validateTaskId)
router.param('taskId', taskBelongsToProject)
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Project ID is required'),
    TaskController.getTaskById
)
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Task ID is required'),
    body('name')
        .notEmpty().withMessage('Task name is required'),
    body('description')
        .notEmpty().withMessage('Description is required'),
    body('rol')
        .notEmpty().withMessage('Rol is required'),
    body ('user')
        .notEmpty().withMessage('User is required'),
    handleInputErrors,
    TaskController.putTaskById
)
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Task ID is required'),
    TaskController.deleteById
)
router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Task ID is required'),
    body('status')
        .notEmpty().withMessage('Status is required'),
    handleInputErrors,
    TaskController.updateStatus
)
export default router