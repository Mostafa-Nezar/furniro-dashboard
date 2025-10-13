"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "../../context/context";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const { products } = useAppContext(); 

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    quantity: "",
    sale: "",
    general: "{}",
    myproduct: "{}",
    dimensions: "{}",
    warranty: "{}",
    image: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  useEffect(() => {
    const prod = products.find((p) => p.id.toString() === productId.toString());
    if (prod) {
      setProduct(prod);
      setFormData({
        ...formData,
        name: prod.name || "",
        price: prod.price || "",
        des: prod.des || "",
        quantity: prod.quantity || "",
        sale: prod.sale || "",
        general: JSON.stringify(prod.general || {}),
        myproduct: JSON.stringify(prod.myproduct || {}),
        dimensions: JSON.stringify(prod.dimensions || {}),
        warranty: JSON.stringify(prod.warranty || {}),
      });
    }
  }, [products, productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const res = await fetch(`https://furniro-back-production.up.railway.app/api/update-product/${productId}`, {
      method: "PUT",
      body: data,
    });

    if (res.ok) {
      alert("Product updated successfully!");
      router.push("/admin/products");
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="des"
          placeholder="Description"
          value={formData.des}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="sale"
          placeholder="Sale"
          value={formData.sale}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label>General (JSON)</label>
        <textarea
          name="general"
          value={formData.general}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label>MyProduct (JSON)</label>
        <textarea
          name="myproduct"
          value={formData.myproduct}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label>Dimensions (JSON)</label>
        <textarea
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label>Warranty (JSON)</label>
        <textarea
          name="warranty"
          value={formData.warranty}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label>Images</label>
        <input type="file" name="image" onChange={handleChange} />
        <input type="file" name="image1" onChange={handleChange} />
        <input type="file" name="image2" onChange={handleChange} />
        <input type="file" name="image3" onChange={handleChange} />
        <input type="file" name="image4" onChange={handleChange} />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
