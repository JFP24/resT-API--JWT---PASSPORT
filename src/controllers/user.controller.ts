import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const singUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please , send your email and password}" });
  }

  const userFind = await User.findOne({ email });
  console.log(userFind);
  if (userFind) {
    return res.status(400).json({ msg: "The User alredy exists" });
  }
  const user = new User(req.body);
  await user.save();
  return res.status(201).json(user);
};

export const singnin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please , send your email and password}" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "The User does not exist" });
    }

    const isMatch = await user.comparePassword();
    if (isMatch) {
      return res.status(200).json({ token: createToken(user) });
    }
    return res
      .status(400)
      .json({ msg: "the corres or password not is correct" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error in signin" });
  }
};
