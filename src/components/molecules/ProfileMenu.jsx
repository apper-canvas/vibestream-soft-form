import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { logout } from "@/store/slices/authSlice"
import { clearProfile } from "@/store/slices/userSlice"
import { toast } from "react-toastify"

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearProfile())
    toast.success("Logged out successfully")
    navigate("/")
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white font-medium">{user.name}</span>
        <ApperIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-gray-400"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-surface border border-gray-700 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-primary to-accent rounded-full">
                <ApperIcon name="Crown" size={14} className="text-white mr-1.5" />
                <span className="text-white text-xs font-semibold">Premium Member</span>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  toast.info("Account settings coming soon!")
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ApperIcon name="Settings" size={18} />
                <span>Account Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ApperIcon name="LogOut" size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileMenu