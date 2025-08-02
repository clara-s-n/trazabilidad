export type UserFormInputs = {
  user?: {
    email: string;
    role_id: number;
  } | null;
  isEditMode: boolean;
};

export type UserFormOutputs = {
  submitted: { email: string; password: string; repeatPassword?: string; role_id: number };
  cancel?: void;
};