import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    window.location.href = "/login"
  }
  const token = typeof window !== "undefined" ?
    localStorage.getItem("token")
    : null;
  return (
    <div className="flex justify-between items-center p-5">
      <h1>Watch Store</h1>
      <SearchBox/>
      {
        token ? <button onClick={logout} className="cursor-pointer">خروج</button> : 
        <Link href="/login" className="cursor-pointer">ورود</Link>
      }
    </div>

  )
}
