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

export const ApprovedCampaigns = async function (id:string) {
  try {
    const token = sessionStorage.getItem('token');

    const res = await axiosClient.patch(`approvecampaign/${id}`
      , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    return res.data;
  } catch (error:any) {
    return error;
  }
}
export const RejectCampaigns = async function (id:string) {
  try {
    const token = sessionStorage.getItem('token');
    const res = await axiosClient.patch(`rejectcampaign/${id}`,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }   
    );
    return res.data;
  } catch (error:any) {
    return error;
  }
}