import adminInstance from ".";
import { adminRoutes } from "./routes";

// Auth
export const loginAPI = (formData) =>
  adminInstance.post(adminRoutes.LOGIN, formData);
