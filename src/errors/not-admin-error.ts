import { ApplicationError } from "@/protocols";

export function notAdminError(): ApplicationError {
  return {
    name: "NotAdminError",
    message: "You must be a admin to continue",
  };
}
