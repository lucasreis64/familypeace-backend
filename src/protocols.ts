export type ApplicationError = {
  name: string;
  message: string;
};

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
