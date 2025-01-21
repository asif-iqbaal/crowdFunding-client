import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { loginSchema } from '../../validations'
import { authWithGithub, authWithGoogle, LoginUser } from '../../action/auth'
import { Login } from '../../constant'
import { X } from "lucide-react"
import { useAuth } from '../../authContext/authContext';
import { toast } from '../../hooks/use-toast'
import { FaEye, FaEyeSlash } from "react-icons/fa";

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginDialog () {
  const [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const {login,isDark} = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
        sessionStorage.setItem('token', token);
        login();
        setIsOpen(false);
        window.history.replaceState({}, document.title, window.location.pathname); // Clean up the URL
    }
}, []);

  const onSubmit = async(data: LoginFormValues) => {
    try {
      let user: Login;
      setLoading(true);
      user = await LoginUser({
          email:data.email,
          password:data.password
      });
    
      if (user) {
          login();
          setIsOpen(false);
          setLoading(false);
      }
      toast({
        title:"Loged In",
        description:"Login Success"
      })
  } catch (error:any) {
    setLoading(false);
      toast({
        title:"Login failed",
        description:"Failed to login",
        variant:"destructive"
      })
      
  }
  }

  const handleAuthGoogle = async() => {
    try {
      const user:any = await authWithGoogle();
      if(user){
        login();
        setIsOpen(false);
      }
    } catch (error:any) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    }
  }

  const handleAuthGithub = async() => {
    try {
      const user:any = await authWithGithub();
      if(user){
        login();
        setIsOpen(false);
      }
    } catch (error:any) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    }
  }
  return (
    <div>
    <Button onClick={() => setIsOpen(true)} variant={`${isDark?"default":"outline"}`}>Login</Button>
    <Dialog open={isOpen}  modal={true}>
      {/* <DialogTrigger asChild>
        <Button variant={`${isDark?"default":"outline"}`}>Login</Button>
      </DialogTrigger> */}

      <DialogContent className={`sm:max-w-[425px] ${isDark?"bg-gray-800 text-white":"bg-white"}`}>
        <DialogClose asChild>
        <button onClick={() => setIsOpen(false)} className="absolute right-2 top-2">
              <X className="h-6 w-6 hover:bg-red-500 hover:text-white transition-all" />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Login to your CrowdFund account
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full  bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg">{loading?"Loging":"Login"}</Button>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center">
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
        </motion.div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="w-full" onClick={handleAuthGoogle}>
             <FaGoogle />
              Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAuthGithub}>
             <FaGithub />
              Github
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}