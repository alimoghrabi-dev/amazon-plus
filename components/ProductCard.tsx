import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface CardProps {
  product: Product;
}

const ProductCard = ({ product }: CardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() < 100 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={`/products/${product.id}`}
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
      <figure>
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={700}
          height={400}
          className="h-52 object-cover rounded-sm"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className="badge badge-secondary">New</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
