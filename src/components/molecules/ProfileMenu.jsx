import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/layouts/Root";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import { clearProfile } from "@/store/slices/userSlice";
import { logout } from "@/store/slices/authSlice";

const ProfileMenu = ({ user }) => {
  const { logout: apperLogout } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await apperLogout()
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout")
    }
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <img
          src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=1DB954&color=fff`}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-white text-sm font-medium hidden md:block">
          {user.firstName} {user.lastName}
        </span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="w-4 h-4 text-gray-400 hidden md:block" 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=1DB954&color=fff`}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-400 text-sm">{user.emailAddress}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/profile')
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <ApperIcon name="User" size={18} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate('/settings')
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <ApperIcon name="Settings" size={18} />
                <span>Settings</span>
              </button>

              <div className="border-t border-gray-700 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ApperIcon name="LogOut" size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileMenu