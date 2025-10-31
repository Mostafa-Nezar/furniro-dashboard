"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    id: "",
    key: "",
    name: "",
    price: "",
    des: "",
    not: "",
    general: JSON.stringify({}),
    myproduct: JSON.stringify({}),
    dimensions: JSON.stringify({}),
    warranty: JSON.stringify({}),
    sale: "",
    averagerate: "",
    ratecount: "",
    quantity: 0,
  });

  const [images, setImages] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (let key of ["image", "image1", "image2", "image3", "image4"]) {
        if (images[key]) {
          data.append(key, images[key]);
        }
      }

      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const res = await fetch("https://furniro-back-production.up.railway.app/api/add-product", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        alert("Product added successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 max-w-2xl mx-auto p-6 card"
>
  <h2 className="text-2xl font-bold mb-4 text-heading">Add Product</h2>

  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      name="id"
      placeholder="Product ID"
      onChange={handleChange}
      required
      className="w-full rounded p-2 bg-surface border focus:ring-2 outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <input
      type="text"
      name="key"
      placeholder="Product Key"
      onChange={handleChange}
      className="w-full rounded p-2 bg-surface border focus:ring-2 outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
  </div>

  <input
    type="text"
    name="name"
    placeholder="Product Name"
    onChange={handleChange}
    required
    className="w-full rounded p-2 bg-surface border focus:ring-2 outline-none"
    style={{borderColor:'var(--color-border)'}}
  />

  <input
    type="number"
    name="price"
    placeholder="Product Price"
    onChange={handleChange}
    required
    className="w-full rounded p-2 bg-surface border outline-none"
    style={{borderColor:'var(--color-border)'}}
  />

  <textarea
    name="des"
    placeholder="Product Description..."
    onChange={handleChange}
    className="w-full rounded p-2 bg-surface border outline-none"
    style={{borderColor:'var(--color-border)'}}
  />

  <textarea
    name="not"
    placeholder="Extra Notes..."
    onChange={handleChange}
    className="w-full rounded p-2 bg-surface border outline-none"
    style={{borderColor:'var(--color-border)'}}
  />

  <div className="grid grid-cols-2 gap-4">
    <textarea
      name="general"
      placeholder="General JSON"
      onChange={handleChange}
      className="w-full rounded p-2 h-24 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <textarea
      name="myproduct"
      placeholder="MyProduct JSON"
      onChange={handleChange}
      className="w-full rounded p-2 h-24 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <textarea
      name="dimensions"
      placeholder="Dimensions JSON"
      onChange={handleChange}
      className="w-full rounded p-2 h-24 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <textarea
      name="warranty"
      placeholder="Warranty JSON"
      onChange={handleChange}
      className="w-full rounded p-2 h-24 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <input
      type="number"
      name="sale"
      placeholder="Sale %"
      onChange={handleChange}
      className="w-full rounded p-2 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <input
      type="number"
      name="averagerate"
      placeholder="Average Rate"
      onChange={handleChange}
      className="w-full rounded p-2 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <input
      type="number"
      name="ratecount"
      placeholder="Rate Count"
      onChange={handleChange}
      className="w-full rounded p-2 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
    <input
      type="number"
      name="quantity"
      placeholder="Quantity"
      onChange={handleChange}
      className="w-full rounded p-2 bg-surface border outline-none"
      style={{borderColor:'var(--color-border)'}}
    />
  </div>

  <div>
    <div className="grid grid-cols-2 gap-2 text-body">
      <input type="file" name="image" onChange={handleImageChange} />
      <input type="file" name="image1" onChange={handleImageChange} />
      <input type="file" name="image2" onChange={handleImageChange} />
      <input type="file" name="image3" onChange={handleImageChange} />
      <input type="file" name="image4" onChange={handleImageChange} />
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" width="24" height="24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
    </svg>
  </div>

  <button
    type="submit"
    className="btn btn-primary mt-4"
  >
    Add Product
  </button>
</form>
  );
}
