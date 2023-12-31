import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content justify-start md:justify-center flex-col md:flex-row">
          <Image
            src={products[0].imgUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="max-h-[22.5rem] object-cover max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={`/products/${products[0].id}`}
              className="btn btn-primary">
              Check it out
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
