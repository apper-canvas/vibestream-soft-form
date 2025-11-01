import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Sidebar from "@/components/molecules/Sidebar"
import ProfileMenu from "@/components/molecules/ProfileMenu"
import ApperIcon from "@/components/ApperIcon"

const Layout = () => {
  const user = useSelector((state) => state.user.profile)

  return (
<div className="min-h-screen bg-background flex">
      {/* Bottom Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <ApperIcon name="Music2" size={24} className="text-primary" />
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VibeStream Premium
              </h1>
            </div>

            {user && <ProfileMenu user={user} />}
          </div>
        </header>

{/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout