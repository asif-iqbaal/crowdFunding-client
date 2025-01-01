import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { Search, Filter, Loader2 } from 'lucide-react'
import { ICampaigns } from '../../constant'
import { All_Campaigns } from '../../action/allCampaigns'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authContext/authContext'


const categories = [
  "All Categories",
  "Sustainability",
  "Technology",
  "Film & Video",
  "Fashion",
  "Education",
  "Food",
]

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [campaigns,setCampaigns] = useState<ICampaigns[]>([]);
  const [loading,setLoading] = useState<boolean>(true);
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All Categories' || campaign.category === selectedCategory)
  )
  const {isDark} = useAuth();
  useEffect(()=>{
    const getCamps = async () => {
        try {
            const campaign = await All_Campaigns();
            setCampaigns(campaign);
        } catch (error:any) {
            console.log("error",error);
        }finally{
          setLoading(false);
        }
    }
    getCamps();
},[])

if (loading) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}

  return (
    <div className={`min-h-screen ${isDark?"bg-gray-900 text-white":"bg-gradient-to-b from-purple-50 to-white"} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Discover Amazing Campaigns
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-96">
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter size={20} className="text-gray-500" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCampaigns.map((campaign) => (
                campaign.approved === true && campaign.daysLeft != 0 &&
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{campaign.title}</CardTitle>
                      <CardDescription>{campaign.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-2">{campaign.category}</Badge>
                      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2.5 rounded-full" style={{ width: `${(campaign.currentFunding / campaign.fundingGoal) * 100}%` }}></div>
                        </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>₹{campaign.currentFunding} raised</span>
                        <span>{Math.round((campaign.currentFunding / campaign.fundingGoal) * 100)}%</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {/* <div className="text-sm text-gray-500">{campaign.daysLeft} days left</div> */}
                      <Button variant="outline"><Link to={`campaign/${campaign._id}`}>View Campaign</Link></Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCampaigns.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-xl text-gray-600">No campaigns found. Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}