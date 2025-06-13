import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type UserPayloadProps = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: UserPayloadProps) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};
