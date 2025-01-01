import { axiosClient } from "../lib/utils";
import { ICreateCampaign } from "../constant";

export const CreateCampaign = async function({
    title,
    category,
    description,
    fundingGoal,
    duration,
    phone,
    image
}:ICreateCampaign){
    try {
        const token = sessionStorage.getItem('token');
                 
        const response = await axiosClient.post('/create',{
            title,
            category,
            description,
            fundingGoal,
            duration,
            phone,
            image
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }   
    )

        return response.data.campaign;
    } catch (error:any) {
        throw  error;
    }
}

