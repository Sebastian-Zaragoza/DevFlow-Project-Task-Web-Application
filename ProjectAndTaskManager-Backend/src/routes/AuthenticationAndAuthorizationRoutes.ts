import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();
router.post(
  "/create-account",
  body("name").notEmpty().withMessage("The user name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password is shorter than 8 characters"),
  body("password_confirmation").custom((value, { req }) => {
    if (req.body.password !== value) {
      throw new Error("The passwords do not match");
    }
    return true;
  }),
  body("email").isEmail().withMessage("The email is required"),
  handleInputErrors,
  AuthController.createAccount,
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("The token is required"),
  handleInputErrors,
  AuthController.confirmAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("The email is required"),
  body("password").notEmpty().withMessage("The password must not be empty"),
  handleInputErrors,
  AuthController.login,
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("The email is required"),
  handleInputErrors,
  AuthController.requestConfirmAccount,
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("The email is required"),
  handleInputErrors,
  AuthController.forgotPassword,
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("The token is required"),
  handleInputErrors,
  AuthController.validateToken,
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("The token is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password is shorter than 8 characters"),
  body("password_confirmation").custom((value, { req }) => {
    if (req.body.password !== value) {
      throw new Error("The passwords do not match");
    }
    return true;
  }),
  handleInputErrors,
  AuthController.updatePassword,
);

router.get("/user", authenticate, AuthController.user);
router.get("/user/:userId",
    param("userId").isMongoId().withMessage("The id user is required"),
    AuthController.getUserById
)

router.put('/profile',
    authenticate,
    body("name").notEmpty().withMessage("The task name is required"),
    body("email").notEmpty().withMessage("The email is required"),
    handleInputErrors,
    AuthController.updateProfile
)
router.post('/update-password',
    authenticate,
    body("current_password").notEmpty().withMessage("The password must not be empty"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password is shorter than 8 characters"),
    body("password_confirmation").custom((value, { req }) => {
        if (req.body.password !== value) {
            throw new Error("The passwords do not match");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updateUserPassword
)
router.post('/check-password',
    authenticate,
    body("password").notEmpty().withMessage("The password must not be empty"),
    handleInputErrors,
    AuthController.checkPassword
)
export default router;
