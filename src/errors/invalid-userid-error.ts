import { ApplicationError } from "@/protocols";

export function invalidUserIdError(): ApplicationError {
  return {
    name: "InvalidUserIdError",
    message: "This userId isn't from user's family",
  };
}
