import { ApplicationError } from "@/protocols";

export function notFamilyMemberError(): ApplicationError {
  return {
    name: "NotFamilyMember",
    message: "user is not a member of any family",
  };
}
