import { User } from "src/app/models/login.model";

export interface AuthResponse{
    token: string;
    userDetails: User;
    error: string;
  }
  