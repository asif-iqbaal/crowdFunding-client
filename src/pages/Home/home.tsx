import { motion} from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { ArrowRight, Heart, Search, DollarSign, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'



export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { scrollY } = useScroll()
//   const backgroundColor = useTransform(
//     scrollY,
//     [0, 100],
//     ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
//   )

//   const navVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   }
 
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="max-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <main>
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fund Your Dreams, Empower Others
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join our vibrant community of creators and backers. Bring your innovative ideas to life or support projects that inspire you.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white">
               <Link to="/start-project">Start a Project</Link>  <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
               <Link to='/discover'>Explore Projects</Link>  <Search className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "EcoTech Revolution", description: "Sustainable technology for a greener future", raised: 75000, goal: 100000, image: "/placeholder.svg?height=200&width=400" },
                { title: "ArtScape VR", description: "Immersive virtual reality art experiences", raised: 45000, goal: 60000, image: "/placeholder.svg?height=200&width=400" },
                { title: "FoodShare App", description: "Reducing food waste through community sharing", raised: 30000, goal: 50000, image: "/placeholder.svg?height=200&width=400" }
              ].map((project, i) => (
                <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-0">
                      <img src={project.image} alt={project.title} width={400} height={200} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="mb-4 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2.5 rounded-full" style={{ width: `${(project.raised / project.goal) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-600 font-semibold">${project.raised.toLocaleString()} raised</span>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                            Support <Heart className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">How It Works</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: <DollarSign className="h-12 w-12 text-purple-600" />, title: "Create a Project", description: "Share your innovative idea and set an achievable funding goal" },
                { icon: <Users className="h-12 w-12 text-blue-500" />, title: "Get Backers", description: "Spread the word and gather support from our enthusiastic community" },
                { icon: <Zap className="h-12 w-12 text-pink-500" />, title: "Bring It to Life", description: "Receive funds and transform your vision into reality" }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="text-center bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                  variants={fadeInUp}
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">What Our Community Says</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Project Creator", quote: "CrowdFund helped me turn my passion into a successful business. The support from the community was overwhelming!", avatar: "/placeholder.svg?height=100&width=100" },
                { name: "Sarah Lee", role: "Backer", quote: "I love discovering and supporting innovative projects. CrowdFund makes it easy and exciting to be part of something new.", avatar: "/placeholder.svg?height=100&width=100" },
                { name: "Mike Brown", role: "Entrepreneur", quote: "As a repeat creator, I can say that CrowdFund provides the best platform for bringing ideas to life. It's simply unmatched.", avatar: "/placeholder.svg?height=100&width=100" }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg shadow-md"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex  items-center">
                    <img src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Bring Your Idea to Life?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join our community of innovators and make your dream project a reality. Start your journey today!</p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to='/start-project'>Launch Your Project</Link> <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">CrowdFund</h3>
              <p className="text-gray-400">Empowering creators and innovators worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Start a Project</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Explore</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Guidelines</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CrowdFund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}