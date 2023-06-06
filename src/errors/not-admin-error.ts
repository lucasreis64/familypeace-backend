import { ApplicationError } from "@/protocols";

export function notAdminError(): ApplicationError {
  return {
    name: "NotAdminError",
    message: "You must be an admin to make someone an admin",
  };
}
