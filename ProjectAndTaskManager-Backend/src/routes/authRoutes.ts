import { Router } from "express";
import {AuthController} from "../controllers/authController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()
router.post(
    "/create-account",
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    body("password")
        .isLength({ min: 8})
        .withMessage("La contraseña es demasiado corta, mínimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (req.body.password !== value) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    body("email")
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    handleInputErrors,
    AuthController.createAccount
)

router.post(
    "/confirm-account",
    body("token")
        .notEmpty()
        .withMessage("El token es obligatorio"),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post(
    "/login",
    body("email")
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    body("password")
        .notEmpty()
        .withMessage("La contraseña no debe estar vacía"),
    handleInputErrors,
    AuthController.login
)

router.post(
    "/request-code",
    body("email")
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    handleInputErrors,
    AuthController.requestConfirmAccount
)

router.post(
    "/forgot-password",
    body("email")
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post(
    "/validate-token",
    body("token")
        .notEmpty()
        .withMessage("El token es obligatorio"),
    handleInputErrors,
    AuthController.validateToken
)

router.post(
    "/update-password/:token",
    param("token")
        .isNumeric()
        .withMessage("El token no es válido"),
    body("password")
        .isLength({ min: 8})
        .withMessage("La contraseña es demasiado corta, mínimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (req.body.password !== value) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updatePassword
)
export default router
