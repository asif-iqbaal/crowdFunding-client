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
    phone:number;
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
    daysLeft:number;
    approved?:boolean;
    status?:'active'|'inactive'|'pending';
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
    daysLeft:number;
  }

  export interface IBackProject {
    amount: number;
    _id: string;
  }

  export interface IProfile{
    _id:string;
    username:string;
    email:string;
    mycampaign:[]
  }