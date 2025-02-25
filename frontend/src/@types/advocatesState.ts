import { Advocate } from "./advocate";

export interface AdvocatesState {
    items: Advocate[];
    currentPost: Advocate | null;
    isLoading: boolean;
    error: string | null;
    success: boolean;
  }