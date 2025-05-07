import {Router} from "express";
import {body, param} from "express-validator";
import {ProjectController} from "../controllers/projectController";
import {handleInputErrors} from "../middleware/validation";

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

export default router