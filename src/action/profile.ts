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

        return response.data.response;

    } catch (error:any) {
        throw  error;
    }
}

export const UserCampaigns = async function(){
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosClient.get('/userCampaigns',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            } 
        );

        return response.data.userCampaigns;

    } catch (error:any) {
        throw  error;
    }
}

export const DeleteUser = async function(id:string){
    try {
        const response = await axiosClient.post('/deleteuser',{id});
        return response.data.deleteUser;
    } catch (error) {
        throw error;
    }
}

export const UpdatePassword = async function (newPassword:string) {
    try {
        const token = sessionStorage.getItem('token');
        const res = await axiosClient.post('/updatepassword',{newPassword},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            } 
        );
        
        return res.data.msg;
    } catch (error) {
        throw error
    }
}

