import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Activity, IndianRupee } from 'lucide-react'
import { All_Campaigns, ApprovedCampaigns, RejectCampaigns } from '../../action/allCampaigns'
import { ICampaigns } from '../../constant'
import { toast } from '../../hooks/use-toast'
import { useAuth } from '../../authContext/authContext'

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState<ICampaigns[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 })
  const router = useNavigate()
  const {isDark} = useAuth();

  useEffect(() => {
    const total = campaigns.length
    const active = campaigns.filter(c => c?.approved === true)?.length
    const inactive = campaigns.filter(c => c?.approved === false)?.length
    setStats({ total, active, inactive })
  }, [campaigns])

  useEffect(()=>{
    const GetCamps = async () => {
        const data = await All_Campaigns();
        setCampaigns(data);
    }
    GetCamps();
  },[campaigns]);

  const handleApproved = async(id:string) => {
    try {
        const approved = await ApprovedCampaigns(id);
        if(approved){
            toast({
                title: "Succes",
                description: "Campaigns approved",
                variant: "default",
              })
        }
    } catch (error:any) {
        toast({
            title: "Error",
            description: "Failed",
            variant: "destructive",
          })
    }
  }

  const handleReject = async(id:string) => {
    try {
        const approved = await RejectCampaigns(id);
        if(approved){
            toast({
                title: "Succes",
                description: "Campaigns rejected",
                variant: "default",
              })
        }
    } catch (error:any) {
        toast({
            title: "Error",
            description: "Failed",
            variant: "destructive",
          })
    }
  }

  const handleCampaignClick = (id: string) => {
    router(`/admin/campaign/${id}`)
  }
  return (
    <div className={`container mx-auto px-8 py-12 h-screen ${isDark?"bg-gray-900 text-white" :null }`} >
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Campaigns</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inactive}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                campaign.approved === false && 
                <TableRow key={campaign?._id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleCampaignClick(campaign?._id)}>
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>{campaign.creator}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {campaign?.fundingGoal.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {campaign?.category}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign?.status === 'active' ? 'outline' : campaign?.status === 'inactive' ? 'destructive' : 'default'}>
                      {campaign?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {campaign?.status === 'pending' && (
                      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleApproved (campaign._id)}>
                          <CheckCircle className="h-4 w-4 mr-1" /> Accept
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-500 hover:bg-red-600 text-white" onClick={() =>  handleReject(campaign._id)}>
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}