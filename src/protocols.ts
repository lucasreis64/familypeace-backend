import { task } from "@prisma/client";

export type ApplicationError = {
  name: string,
  message: string,
};

export type createOrUpdateFamilyParams = {
  id?: number,
  name: string,
}

export type createOrUpdateTaskParams = {
  id?: number
  name: string
  when: Date
  familyId: number
  status: "pending" | "doing" | "done",
}

export type enrollmentWithFamily = {
    id: number,
    family: string | null,
    birthday: Date | null,
    phone: string | null,
    profilePicture: string,
}

export type enrollmentWithObjectFamily = {
  id: number,
  family?: {
    name: string | null,
  },
  birthday: Date | null,
  phone: string | null,
  profilePicture: string,
}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};
