import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Menu, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import LoginDialog from './login'
import SignupDialog from './signup'
import { useAuth } from '../../authContext/authContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import { Avatar, AvatarFallback} from "../../components/ui/avatar"

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { scrollY } = useScroll()
    const {isAuthenticated,logout,user} = useAuth();
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
    )

    const navVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='z-auto'>
            <motion.header 
                className="fixed w-full z-10"
                initial="hidden"
                animate="visible"
                variants={navVariants}
                style={{ backgroundColor }}
            >
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                        CrowdFund
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/discover" className="text-gray-600 hover:text-purple-600 transition-colors">Discover</Link>
                        <Link to="/start-project" className="text-gray-600 hover:text-purple-600 transition-colors">Start a Project</Link>
                        <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</Link>
                    </div>
                    <div className="hidden md:flex space-x-2">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            {/* <AvatarImage src={} alt={user?.username} /> */}
                                            <AvatarFallback>{user?.username?.charAt(0) || <User />}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                              <div className="hidden md:flex space-x-2">
                        <LoginDialog />
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"><SignupDialog /></Button>
                        </div>
                            </>
                        )}
                    </div>   
                    <button 
                        className="md:hidden" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </nav>
                {isMenuOpen && (
                    <motion.div 
                        className="md:hidden bg-white shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <Link to="/discover" className="text-gray-600 hover:text-purple-600 transition-colors">Discover</Link>
                            <Link to="/start-project" className="text-gray-600 hover:text-purple-600 transition-colors">Start a Project</Link>
                            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</Link>
                            <LoginDialog />
                            <Button className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-blue-500 text-white"><SignupDialog /></Button>
                        </div>
                    </motion.div>
                )}
            </motion.header>
        </div>
    );
}
