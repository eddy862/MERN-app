type ErrorResponse = {
  error: boolean;
  msg?: string;
};

export type User = {
  fullName: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: string;
};

export type Note = {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  tags: string[];
  isPinned: boolean;
  userId: string;
};

export type LoginResponse = ErrorResponse & {
  email?: string;
  accessToken?: string;
};

export type SignupResponse = ErrorResponse & {
  accessToken?: string;
  user?: User;
};

export type UserResponse = ErrorResponse & {
  user?: User;
};

export type AllNotesResp = ErrorResponse & {
  notes: Note[];
};

export type CreateNoteResp = ErrorResponse & {
  note: Note;
}

export type deleteNoteResp = CreateNoteResp;
