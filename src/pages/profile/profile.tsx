import { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { useToast } from "../../hooks/use-toast";
import { useAuth } from '../../authContext/authContext'
import { User, Settings, CreditCard, LogOut, Edit, Trash2 } from 'lucide-react'

// Mock data for the user profile
const userData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Passionate about technology and innovation. Always looking for the next big idea to support!",
  createdCampaigns: [
    { id: 1, title: "Eco-Friendly Water Bottle", fundingProgress: 75, daysLeft: 15 },
    { id: 2, title: "Smart Home Security System", fundingProgress: 40, daysLeft: 25 },
  ],
  backedProjects: [
    { id: 3, title: "Revolutionary AI Assistant", amount: 100, status: "Successful" },
    { id: 4, title: "Sustainable Fashion Line", amount: 50, status: "In Progress" },
  ]
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(userData.bio)
  const {toast} = useToast();
  const {name} = useAuth();
 
 
  const handleSaveProfile = () => {
    // Here you would typically update the profile information in your backend
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  const handleDeleteAccount = () => {
    // Here you would typically handle the account deletion process
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been received. We'll process it shortly.",
      variant: "destructive",
    })
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
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  {isEditing ? (
                    <Input
                      value={name}
                      //onChange={(e) => setName(e.target.value)}
                      className="text-2xl font-bold mb-1"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold mb-1">{name}</h1>
                  )}
                  <p className="text-gray-500">{userData.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700">{bio}</p>
              )}
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <Button onClick={handleSaveProfile}>Save Profile</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>

          <Tabs defaultValue="campaigns" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="backed">Backed Projects</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>My Campaigns</CardTitle>
                  <CardDescription>Campaigns you've created and their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.createdCampaigns.map((campaign) => (
                    <div key={campaign.id} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-semibold">{campaign.title}</h3>
                      <Progress value={campaign.fundingProgress} className="h-2 mt-2" />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{campaign.fundingProgress}% funded</span>
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
                <CardContent>
                  {userData.backedProjects.map((project) => (
                    <div key={project.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <Badge variant={project.status === "Successful" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Backed with ${project.amount}</p>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </CardContent>
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
                    <Input id="email" value={userData.email} readOnly />
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
                  <Button variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
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