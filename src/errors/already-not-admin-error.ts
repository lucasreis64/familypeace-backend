import { ApplicationError } from "@/protocols";

export function alreadyNotAdminError(): ApplicationError {
  return {
    name: "AlreadyAdminError",
    message: "user is already not an admin",
  };
}
