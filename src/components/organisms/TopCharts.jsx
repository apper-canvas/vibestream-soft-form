import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import ChartItem from "@/components/molecules/ChartItem"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import songService from "@/services/api/songService"

const TopCharts = ({ onPlay, currentSong, isPlaying }) => {
  const [charts, setCharts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCharts = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await songService.getTopCharts(10)
      setCharts(data)
    } catch (err) {
      setError("Failed to load top charts. Please try again.")
      console.error("Error loading charts:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCharts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Loading className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Error message={error} onRetry={loadCharts} className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  if (charts.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Empty 
            title="No chart data available"
            message="Charts are currently being updated. Check back soon!"
            icon="BarChart3"
            className="min-h-[400px]"
          />
        </div>
      </section>
    )
  }

  return (
    <section id="charts" className="py-20 px-4 bg-gradient-to-b from-surface/10 via-background to-surface/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Top
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
              Charts
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This week's most popular tracks across all genres
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {charts.map((chartEntry, index) => (
            <motion.div
              key={chartEntry.song.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ChartItem 
                chartEntry={chartEntry}
                onPlay={onPlay}
                isPlaying={currentSong?.id === chartEntry.song.id && isPlaying}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <ApperIcon name="Clock" className="w-4 h-4" />
            <span>Charts updated weekly</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TopCharts