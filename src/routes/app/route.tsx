// THIS IS THE LAYOUT FILE FOR THE /app directory don't remove it
import { Outlet, createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/app')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div className="relative w-full min-h-screen">
      <div>Navbar Placeholder</div>
      <div className="mt-20 md:px-8 px-6">
        <Outlet />
      </div>
    </div>
  )
}
