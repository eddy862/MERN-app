type ErrorResponse = {
  error: boolean;
  msg?: string;
};

export type LoginResponse = ErrorResponse & {
  email?: string;
  accessToken?: string;
};

export type SignupResponse = ErrorResponse & {
  accessToken?: string;
  user?: User;
};

export type User = {
  fullName: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: string;
  __v?: number;
};

export type UserResponse = ErrorResponse & {
  user?: User;
};
