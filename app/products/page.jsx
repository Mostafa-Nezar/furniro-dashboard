"use client";

import { useEffect } from "react";
import { useProductContext } from "../context/prosuctcontext";
import ProductForm from "../components/ProductForm";

export default function AddProductPage() {
  const { initAddProductPage } = useProductContext();

  useEffect(() => {
    initAddProductPage();
  }, [initAddProductPage]);

  return (
    <ProductForm
      mode="add"
      title="Add New Product"
      submitLabel="Save Product"
    />
  );
}
