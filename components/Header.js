import Link from "next/link";

function Header() {
  return (
    <div className="p-3 bg-indigo-700 text-white flex items-center justify-between">
      <h1 className="font-bold text-3xl">Before New Year</h1>
      <div className="btns space-x-3 mr-6">
        <Link href="/">
          <a className="hover:underline text-lg font-medium">Home</a>
        </Link>
        <Link href="/notes">
          <a className="hover:underline text-lg font-medium">Notes</a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
