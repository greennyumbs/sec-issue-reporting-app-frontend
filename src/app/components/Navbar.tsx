import Link from "next/link"; // Use Link for client-side navigation

const Navbar = () => {
  const handleLogout = async () => {
    // Implement your logout logic (clear cookies, local storage, etc.)
    console.log("Logout clicked");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/worklist">Work List</Link>
        </li>
        <li>
          <Link href="/historylog">History Log</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>{" "}
        // Always show logout button for now
      </ul>
    </nav>
  );
};

export default Navbar;
