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
    .withMessage("The project name is required"),
  body("clientName")
    .notEmpty()
    .withMessage("The client name is required"),
  body("description").notEmpty().withMessage("The description is required"),
  handleInputErrors,
  ProjectController.createProject,
);

router.get("/", ProjectController.getProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("The project id is required"),
  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("The project id is required"),
  body("projectName")
    .notEmpty()
    .withMessage("The project name is required"),
  body("clientName")
    .notEmpty()
    .withMessage("The client name is required"),
  body("description").notEmpty().withMessage("The description is required"),
  handleInputErrors,
  ProjectController.updateProjectById,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("The project id is required"),
  handleInputErrors,
  ProjectController.deleteProjectById,
);

router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("The task name is required"),
  body("description").notEmpty().withMessage("The description is required"),
  body("rol").notEmpty().withMessage("The role is required"),
  body("user").notEmpty().withMessage("The user is required"),
  TaskController.createTask,
);

router.get("/:projectId/tasks", TaskController.getTasks);

router.param("taskId", validateTaskId);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("The project id is required"),
  TaskController.getTaskById,
);

router.put(
  "/:projectId/tasks/:taskId",
  itHasAuthorization,
  param("taskId").isMongoId().withMessage("The task id is required"),
  body("name").notEmpty().withMessage("The task name is required"),
  body("description").notEmpty().withMessage("The description is required"),
  body("rol").notEmpty().withMessage("The role is required"),
  body("user").notEmpty().withMessage("The user is required"),
  handleInputErrors,
  TaskController.putTaskById,
);

router.delete(
  "/:projectId/tasks/:taskId",
    itHasAuthorization,
  param("taskId").isMongoId().withMessage("The task id is required"),
  TaskController.deleteById,
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("The task id is required"),
  body("status").notEmpty().withMessage("The status is required"),
  handleInputErrors,
  TaskController.updateStatus,
);

router.post('/:projectId/team/find',
    body("email")
        .isEmail().toLowerCase().withMessage("The email is invalid"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeams
)

router.post('/:projectId/team',
    body("id")
        .isMongoId().withMessage("The project id is required"),
    handleInputErrors,
    TeamMemberController.addUserById
)

router.delete('/:projectId/team/:userId',
    param("userId")
        .isMongoId().withMessage("The user id is required"),
    handleInputErrors,
    TeamMemberController.deleteUserById
)

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage("The note content is required"),
    handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('The note id is required'),
    handleInputErrors,
    NoteController.deleteNote
)
export default router;
