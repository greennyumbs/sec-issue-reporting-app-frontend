"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export const Navbar: React.FC = () => {
  const router = useRouter(); // Move useRouter here

  const handleLogout = async () => {
    // Implement your logout logic (clear cookies, local storage, etc.)
    router.push("/"); // Now you can use the router within handleLogout
    console.log("Logout clicked");
  };

  return (
    <nav className="flex justify-between mb-10">
      <span>
        <Link className="btn btn-primary mr-5 w-60" href="/workList">
          Work List
        </Link>
        <Link className="btn btn-primary w-60" href="/historyLog">
          History Log
        </Link>
      </span>
      <button className="btn btn-primary btn-outline" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};
