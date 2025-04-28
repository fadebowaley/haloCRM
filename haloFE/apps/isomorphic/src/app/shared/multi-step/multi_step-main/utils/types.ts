export interface User {
  name: string;
  email: string;
  role: string;
  phone?: string;  // Made optional since it's marked as optional in your form
}

export interface Role {
  name: string;
  description: string;
}

export interface IndustryTemplate {
  industry: string;
  roles: Role[];
}

export interface UserData {
  name: string;
  email: string;
  role: string;
}

export interface FormData {
  industry: IndustryTemplate | null;
  users: UserData[];
}