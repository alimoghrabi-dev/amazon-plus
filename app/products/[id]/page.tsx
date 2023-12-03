import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCart from "./AddToCart";
import { incrementProductQuantity } from "./actions";

interface Props {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }

  return product;
});

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `${product.name} | AmazonPlus`,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imgUrl,
        },
      ],
    },
  };
}

const Page = async ({ params: { id } }: Props) => {
  const product = await getProduct(id);

  return (
    <>
      <div className="w-full items-center justify-center flex flex-col md:flex-row gap-5 mt-12">
        <Image
          src={product.imgUrl}
          alt={product.name}
          width={500}
          height={500}
          className="max-h-[25rem] object-cover rounded-lg"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>
          <AddToCart
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
      <span className="w-full flex items-center justify-end mt-10">
        <Link href={"/"} className="btn btn-secondary">
          Go Back
        </Link>
      </span>
    </>
  );
};

export default Page;
