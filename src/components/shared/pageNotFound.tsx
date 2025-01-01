import { motion } from 'framer-motion'
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Home, Search, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <AlertCircle className="w-24 h-24 text-yellow-500 mb-6" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Oops! Page Not Found
          </motion.h1>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/discover">
                <Search className="mr-2 h-4 w-4" /> Explore Projects
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}