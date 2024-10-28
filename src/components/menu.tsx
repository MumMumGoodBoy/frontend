import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Beef, ChevronUp, Dice5, Home, Sparkles, User2, Utensils } from 'lucide-react';
import Typography from './ui/typography';
const items = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Food',
    url: '/food',
    icon: Beef,
  },
  {
    title: 'Restaurant',
    url: '/restaurant',
    icon: Utensils,
  },
  {
    title: 'Suggest',
    url: '/suggest',
    icon: Sparkles,
  },
  {
    title: 'Random',
    url: '/random',
    icon: Dice5,
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-3">
          {isMobile ? (
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
          ) : (
            <>
              <Typography variant="h3" fontWeight="bold" className="flex items-center justify-center pt-3">
                WongChula
              </Typography>
              <SidebarSeparator />
            </>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Oak
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>My Favourite</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function Navbar() {
  const { isMobile } = useSidebar();
  return (
    <>
      {isMobile && (
        <div className="shadow-md w-full flex items-center px-4 py-2 justify-between sticky top-0 z-50 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Typography variant="h4" fontWeight="bold">
            WongChula
          </Typography>
          <div />
        </div>
      )}
    </>
  );
}
