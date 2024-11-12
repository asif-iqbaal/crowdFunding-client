import axios,{AxiosInstance} from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosClient:AxiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BAKCEND,
  withCredentials:true,
})