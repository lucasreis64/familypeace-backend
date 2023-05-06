export type ApplicationError = {
  name: string,
  message: string,
};

export type enrollmentWhereParams = {
  userId: {
    in: number[],
  }
}

export type taskMembersParams = {
  taskId: number,
  userId: number
}

export type taskWhereParams = {
  familyId: number,
  createdAt?: {
    gte: Date,
  },
  status?: createOrUpdateTaskParams["status"],
  taskMembers?: {
    every: {
      userId: number,
    }
  }
}

export type taskResult = {
      id: number;
      name: string;
      familyId: number;
      status: string;
      taskMembers: {
          userId: number;
          name: string;
      }[];
}[]

export type taskFilterParams = {
  period: "day" | "week" | "month" | "all",
  status: "pending" | "doing" | "done" | "all",
  from: "family" | number;
}

export type createOrUpdateFamilyParams = {
  id?: number,
  name: string,
  familyPicture: string,
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
  name: string,
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
