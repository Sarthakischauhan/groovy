import Link from "next/link";

interface NavbarProps{};

const  Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black">
      <div className="text-2xl font-bold font-antonio">Groovy</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-600">Dashboard</Link>
        <Link href="/questions" className="hover:text-gray-600">Questions</Link>
      </div>
    </nav>
  );
}

export default Navbar;