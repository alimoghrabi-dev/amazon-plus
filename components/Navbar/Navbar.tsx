import { getCart } from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCarBtn from "./ShoppingCarBtn";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="bg-base-100 border-b border-gray-400 border-opacity-10">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image src={"/logo.png"} alt="logo" width={35} height={35} />
            AmazonPlus
          </Link>
          <div className="w-px h-6 bg-black/40" />
          <Link
            href="/add-product"
            className="text-primary font-medium text-base mt-0.5 transition-all hover:text-primary-focus ml-2">
            Add Product
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ShoppingCarBtn cart={cart} />
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
