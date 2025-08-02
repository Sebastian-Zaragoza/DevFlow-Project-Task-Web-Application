import { Request, Response } from "express";
import User from "../models/user";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/token";
import { generateToken } from "../utils/token";
import { AuthEmails } from "../emails/authEmails";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("The user already exists");
      res.status(409).json({ error: error.message });
      return;
    }
    const user = new User(req.body);
    user.password = await hashPassword(req.body.password);

    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    AuthEmails.sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token,
    });

    await Promise.allSettled([user.save(), token.save()]);
    res.send("User created. Confirm the account via email");
  };
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Invalid token");
        res.status(404).json({ error: error.message });
        return;
      }

      const user = await User.findById(tokenExists.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("User confirmed");
    } catch (error) {
      res.status(500).json({ error: "Error confirming the account" });
    }
  };
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("The user does not exist");
        res.status(404).json({ error: error.message });
        return;
      }
      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();
        AuthEmails.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });
        const error = new Error(
          "The account does not confirm. Check the email account",
        );
        res.status(401).json({ error: error.message });
        return;
      }

      const isPasswordValid = await checkPassword(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("The password does not match");
        res.status(401).json({ error: error.message });
        return;
      }
      const tokenJWT = generateJWT({ id: user.id });
      res.send(tokenJWT);
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  };
  static requestConfirmAccount = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("The user does not exist");
        res.status(404).json({ error: error.message });
        return;
      }

      if (user.confirmed) {
        const error = new Error("The user has been confirmed");
        res.status(403).json({ error: error.message });
        return;
      }

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      AuthEmails.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Check the email account to confirm it");
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("The user does not exist");
        res.status(404).json({ error: error.message });
        return;
      }

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();

      AuthEmails.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      });
      res.send("Check the email account to update the password");
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Invalid token");
        res.status(404).json({ error: error.message });
        return;
      }
      res.send("Token validated, update the password");
    } catch (error) {
      res.status(500).json({ error: "Error evaluating token" });
    }
  };
  static updatePassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Invalid token");
        res.status(404).json({ error: error.message });
        return;
      }
      const user = await User.findById(tokenExists.user);
      user.password = await hashPassword(req.body.password);
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("Password updated");
    } catch (error) {
      res.status(500).json({ error: "Error updating password" });
    }
  };
  static user = async (req: Request, res: Response) => {
    res.json(req.user);
  };
  static getUserById = async (req: Request, res: Response) => {
    try {
      const {userId} = req.params;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: "The user does not exist" });
        return;
      }
      const {name, email} = user
      res.send({name, email});
    } catch (error) {
      res.status(500).json({ error: "Error getting user" });
    }
  };
  static updateProfile = async (req: Request, res: Response) => {
      const {name, email} = req.body;
      const userExists = await User.findOne({email});
      if(!userExists && userExists.id.toString() !== req.user.id.toString()) {
        const error = new Error('The email user has been registered');
        res.status(409).json({ error: error.message });
        return;
      }
      req.user.name = name;
      req.user.email = email;
      try{
        await req.user.save();
        res.status(200).json('Profile updated');
      }catch (error){
        res.status(500).json({ error: "Error updating profile" });
      }
  };
  static updateUserPassword = async (req: Request, res: Response) => {
    const {current_password, password} = req.body;
    const user = await User.findById(req.user.id);
    const isPasswordCorrect = await checkPassword(current_password, user.password);
    if(!isPasswordCorrect){
      const error = new Error('The password is not correct');
      res.status(401).json({ error: error.message });
      return;
    }
    try{
      user.password = await hashPassword(password);
      await user.save();
      res.status(200).json('Password updated');
    }catch (error){
      res.status(500).json({ error: "Error updating password" });
    }
  };
  static checkPassword = async (req: Request, res: Response) => {
    try{
      const { password} = req.body;
      const user = await User.findById(req.user.id);
      const isPasswordCorrect = await checkPassword(password, user.password);
      if(!isPasswordCorrect){
        const error = new Error('The password is not correct');
        res.status(401).json({ error: error.message });
        return;
      }
      res.status(200).json('The password is correct');
    }catch (error){
      res.status(500).json({ error: "Error checking password" });
    }
  };
}
