"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductContext } from "../../context/prosuctcontext";
import ProductForm from "../../components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id;
  const { initEditProductPage, productFormUi, products } = useProductContext();

  useEffect(() => {
    if (productId) initEditProductPage(String(productId));
  }, [productId, initEditProductPage, products]);

  if (!productFormUi.editingProduct) {
    return (
      <p className="text-center py-6 text-slate-400">Loading product...</p>
    );
  }

  return (
    <ProductForm
      mode="edit"
      title="Edit Product"
      submitLabel="Update Product"
    />
  );
}
