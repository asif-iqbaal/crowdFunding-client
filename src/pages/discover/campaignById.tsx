import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { Heart, Share2, Clock, DollarSign, Users } from 'lucide-react';
import { CampaignById } from '../../action/getCampaignById';
import { ICampaignById } from '../../constant';
import { BackProject } from '../../action/donation.action';

export default function ViewCampaignPage() {
  const [activeTab, setActiveTab] = useState("story");
  const [isBackingDialogOpen, setIsBackingDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [campaignData, setCampaignData] = useState<ICampaignById []| null>(null);
  const [isProjectBacked, setIsProjectBacked] = useState<boolean>(false); 
  const { _id } = useParams();
  const {toast} = useToast();

  useEffect(() => {
    const getCampaign = async () => {
      if (_id) {
        try {
          const campaigns= await CampaignById(_id);
          setCampaignData(campaigns);
        } catch (error: any) {
          toast({
            title: "Error",
            description: "Failed to fetch campaign details",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch campaign details",
          variant: "destructive",
        });
      }
    };
    getCampaign();
  }, [_id,isProjectBacked]);

  const handleBacking = async () => {
    if (_id && amount) {
      try {
        const back =  await BackProject({ amount, _id });
         setIsProjectBacked((prev) => !prev);
         if(back){
          toast({
            title: "Success",
            description: "Thanks for backing this project!",
          });
         }else{
          toast({
            title: "Error",
            description: "Failed to process your backing.",
            variant: "destructive",
          });
         }
        setIsBackingDialogOpen(false);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to process your backing.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">{campaignData?.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div>
              <p className="font-semibold">{campaignData?.creator}</p>
              <p className="text-sm text-gray-500">{campaignData?.category}</p>
            </div>
          </div>

          <img src={campaignData?.image} alt={campaignData?.title} className="w-full rounded-lg mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Campaign Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{campaignData?.description}</p>
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" /> Like
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">₹{campaignData?.currentFunding}</div>
                <p className="text-gray-500 mb-2">raised of ₹{campaignData?.fundingGoal?.toLocaleString()} goal</p>
                <Progress value={(campaignData?.currentFunding / campaignData?.fundingGoal) * 100} className="h-2 mb-4" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  {/* <div>
                    <div className="text-2xl font-semibold">{campaignData?.donators?.toLocaleString()}</div>
                    <p className="text-gray-500">Backers</p>
                  </div> */}
                  <div>
                    <div className="text-2xl font-semibold">{campaignData?.daysLeft}</div>
                    <p className="text-gray-500">Days Left</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isBackingDialogOpen} onOpenChange={setIsBackingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Back This Project</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Support This Project</DialogTitle>
                      <DialogDescription>
                        Choose a reward or enter a custom amount to back this project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* {campaignData?.rewards?.map((reward) => (
                        <div
                          key={reward.id}
                          className={`p-4 border rounded-lg cursor-pointer ${selectedReward === reward.amount ? 'border-purple-500' : 'border-gray-200'}`}
                          onClick={() => setSelectedReward(reward.amount)}
                        >
                          <h3 className="font-semibold">{reward.title} - ${reward.amount}</h3>
                          <p className="text-sm text-gray-500">{reward.description}</p>
                          <p className="text-sm text-gray-500 mt-2">{reward.claimed} / {reward.limit} claimed</p>
                        </div>
                      ))} */}
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="custom-amount">Custom Amount:</Label>
                        <Input
                        id="custom-amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setAmount(isNaN(value) ? 0 : value);
                          setSelectedReward(null);
                        }}
                      />

                      </div>
                    </div>
                    <DialogFooter>
                      {campaignData?.daysLeft<1?<p className='text-red-600'>can't back to this campaign</p>:<Button onClick={handleBacking}>Confirm Backing</Button>}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
