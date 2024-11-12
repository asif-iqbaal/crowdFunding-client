import { axiosClient } from "../lib/utils";
import { ICampaigns } from "../constant";

export const All_Campaigns = async function():Promise<ICampaigns[]>{
      try {
        const res = await axiosClient.get('/campaigns');
         return res.data.campaign;
      } catch (error:any) {
        console.log("error in get all campaigns",error);
        return error;
      }
}