import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from "./pages/Home/home"
import Navigation from "./components/shared/navigation"
import About from "./pages/about/about"
import StartAProjectPage from "./pages/campaign/campaign"
import DiscoverPage from "./pages/discover/discover"
import ViewCampaignPage from "./pages/discover/campaignById"
import ScrollToTop from "./components/shared/scrollToTop"
import { Toaster } from "./components/ui/toaster"
import ProfilePage from "./pages/profile/profile"
import { useAuth } from "./authContext/authContext"

function App() {
    const {role} = useAuth();
  return (
   <Router>
    <ScrollToTop />
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/start-project' element={<StartAProjectPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      {role == 'admin' && <Route path='/profile' element={<ProfilePage />} />}
        <Route path="/discover" >
          <Route index element={<DiscoverPage />} /> 
          <Route path="campaign/:_id" element={<ViewCampaignPage />} />
        </Route>
    </Routes>
    <Toaster />
   </Router>
  )
}

export default App
