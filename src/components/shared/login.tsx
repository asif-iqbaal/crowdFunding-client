import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { loginSchema } from '../../validations'
import { authWithGithub, authWithGoogle, LoginUser } from '../../action/auth'
import { Login } from '../../constant'
import { useAuth } from '../../authContext/authContext';
import { toast } from '../../hooks/use-toast'

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginDialog () {
  const [isOpen, setIsOpen] = useState(false)
  const {login,isDark} = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

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
      
      user = await LoginUser({
          email:data.email,
          password:data.password
      });
    
      if (user) {
          login();
          setIsOpen(false);
      }
  } catch (error) {
      console.error("Login failed:", error);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={`${isDark?"default":"outline"}`}>Login</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${isDark?"bg-gray-800 text-white":"bg-white"}`}>
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full  bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg">Login</Button>
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
  )
}