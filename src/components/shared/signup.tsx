import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { signupSchema } from '../../validations'
import { Signup } from '../../constant'
import { authWithGithub, authWithGoogle, CreateUser } from '../../action/auth'
import { useAuth } from '../../authContext/authContext'
import { X } from "lucide-react"
import { toast } from '../../hooks/use-toast'
import { FaEye, FaEyeSlash } from "react-icons/fa";

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const {login,isDark} = useAuth();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        window.history.replaceState({}, document.title, window.location.pathname); 
    }
}, []);

  const onSubmit = async(data: SignupFormValues) => {
   try {
    setLoading(true);
    let user:Signup;
    user = await CreateUser({
      username:data.username,
      email:data.email,
      password:data.password,
      confirmPassword:data.password
    });
    if(user){
      login();
      setIsOpen(false);
      setLoading(false);
    }
    toast({
      title:"Signed Up",
      description:"Account created successfully"
    })
   } catch (error:any) {
    toast({
      title:"Signup failed",
      description:error,
      variant:"destructive"
    })
    setLoading(false);
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
      <p onClick={() => setIsOpen(true)} >Sign Up</p>
    <Dialog open={isOpen} modal={true}>
      {/* <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger> */}

      <DialogContent className={`sm:max-w-[425px] ${isDark?"bg-gray-800 text-white":"bg-white"}`}>
      <DialogClose asChild>
        <button onClick={() => setIsOpen(false)} className="absolute right-2 top-2">
              <X className="h-6 w-6 hover:bg-red-500 hover:text-white transition-all" />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create an Account</DialogTitle>
          <DialogDescription className="text-center">
            Join CrowdFund and start funding or creating projects
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              <Button type="submit" className="w-full  bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg">{loading?"Signup...":"Sign Up"}</Button>
            </form>
          </Form>
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
        <div className="mt-4 text-center text-sm text-muted-foreground">
          By signing up, you agree to our{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}