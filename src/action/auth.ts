import { Signup ,Login} from "../constant";
import { axiosClient } from "../lib/utils";
import axios from "axios";

export const CreateUser = async function({
    username,
    email,
    password,
    confirmPassword
}:Signup){
    try {
        const response = await axiosClient.post('/signup',{
            username,
            email,
            password,
            confirmPassword
        });
        sessionStorage.setItem('token',response.data.token);
        return response.data;

    } catch (error:any) {
        throw  error;
    }
}

export const authWithGoogle = async function() {
    try {
        window.location.href = `${import.meta.env.VITE_BACKEND}/auth/google`; 
    } catch (error: any) {
        console.error('Error initiating Google Auth:', error);
        throw error;
    }
}

export const authWithGithub = async function() {
    try {
        window.location.href = `${import.meta.env.VITE_BACKEND}/auth/github`; 
    } catch (error: any) {
        console.error('Error initiating Google Auth:', error);
        throw error;
    }
}

export const LoginUser = async function ({
    email,
    password
}:Login){
    try {
        const response = await axiosClient.post('/login',{email,password});
        sessionStorage.setItem('token',response.data.token);
        return response.data.token;

    } catch (error: any) {

         if (axios.isAxiosError(error) && error.response) {
      console.error('Login error:', error.response.data); // Log error details if needed
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
    }
}
export const verifyUser = async function (email:string){
try {
    const res = await axiosClient.post('/sendverificationmail',{email});

    return res.data;

} catch (error:any) {
    console.error('Error initiating Google Auth:', error);
    throw error;
}
}

export const verify = async function(token:string){
    try {
        const res = await axiosClient.get(`/verifymail?token=${token}`);
        return res.data;
    } catch (error:any) {
        console.error('Error initiating Google Auth:', error);
        throw error;
    }
}