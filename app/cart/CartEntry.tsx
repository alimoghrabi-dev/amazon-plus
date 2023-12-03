"use client";

import { cartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface Props {
  cartItem: cartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartEntry = ({
  cartItem: { product, quantity },
  setProductQuantity,
}: Props) => {
  const [isPending, setTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-5">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imgUrl}
            alt={product.name}
            width={300}
            height={800}
            className="rounded-lg max-h-[280px] object-cover"
          />
        </Link>
        <div className="flex flex-col items-start justify-center">
          <Link
            href={`/products/${product.id}`}
            className="font-bold text-xl py-2.5">
            {product.name}
          </Link>
          <div>Price : {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity :{" "}
            <select
              className="select select-bordered"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                setTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}>
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            Total :{" "}
            {isPending && <span className="loading loading-bars loading-xs" />}
            {formatPrice(product.price * quantity)}
          </div>
        </div>
      </div>

      <div className="divider" />
    </div>
  );
};

export default CartEntry;
