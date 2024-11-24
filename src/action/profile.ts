import { axiosClient } from "../lib/utils";
import { IProfile } from "../constant";

export const UserProfile = async function():Promise<IProfile>{
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosClient.get('/user',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            } 
        );

        return response.data.response[0];

    } catch (error:any) {
        throw  error;
    }
}