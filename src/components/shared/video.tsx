import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Maximize2 } from 'lucide-react'
import { Button } from "../ui/button"

interface CampaignVideoProps {
  videoId: string
}

export default function CampaignVideo({ videoId }: CampaignVideoProps = { videoId: 'voF1plqqZJA' }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    const iframe = document.querySelector('iframe') as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: isPlaying ? 'pauseVideo' : 'playVideo'
        }),
        '*'
      )
    }
  }

  const openFullscreen = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen()
      } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
        iframe.webkitRequestFullscreen()
      } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen()
      }
    }
  }

  return (
    <motion.div 
      className="relative w-full max-w-2xl mx-auto aspect-video bg-gray-200 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title="How to Create a Successful Crowdfunding Campaign"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          onClick={openFullscreen}
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>
      </div>
    </motion.div>
  )
}