import Link from "next/link";
import { auth, signOut } from "@/utils/auth";
import { Button } from "../ui/Button";
import { ExitIcon } from "@radix-ui/react-icons";

interface NavbarProps{};

const Navbar: React.FC<NavbarProps> = async () => {
  const session = await auth();
  return (
    <nav className="sm:w-9/10 md:w-3/5 mx-auto flex items-center justify-between p-4 bg-white text-black">
      <div className="text-2xl font-bold font-antonio"><a href="/">Groovy</a></div>
      {session && 
      <div className="space-x-4 flex items-center">
        <Link href="/" className="hover:text-gray-600">Dashboard</Link>
        <Link href="/questions" className="hover:text-gray-600">Questions</Link>
        <form action= {async () => {
            'use server';
            await signOut();
          }}
        >
          <Button className="signout">
            <ExitIcon />
          </Button>
        </form>

      </div>
      }
      {!session && 
        <Link href="/login" className="hover:text-gray-600">Login</Link>
      }
    </nav>
  );
}

export default Navbar;