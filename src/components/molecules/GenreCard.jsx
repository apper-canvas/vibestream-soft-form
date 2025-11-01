import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const GenreCard = ({ genre, onSelectGenre }) => {
  const gradientClass = `genre-${genre.name.toLowerCase().replace(/[^a-z]/g, '')}`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group"
      onClick={() => onSelectGenre(genre)}
    >
      <div className={`${gradientClass} rounded-xl p-6 h-32 flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:shadow-xl`}>
        <div className="relative z-10">
          <h3 className="text-white font-bold text-xl mb-2">{genre.name}</h3>
        </div>
        
        <div className="relative z-10 flex justify-end">
          <ApperIcon 
            name={genre.icon} 
            className="w-8 h-8 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-200" 
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors" />
      </div>
    </motion.div>
  )
}

export default GenreCard