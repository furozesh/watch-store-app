import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-5">
      <h1>Watch Store</h1>
      <SearchBox/>
    </div>
  )
}
