import { axiosClient } from "../lib/utils";
import { IBackProject } from "../constant";

// DONATION TO CAMPAIGN BY ID
export const BackProject = async function({
    amount,
    _id
}:IBackProject){
  try {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");
    const response = await axiosClient.post('/donation',{
        amount,
        _id
    },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
      });

      return  response.data.donation;
  } catch (error:any) {
    console.log("error in create campaign",error);
  }
}