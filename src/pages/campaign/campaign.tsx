import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { Slider } from "../../components/ui/slider"
import { Progress } from "../../components/ui/progress"
import { ArrowRight, HelpCircle, DollarSign, Calendar, Target } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { useToast } from "../../hooks/use-toast";
import { projectSchema } from '../../validations';
import { CreateCampaign } from '../../action/createCampaign'
import { ICreateCampaign } from '../../constant'

type ProjectFormValues = z.infer<typeof projectSchema>

const categories = [
  { value: "technology", label: "Technology" },
  { value: "art", label: "Art" },
  { value: "film", label: "Film" },
  { value: "games", label: "Games" },
  { value: "music", label: "Music" },
  { value: "publishing", label: "Publishing" },
  { value: "environment", label: "Environment" }
]

export default function StartAProjectPage() {
  const [step, setStep] = useState(1);
  const [loading,setLoading] = useState<boolean>(false);
  const totalSteps = 4;
  const {toast} = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      fundingGoal: 1000,
      duration: 30,

    },
  })

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("fundingGoal", data.fundingGoal.toString());
      formData.append("duration", data.duration.toString());
      if (data.image) {
        formData.append("image", data.image);
      }
    const campaignData: ICreateCampaign = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    fundingGoal: Number(formData.get("fundingGoal")),
    duration: Number(formData.get("duration")),
    image: formData.get("image") as File
};
  const res = await CreateCampaign(campaignData);
  if(res){
    toast({
      title: "success",
      description: "Campaign created successfuly"
    });
  }
  setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload campaign",
        variant: "destructive",
      });
    }
  };
  
  const nextStep = () => {
        setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };
  

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  }

  const previewImage = form.watch('image')

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Bring Your Idea to Life
          </h1>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100">
              <CardTitle className="text-2xl">Create Your Crowdfunding Campaign</CardTitle>
              <CardDescription>Let's turn your vision into reality, step by step</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-8">
                <Progress value={(step / totalSteps) * 100} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Start</span>
                  <span>Details</span>
                  <span>Funding</span>
                  <span>Review</span>
                </div>
              </div>
              <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your project title" {...field} />
                              </FormControl>
                              <FormDescription>
                                Choose a clear, descriptive title for your project.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='bg-white'>
                                  {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Choose the category that best fits your project.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="mt-6">
                          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Image
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                            {previewImage && (
                              <div>
                                <span className="font-medium">Project Image:</span>
                                <img src={URL.createObjectURL(previewImage)} alt="Project" className="mt-2 h-32 w-32 object-cover rounded-md" />
                              </div>
                            )}
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="image-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                                >
                                  <span>Upload a file</span>
                                  <input 
                                    id="image-upload" 
                                    name="image" 
                                    type="file" 
                                    className="sr-only" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                  />

                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your project in detail" 
                                  className="min-h-[200px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Provide a comprehensive description of your project, its goals, and why people should support it.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <FormField
                          control={form.control}
                          name="fundingGoal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Funding Goal (₹)</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="text-gray-500" />
                                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </div>
                              </FormControl>
                              <FormDescription>
                                Set your funding goal in USD. This is the amount you need to raise for your project.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Campaign Duration (Days)</FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="text-gray-500" />
                                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </div>
                              </FormControl>
                              <Slider
                                min={1}
                                max={60}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="mt-2"
                              />
                              <FormDescription>
                                Set the duration of your campaign in days (1-60 days).
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold mb-4">Review Your Project</h3>
                        <div className="space-y-4">
                          <div>
                            <span className="font-medium">Title:</span> {form.getValues('title')}
                          </div>
                          <div>
                            <span className="font-medium">Category:</span> {categories.find(c => c.value === form.getValues('category'))?.label}
                          </div>
                          <div>
                            <span className="font-medium">Description:</span>
                            <p className="mt-1 text-sm text-gray-600">{form.getValues('description')}</p>
                          </div>
                          <div>
                            <span className="font-medium">Funding Goal:</span> ₹{form.getValues('fundingGoal')}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {form.getValues('duration')} days
                          </div>
                          {previewImage && (
                            <div>
                              <span className="font-medium">Project Image:</span>
                              <img  alt="Project" className="mt-2 h-32 w-32 object-cover rounded-md" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
            

            <CardFooter className="flex justify-between">
              {step > 1 && (
                
                <div  onClick={prevStep} className=' border p-2 bg-black text-white rounded-sm cursor-pointer'>
                  Previous
                </div>
              )}
              {step < totalSteps ? (
                <div onClick={nextStep} className="ml-auto border px-5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-sm cursor-pointer">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              ) : (!loading ?
                (<Button type="submit"  className="ml-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  Launch Project <Target className="ml-2 h-4 w-4" />
                </Button>):
                (
                  <Button type="submit"  className="ml-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  Launching <Target className="ml-2 h-4 w-4" />
                </Button>
                )

              )}
            </CardFooter>
            </form>
              </Form>
            </CardContent>
            <Separator className="my-4" />
          
          </Card>     
        </motion.div>
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Tips for a Successful Campaign</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>Be clear and concise in your project description</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>Set a realistic funding goal</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>Create compelling rewards for backers</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>Promote your campaign on social media</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <span>Engage with your backers regularly</span>
            </li>
          </ul>
        </div>
        <TooltipProvider>
          <div className="mt-8 text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="text-purple-600">
                  Need Help? <HelpCircle className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact our support team for assistance</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}