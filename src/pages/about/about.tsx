import { motion } from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../authContext/authContext'

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
  const {isDark} = useAuth();
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
    <div className={`min-h-screen ${isDark ? "bg-gray-950 text-white" : "bg-gradient-to-b from-purple-50 via-white to-blue-50"}`}>
      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About GrowFund
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're on a mission to empower creators and innovators by connecting them with a global community of backers who believe in turning ideas into reality.
            </motion.p>
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="/fundAbout.jpg" 
                alt="CrowdFund Team" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        <section className={`py-16 px-4 ${isDark ? "bg-gray-900" : "bg-gradient-to-r from-purple-50 to-blue-50"}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Our Story</h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <h3 className={`text-2xl font-semibold mb-4 ${isDark? "text-white" :"text-black"}`}>From Idea to Impact</h3>
                <p className="text-gray-600 mb-4">
                  Grow Fund was born from a simple idea: what if we could create a platform that connects innovative ideas with the people who want to support them? Since our launch in 2025, we've helped thousands of creators bring their projects to life.
                </p>
                <p className="text-gray-600">
                  Our journey has been one of continuous growth and learning. We've celebrated successes, learned from challenges, and always kept our focus on our community of creators and backers.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <img
                  src="/fund.svg" 
                  alt="CrowdFund Journey" 
                  width={500} 
                  height={300} 
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Our Values</h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { title: "Innovation", description: "We believe in the power of new ideas to change the world." },
                { title: "Community", description: "We foster connections between creators and supporters." },
                { title: "Transparency", description: "We promote open communication in all our operations." },
                { title: "Empowerment", description: "We give people the tools to bring their ideas to life." },
                { title: "Diversity", description: "We celebrate the unique perspectives of our global community." },
                { title: "Integrity", description: "We uphold the highest standards of honesty and ethics." }
              ].map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of a community that's changing the way ideas come to life. Whether you're a creator or a backer, there's a place for you at CrowdFund.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
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
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Discover Projects</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Start a Project</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Guidelines</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GrowFund. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}