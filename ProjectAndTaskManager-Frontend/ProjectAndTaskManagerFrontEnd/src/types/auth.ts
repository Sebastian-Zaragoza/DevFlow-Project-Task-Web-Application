import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export const userInfoSchema = authSchema
    .pick({
        name: true,
        email: true,
    })

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
    Auth,
    "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordFormToken = Pick<
    Auth,
    "password" | "password_confirmation"
>;
export type User = z.infer<typeof userSchema>;
export type ConfirmToken = Pick<Auth, "token">;
export type UserProfileForm = Pick<User, 'name' | 'email'>
export type UpdateUserPassword = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
