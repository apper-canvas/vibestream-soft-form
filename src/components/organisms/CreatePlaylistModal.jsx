import { useState } from "react"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card"
import playlistService from "@/services/api/playlistService"

const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.user.profile)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverImage: ""
  })
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData({ ...formData, coverImage: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error("Please enter a playlist name")
      return
    }

    setLoading(true)
    try {
      await playlistService.create({
        ...formData,
        userId: user.id,
        coverImage: formData.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1DB954&color=fff&size=400`
      })
      
      toast.success("Playlist created successfully!")
      setFormData({ name: "", description: "", coverImage: "" })
      setImagePreview(null)
      onClose()
    } catch (error) {
      toast.error("Failed to create playlist")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg"
          >
            <Card className="bg-surface/95 backdrop-blur-md border-gray-700 shadow-2xl">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Create New Playlist</CardTitle>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                      <div className="w-48 h-48 rounded-lg bg-gray-800 overflow-hidden border-2 border-gray-700">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Playlist cover"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ApperIcon name="ImagePlus" size={48} className="text-gray-600" />
                          </div>
                        )}
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                        <div className="text-center">
                          <ApperIcon name="Upload" size={24} className="text-white mx-auto mb-1" />
                          <span className="text-white text-sm">Upload Cover</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Playlist Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="My Awesome Playlist"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your playlist..."
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={loading || !formData.name.trim()}
                      className="flex-1"
                    >
                      {loading ? (
                        <>
                          <ApperIcon name="Loader2" size={18} className="mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Check" size={18} className="mr-2" />
                          Create Playlist
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreatePlaylistModal