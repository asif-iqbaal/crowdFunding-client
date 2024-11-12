export interface Signup {
    username: string;
    email: string;
    password: string;
    confirmPassword?:string;
  }

  export interface Login {
    email:string,
    password:string
  }

  export interface ICreateCampaign{
    title: string;
    category: string;
    description: string;
    fundingGoal: number;
    duration: number;
    image?:File;
  }
  
  export interface ICampaigns {
    _id:string;
    title:string;
    creator:string;
    category:string;
    description:string;
    currentFunding:number;
    fundingGoal:number;
    duration:number;
    image:string;
  }

  export interface ICampaignById{
    _id:string;
    title:string;
    creator:string;
    category:string;
    description:string;
    currentFunding:number;
    fundingGoal:number;
    duration:number;
    image:string;
    donators:[];
    createdAt:Date;
  }

  export interface IBackProject {
    amount: number;
    _id: string;
  }