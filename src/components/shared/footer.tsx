import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "../../authContext/authContext";

export function Footer(){
    const {isDark} = useAuth();
    return(
        <footer className={`${isDark?"bg-gray-950 text-white":"bg-white text-black"}  `}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-gradient-to-r from-purple-400 to-blue-400">Grow Fund</h3>
              <p className="text-gray-400">Empowering creators and innovators worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>How It Works</Link></li>
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>Start a Project</Link></li>
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>Explore</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>FAQ</Link></li>
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>Guidelines</Link></li>
                <li><Link to="#" className={`${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none bg-gray-800 border-gray-700 text-white" />
                <Button type="submit" className="rounded-l-none bg-gradient-to-r from-purple-600 to-blue-500">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t border-gray-800 text-center ${isDark?"text-gray-400 hover:text-white transition-colors":"text-black  hover:text-gray-500 transition-colors"}`}>
            <p>&copy; {new Date().getFullYear()} Grow Fund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}