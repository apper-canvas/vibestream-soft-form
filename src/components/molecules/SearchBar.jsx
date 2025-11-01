import { useState, useEffect } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const SearchBar = ({ onSearch, placeholder = "Search songs, artists, albums...", className }) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounce)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-12 h-12 bg-surface/60 backdrop-blur-md border-gray-600 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar