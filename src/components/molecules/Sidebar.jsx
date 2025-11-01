import { NavLink } from "react-router-dom"
import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CreatePlaylistModal from "@/components/organisms/CreatePlaylistModal"

const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const navItems = [
    { path: "/", label: "Home", icon: "Home" },
    { path: "/playlists", label: "Your Playlists", icon: "ListMusic" },
    { path: "/liked-songs", label: "Liked Songs", icon: "Heart" },
    { path: "/following", label: "Following", icon: "Users" }
  ]

  return (
    <>
<aside className="fixed bottom-0 left-0 right-0 h-20 w-full bg-surface border-t border-gray-800 flex items-center justify-center z-50">
        <div className="w-full max-w-7xl px-4 flex items-center justify-between">
<nav className="flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all min-w-[64px] ${
                    isActive
                      ? "text-primary"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <ApperIcon name={item.icon} size={24} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

<Button
            onClick={() => setShowCreateModal(true)}
            variant="gradient"
            className="h-12 px-4 rounded-full flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={20} />
            <span className="hidden sm:inline font-medium">Create</span>
          </Button>
        </div>
      </aside>

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  )
}

export default Sidebar