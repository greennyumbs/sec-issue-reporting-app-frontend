"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const Navbar: React.FC = () => {
  const router = useRouter(); // Move useRouter here

  const handleLogout = async () => {
    // Implement your logout logic (clear cookies, local storage, etc.)
    router.push("/"); // Now you can use the router within handleLogout
    console.log("Logout clicked");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/workList">Work List</Link>
        </li>
        <li>
          <Link href="/workList2">Work List2</Link>
        </li>
        <li>
          <Link href="/historyLog">History Log</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
