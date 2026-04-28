"use client";

import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4 text-gray-700 dark:text-gray-200">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-center text-red-500 dark:text-red-400">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto w-full pb-5">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center rounded border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <SearchIcon className="m-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          <input
            className="w-full rounded bg-white py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="mb-6 flex items-center justify-between">
        <Header name="Products" />
        <button
          className="flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-gray-100 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="mr-2 h-5 w-5 !text-gray-100" />
          Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 gap-10 justify-between sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="mx-auto w-full max-w-full rounded-md border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex flex-col items-center">
              <Image
                src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                  Math.floor(Math.random() * 3) + 1
                }.png`}
                alt={product.name}
                width={150}
                height={150}
                className="mb-3 h-36 w-36 rounded-2xl"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Stock: {product.stockQuantity}
              </div>
              {product.rating && (
                <div className="mt-2 flex items-center">
                  <Rating rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;