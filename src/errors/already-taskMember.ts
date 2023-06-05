import { ApplicationError } from "@/protocols";

export function alreadyTaskMember(): ApplicationError {
  return {
    name: "alreadyTaskMember",
    message: "user is already a task member",
  };
}
