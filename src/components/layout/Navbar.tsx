// // import Logo from "@/components/navbar-components/logo"
// import { Button } from "@/components/ui/button"
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { ModeToggle } from "./ModeToggle"
// import { Link } from "react-router"
// import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
// import { useAppDispatch } from "@/redux/hook"
// import { role } from "@/constants/role"

// // Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//   { href: "/", label: "Home", active: true, role: "Publish" },
//   { href: "about", label: "About", role: "Publish" },
//   { href: "contact", label: "Contact Us", role: "Publish" },
//   { href: "admin", label: "Dashboard", role: role.Admin },
//   { href: "sender", label: "Dashboard", role: role.Sender },
//   { href: "receiver", label: "Dashboard", role: role.Receiver },
// ]

// export default function Navbar() {

//   const { data } = useUserInfoQuery(undefined);
//   console.log(data?.data?.email);
//   const [logout] = useLogoutMutation();
//   const dispatch = useAppDispatch()

//   const handleLogout = () => {
//     logout(undefined)
//     dispatch(authApi.util.resetApiState())
//   }

//   return (
//     <header className="border-b px-4 md:px-6 container mx-auto">

//       <div className="flex h-16 items-center justify-between gap-4">
//         {/* Left side */}
//         <div className="flex items-center gap-2">
//           {/* Mobile menu trigger */}
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 className="group size-8 md:hidden"
//                 variant="ghost"
//                 size="icon"
//               >
//                 <svg
//                   className="pointer-events-none"
//                   width={16}
//                   height={16}
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M4 12L20 12"
//                     className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//                   />
//                   <path
//                     d="M4 12H20"
//                     className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//                   />
//                   <path
//                     d="M4 12H20"
//                     className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//                   />
//                 </svg>
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent align="start" className="w-36 p-1 md:hidden">
//               <NavigationMenu className="max-w-none *:w-full">
//                 <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
//                   {navigationLinks.map((link, index) => (
//                     <NavigationMenuItem key={index} className="w-full">
//                       <NavigationMenuLink
//                         href={link.href}
//                         className="py-1.5"
//                         active={link.active}
//                       >
//                         {link.label}
//                       </NavigationMenuLink>
//                     </NavigationMenuItem>
//                   ))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </PopoverContent>
//           </Popover>
//           {/* Main nav */}
//           <div className="flex items-center gap-6">
//             <Link to={"/"}>
//              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z" fill="#FF4D00"></path>
//               </svg>
//             </Link>



//             {/* Navigation menu */}
//             <NavigationMenu className="max-md:hidden">

//               <NavigationMenuList className="gap-2">
//                 {navigationLinks.map((link, index) => (
//                   <div>
//                     {link.role === "Publish" &&
//                       <NavigationMenuItem key={index}>
//                         <NavigationMenuLink
//                           active={link.active}
//                           href={link.href}
//                           className="text-muted-foreground hover:text-primary py-1.5 font-medium"
//                         >
//                           {link.label}
//                         </NavigationMenuLink>
//                       </NavigationMenuItem>
//                     }
//                     {link.role === data?.data?.role &&
//                       <NavigationMenuItem key={index}>
//                         <NavigationMenuLink
//                           active={link.active}
//                           href={link.href}
//                           className="text-muted-foreground hover:text-primary py-1.5 font-medium"
//                         >
//                           {link.label}
//                         </NavigationMenuLink>
//                       </NavigationMenuItem>
//                     }

//                   </div>
//                 ))}
//               </NavigationMenuList>


//             </NavigationMenu>
//           </div>
//         </div>
//         {/* Right side */}
//         <div className="flex items-center gap-2">
//           <ModeToggle></ModeToggle>
//           {
//             data?.data?.email ?
//               <Button onClick={handleLogout} asChild size="sm" className="text-sm">
//                 <Link to={"/login"}>LogOut</Link>
//               </Button>
//               :
//               <Button asChild variant="ghost" size="sm" className="text-sm">
//                 <Link to={"/login"}>Sign In</Link>
//               </Button>
//           }

//           {
//             data?.data?.email ?
//               ""
//               :
//               <Button asChild size="sm" className="text-sm">
//                 <Link to={"/register"}>Get Started</Link>
//               </Button>
//           }

//         </div>
//       </div>
//     </header>
//   )
// }


// Navbar.tsx


     import React from 'react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { Menu, X } from "lucide-react"; // X icon for mobile menu close button
import toast from 'react-hot-toast';

const navigationLinks = [
  { href: "/", label: "Home", role: "Publish" },
  { href: "/about", label: "About", role: "Publish" },
  { href: "/contact", label: "Contact Us", role: "Publish" },
  { href: "/admin", label: "Dashboard", role: role.Admin },
  { href: "/sender", label: "Dashboard", role: role.Sender },
  { href: "/receiver", label: "Dashboard", role: role.Receiver },
];

export default function Navbar() {
  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const userRole = userData?.data?.role;
  const isLoggedIn = !!userRole;

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };
  
  const filteredLinks = navigationLinks.filter(
    (link) => link.role === "Publish" || link.role === userRole
  );
  
  return (
    <header className="border-b px-4 md:px-6 container mx-auto">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* লোগো এবং বামদিকের নেভিগেশন */}
        <div className="flex items-center gap-6">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-5 w-5 group-aria-expanded:hidden" />
                <X className="h-5 w-5 hidden group-aria-expanded:block" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filteredLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        asChild
                        active={isLinkActive(link.href)}
                        className="py-1.5 font-medium"
                      >
                        <Link to={link.href}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <Link to={"/"}>
        
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z" fill="#FF4D00"></path>
            </svg>
          </Link>

          {/* ডেস্কটপ নেভিগেশন মেনু */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {filteredLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    active={isLinkActive(link.href)}
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={link.href}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ডানদিকের উপাদান */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* My Profile button shown only on desktop */}
              <div className="max-md:hidden">
                <Button asChild size="sm" className="text-sm">
                  <Link to={`/${userRole}/myprofile`}>My Profile</Link>
                </Button>
              </div>
              <Button onClick={handleLogout} size="sm" className="text-sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}