import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExists } from "../middleware/projects";
import { TaskController } from "../controllers/taskController";
import { validateTaskId } from "../middleware/task";
import { taskBelongsToProject } from "../middleware/task";
import {authenticate} from "../middleware/auth";

const router = Router()
router.use(authenticate)
router.post(
    "/",
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El nombre del cliente es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),
    handleInputErrors,
    ProjectController.createProject
)

router.get("/", ProjectController.getProjects);

router.get(
    "/:id",
    param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put(
    "/:id",
    param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
        .notEmpty()
        .withMessage("El nombre del cliente es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),
    handleInputErrors,
    ProjectController.updateProjectById
)

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
    handleInputErrors,
    ProjectController.deleteProjectById
)


router.param("projectId", validateProjectExists)

router.post(
    "/:projectId/tasks",
    body("name")
        .notEmpty()
        .withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),
    body("rol")
        .notEmpty()
        .withMessage("El rol es obligatorio"),
    body("user")
        .notEmpty()
        .withMessage("El usuario es obligatorio"),
    TaskController.createTask
)

router.get("/:projectId/tasks", TaskController.getTasks)

router.param("taskId", validateTaskId)
router.param("taskId", taskBelongsToProject)

router.get(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("El Id del proyecto es obligatorio"),
    TaskController.getTaskById
)

router.put(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
    body("name")
        .notEmpty()
        .withMessage("El nombre de la tarea es obligatorio"),
    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),
    body("rol")
        .notEmpty()
        .withMessage("El rol es obligatorio"),
    body("user")
        .notEmpty()
        .withMessage("El usuario es obligatorio"),
    handleInputErrors,
    TaskController.putTaskById
)

router.delete(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
    TaskController.deleteById
)

router.post(
    "/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
    body("status")
        .notEmpty()
        .withMessage("El estado es obligatorio"),
    handleInputErrors,
    TaskController.updateStatus
)
export default router;
