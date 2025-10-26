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

    const res = await fetch(
      `https://furniro-back-production.up.railway.app/api/update-product/${productId}`,
      {
        method: "PUT",
        body: data,
      }
    );

    if (res.ok) {
      alert("Product updated successfully!");
      router.push("/getproducts");
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* الاسم والسعر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* الوصف والكمية */}
        <textarea
          name="des"
          placeholder="Description"
          value={formData.des}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="sale"
            placeholder="Sale"
            value={formData.sale}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* الـ JSON Fields */}
        {["general", "myproduct", "dimensions", "warranty"].map((field) => (
          <div key={field}>
            <label className="block mb-2 font-semibold text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)} (JSON)
            </label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Images */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Images
          </label>
          <div className="flex flex-wrap gap-3">
            {["image", "image1", "image2", "image3", "image4"].map((img) => (
              <input
                key={img}
                type="file"
                name={img}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
