import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/components/FormSubmitButton";

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imgUrl = formData.get("imgUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imgUrl || !price) {
    return;
  }

  await prisma.product.create({
    data: { name, description, imgUrl, price },
  });

  redirect("/");
}

const Page = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <h1 className="text-2xl mb-3 font-bold py-6">Add Product</h1>

      <form
        action={addProduct}
        className="w-full flex items-center justify-center flex-col">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mb-5 w-[90%] input input-bordered placeholder:text-gray-500 text-md text-gray-950 text-medium"
          required
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-5 w-[90%] placeholder:text-gray-500 text-md text-gray-950 text-medium"
        />
        <input
          type="url"
          name="imgUrl"
          placeholder="Image Url"
          className="mb-5 w-[90%] input input-bordered placeholder:text-gray-500 text-md text-gray-950 text-medium"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="mb-5 w-[90%] input input-bordered placeholder:text-gray-500 text-md text-gray-950 text-medium"
          required
        />
        <FormSubmitButton className="btn btn-primary w-[90%] text-gray-100">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default Page;
