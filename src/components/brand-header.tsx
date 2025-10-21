import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className={cn(
            'flex items-center gap-3 px-4 py-3',
            'hover:bg-transparent cursor-default',
          )}
        >
          <img
            src="/logo.png"
            alt="Orion logo"
            className="size-6 ml-1 rounded-md object-contain"
          />
          <span className="text-lg  tracking-tight text-gray-900 dark:text-gray-100">
            Orion
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
