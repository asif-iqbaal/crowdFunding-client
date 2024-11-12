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
