import { BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Home from "./pages/Home/home"
import Navigation from "./components/shared/navigation"
import About from "./pages/about/about"
import StartAProjectPage from "./pages/campaign/campaign"
import DiscoverPage from "./pages/discover/discover"
import ViewCampaignPage from "./pages/discover/campaignById"
import ScrollToTop from "./components/shared/scrollToTop"
import { Toaster } from "./components/ui/toaster"
import ProfilePage from "./pages/profile/profile"
import AdminDashboard from "./pages/Admin/admin-dashboard"
import { useAuth } from "./authContext/authContext"
import NotFound from "./components/shared/pageNotFound"
import VerifyPage from "./components/shared/verification"

function App() {
    const {role} = useAuth();
    const isVerificationPage = window.location.pathname === "/verify";
  return (
   <Router>
    <ScrollToTop />
     {!isVerificationPage && <Navigation />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/start-project' element={<StartAProjectPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      {role == 'admin' && <Route path='/dashboard' element={<AdminDashboard />} />}
      {role == 'admin' && <Route path='/admin/campaign/:_id' element={<ViewCampaignPage/>} />}
        <Route path="/discover" >
          <Route index element={<DiscoverPage />} /> 
          <Route path="campaign/:_id" element={<ViewCampaignPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<VerifyPage />} />
    </Routes>
    <Toaster />
   </Router>
  )
}

export default App
