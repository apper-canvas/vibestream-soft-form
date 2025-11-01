import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const AudioVisualizer = ({ getFrequencyData, isPlaying }) => {
  const [frequencyData, setFrequencyData] = useState(new Array(32).fill(0))
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!isPlaying || !getFrequencyData) {
      setFrequencyData(new Array(32).fill(0))
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const updateFrequencyData = () => {
      const data = getFrequencyData()
      setFrequencyData(data)
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData)
    }

    updateFrequencyData()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, getFrequencyData])

  return (
    <div className="flex items-center justify-center space-x-1 h-14 px-4">
      {frequencyData.map((value, index) => {
        const height = Math.max(8, value * 48)
        return (
          <motion.div
            key={index}
            className="w-1 rounded-full bg-gradient-to-t from-primary to-accent"
            animate={{
              height: `${height}px`,
            }}
            transition={{
              duration: 0.1,
              ease: 'easeOut',
            }}
            style={{
              minHeight: '8px',
            }}
          />
        )
      })}
    </div>
  )
}

export default AudioVisualizer