import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from "./pages/Home/home"
import Navigation from "./components/shared/navigation"
import About from "./pages/about/about"
import StartAProjectPage from "./pages/campaign/campaign"
import DiscoverPage from "./pages/discover/discover"
import ViewCampaignPage from "./pages/discover/campaignById"
import ScrollToTop from "./components/shared/scrollToTop"
import { Toaster } from "./components/ui/toaster"
function App() {

  return (
   <Router>
    <ScrollToTop />
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/start-project' element={<StartAProjectPage />} />

      
        <Route path="/discover" >
          <Route index element={<DiscoverPage />} />  {/* Default Discover page */}
          <Route path="campaign/:_id" element={<ViewCampaignPage />} /> {/* Nested Campaign by ID */}
        </Route>
    </Routes>
    <Toaster />
   </Router>
  )
}

export default App
