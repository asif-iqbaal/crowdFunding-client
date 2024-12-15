import { ICampaignById } from "../constant";
import { axiosClient } from "../lib/utils";

export const CampaignById = async function(id:string):Promise<ICampaignById>{
    try {
        const response =  await axiosClient.get(`/campaign/${id}`);
        return response.data.campaign;
    } catch (error:any) {
        throw new Error(error);
    }
}