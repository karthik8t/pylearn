import {apiClient} from "@/services/apiClient.ts";
import type {SignupSchema} from "@/schemas/auth/signup.schema.ts";
import type {LoginSchema} from "@/schemas/auth/login.schema.ts";

export const authService = {
    async login(loginForm: LoginSchema) {
        try {
            const requestBody = JSON.stringify(loginForm)
            //TODO: parse the response user schema
            return await apiClient.post("/login", requestBody);
        } catch (error) {
            // Convert to standardized error format
            return Promise.reject({
                code: error.code || 'LOGIN_FAILED',
                message: error.message || 'Login failed. Please try again.',
            });
        }
    },
    async signup(signupForm: SignupSchema){
        try {
            const requestBody = JSON.stringify(signupForm)
            return await apiClient.post("/signup", requestBody);
        } catch (error) {
            // Convert to standardized error format
            return Promise.reject({
                code: error.code || 'LOGIN_FAILED',
                message: error.message || 'Login failed. Please try again.',
            });
        }
    }
}