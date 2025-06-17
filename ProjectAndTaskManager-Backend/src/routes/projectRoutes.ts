import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExists } from "../middleware/projects";
import { TaskController } from "../controllers/taskController";
import {itHasAuthorization, validateTaskId} from "../middleware/task";
import { taskBelongsToProject } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import {TeamMemberController} from "../controllers/teamController";
import {NoteController} from "../controllers/noteController";

const router = Router();
router.use(authenticate);
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  handleInputErrors,
  ProjectController.createProject,
);

router.get("/", ProjectController.getProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  handleInputErrors,
  ProjectController.updateProjectById,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El Id del proyecto es obligatorio"),
  handleInputErrors,
  ProjectController.deleteProjectById,
);

router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("rol").notEmpty().withMessage("El rol es obligatorio"),
  body("user").notEmpty().withMessage("El usuario es obligatorio"),
  TaskController.createTask,
);

router.get("/:projectId/tasks", TaskController.getTasks);

router.param("taskId", validateTaskId);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El Id del proyecto es obligatorio"),
  TaskController.getTaskById,
);

router.put(
  "/:projectId/tasks/:taskId",
  itHasAuthorization,
  param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("rol").notEmpty().withMessage("El rol es obligatorio"),
  body("user").notEmpty().withMessage("El usuario es obligatorio"),
  handleInputErrors,
  TaskController.putTaskById,
);

router.delete(
  "/:projectId/tasks/:taskId",
    itHasAuthorization,
  param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
  TaskController.deleteById,
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("El Id de la tarea es obligatorio"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus,
);

router.post('/:projectId/team/find',
    body("email")
        .isEmail().toLowerCase().withMessage("El email no es valido"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeams
)

router.post('/:projectId/team',
    body("id")
        .isMongoId().withMessage("Id is required"),
    handleInputErrors,
    TeamMemberController.addUserById
)

router.delete('/:projectId/team/:userId',
    param("userId")
        .isMongoId().withMessage("Id is required"),
    handleInputErrors,
    TeamMemberController.deleteUserById
)

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage("El contenido es obligatorio"),
    handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('El Id de la nota es inválido'),
    handleInputErrors,
    NoteController.deleteNote
)
export default router;
