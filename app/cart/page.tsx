import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export const metadata = {
  title: "Your Cart | AmazonPlus",
};

const Page = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 pb-7 pt-2">
        - Your Shopping Cart
      </h1>
      {cart?.items.map((item) => (
        <CartEntry
          key={item.id}
          cartItem={item}
          setProductQuantity={setProductQuantity}
        />
      ))}

      {!cart?.items.length && (
        <p className="py-5">
          There are no items in your cart.{" "}
          <Link href="/" className="font-bold text-primary">
            Shop Now!
          </Link>
        </p>
      )}
      <div className="mb-3 font-bold flex flex-col items-end gap-3 sm:items-start mt-2.5">
        Total: {formatPrice(cart?.subTotal || 0)}
        <button className="btn btn-primary mb-[32px] sm:w-[200px]">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Page;
