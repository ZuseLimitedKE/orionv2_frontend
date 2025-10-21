import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url

          // Collapsible for items with sub-links
          if (item.items && item.items.length > 0) {
            const isOpen =
              item.items.some((sub) => sub.url === location.pathname) ||
              isActive

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`transition-colors ${isActive
                          ? 'text-primary font-semibold bg-[color-mix(in_oklab,var(--primary)_20%,white)] dark:bg-[color-mix(in_oklab,var(--primary)_25%,black)]'
                          : 'text-gray-700 hover:text-[var(--primary)] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const subActive = location.pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                to={subItem.url}
                                className={`block w-full rounded-md px-2 py-1.5 transition-colors ${subActive
                                    ? 'text-[var(--primary)] font-medium bg-[color-mix(in_oklab,var(--primary)_15%,white)] dark:bg-[color-mix(in_oklab,var(--primary)_20%,black)]'
                                    : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                                  }`}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          // Regular link (no sub-items)
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`transition-colors ${isActive
                    ? 'text-[var(--primary)] font-semibold bg-[color-mix(in_oklab,var(--primary)_20%,white)] dark:bg-[color-mix(in_oklab,var(--primary)_25%,black)]'
                    : 'text-gray-700 hover:text-[var(--primary)] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
