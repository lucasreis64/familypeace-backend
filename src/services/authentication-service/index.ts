import { invalidCredentialsError } from "@/errors";
import { sessionRepository, userRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";
import { user } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findUserInfoByEmail(email);

  if (!user) throw invalidCredentialsError();

  return { id: user.id, email: user.email, password: user.password, name: user.enrollment[0].name, profilePicture: user.enrollment[0].profilePicture };
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<user, "email" | "password">;

type SignInResult = {
  user: Pick<user, "id" | "email"> & {name: string, profilePicture: string};
  token: string;
};

type GetUserOrFailResult = Pick<user, "id" | "email" | "password"> & {name: string, profilePicture: string};

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from "../../errors/invalid-userid-error";
