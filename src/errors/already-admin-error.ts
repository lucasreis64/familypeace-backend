import { ApplicationError } from "@/protocols";

export function alreadyAdminError(): ApplicationError {
  return {
    name: "AlreadyAdminError",
    message: "user is already an admin",
  };
}
