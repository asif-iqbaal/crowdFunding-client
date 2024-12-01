import { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Separator } from "../../components/ui/separator"
import { useToast } from "../../hooks/use-toast";
import { useAuth } from '../../authContext/authContext'
import { Settings, CreditCard, LogOut,  Trash2 } from 'lucide-react'
import { DeleteUser, UpdatePassword, UserCampaigns, UserProfile } from '../../action/profile'
import { ICampaigns, IProfile } from '../../constant'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<IProfile>({} as IProfile);
  const [userCamps, setUserCamps] = useState<ICampaigns[]>([]);
  const {toast} = useToast();
  const {logout} = useAuth();
 const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await UserProfile();
      setProfileData(data);
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      const data = await UserCampaigns();
      setUserCamps(data);
    };
    fetchUser();
  },[]);

  const handlePasswordChange = async(password:string) => {
    await UpdatePassword(password);
    setIsEditing(false)
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    })
  }

  const handleDeleteAccount = async(id:string) => {
    try{
      await DeleteUser(id);
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been received. We'll process it shortly.",
      variant: "destructive",
    })
    logout();
    navigate('/')
  }catch{
      toast({
        title: "Account Deletion Requested Failed",
        description: "Your account deletion request has been failed. Try again later.",
        variant: "destructive",
      })}
    }
  
    const handleLogout = () => {
      logout();

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 bg-gray-400">
                  <AvatarFallback>{profileData?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  {isEditing ? (
                    <Input
                      value={profileData.username}
                      //onChange={(e) => setName(e.target.value)}
                      className="text-2xl font-bold mb-1"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold mb-1">{profileData.username}</h1>
                  )}
                  <p className="text-gray-500">{profileData.email}</p>
                </div>
              </div>
            </CardHeader>          
          </Card>

          <Tabs defaultValue="campaigns" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>My Campaigns</CardTitle>
                  <CardDescription>Campaigns you've created and their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCamps.map((campaign) => (
                    <div key={campaign._id} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-semibold">{campaign.title}</h3>
                      <Progress  value={(campaign.fundingGoal/campaign.currentFunding*100)} className="h-2 mt-2 bg-gray-500" />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{(campaign.fundingGoal/campaign.currentFunding*100)}% funded</span>
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Create New Campaign</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="backed">
              <Card>
                <CardHeader>
                  <CardTitle>Backed Projects</CardTitle>
                  <CardDescription>Projects you've supported and their status</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profileData.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="********" readOnly />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                  <Separator />
                 
                  <Button variant="destructive" className="w-full bg-red-500 text-white hover:bg-red-300" onClick={()=>handleDeleteAccount(profileData._id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}