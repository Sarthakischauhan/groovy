import Link from "next/link";
import Image from "next/image"
import { auth, signOut } from "@/utils/auth";
import { Button } from "../ui/Button";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/Dropdown"

interface NavbarProps{};

const Navbar: React.FC<NavbarProps> = async () => {
  const session = await auth();
  return (
    <nav className="sm:w-9/10 md:w-3/5 mx-auto flex items-center justify-between p-4 bg-white text-black">
      <div className="text-2xl font-bold font-antonio"><a href="/">Groovy</a></div>
      {session?.user?.isLoggedIn && 
        <div className="space-x-4 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/62596924?v=4" alt="sample" width="40" height="40" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <form action= {async () => {
                'use server';
                await signOut();
                }}
                >
                  <Button type="submit">Logout</Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
      {!session  && 
        <Link href="/login" className="hover:text-gray-600">Login</Link>
      }
    </nav>
  );
}

export default Navbar;