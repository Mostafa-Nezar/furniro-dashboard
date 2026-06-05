"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    price: "",
    des: "",
    not: "",
    sale: "",
    quantity: 0,
  });

  const [generalFields, setGeneralFields] = useState([{ key: "", value: "" }]);
  const [myproductFields, setMyproductFields] = useState([{ key: "", value: "" }]);
  const [dimensionsFields, setDimensionsFields] = useState([{ key: "", value: "" }]);
  const [warrantyFields, setWarrantyFields] = useState([{ key: "", value: "" }]);
  const [customAttributes, setCustomAttributes] = useState([{ key: "", value: "" }]);

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

  const buildObject = (fields) => {
    return fields.reduce((obj, item) => {
      const key = item.key && item.key.trim();
      if (key) obj[key] = item.value;
      return obj;
    }, {});
  };

  const updateField = (setFields, index, field, value) => {
    setFields((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addFieldRow = (setFields) => {
    setFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeFieldRow = (setFields, index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
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

      data.append("general", JSON.stringify(buildObject(generalFields)));
      data.append("myproduct", JSON.stringify(buildObject(myproductFields)));
      data.append("dimensions", JSON.stringify(buildObject(dimensionsFields)));
      data.append("warranty", JSON.stringify(buildObject(warrantyFields)));
      data.append("customAttributes", JSON.stringify(buildObject(customAttributes)));

      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

      const res = await fetch("https://furniro-back-production.up.railway.app/api/add-product", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
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
      className="flex flex-col gap-4 max-w-2xl mx-auto p-4 sm:p-6 card"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-heading">Add Product</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="key"
          value={formData.key}
          placeholder="Product Key"
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
        />
      </div>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
      />

      <input
        type="number"
        name="price"
        placeholder="Product Price"
        onChange={handleChange}
        required
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
      />

      <textarea
        name="des"
        placeholder="Product Description..."
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
      />

      <textarea
        name="not"
        placeholder="Extra Notes..."
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
      />

      <div className="space-y-4">
        {[
          { title: "General", fields: generalFields, setFields: setGeneralFields },
          { title: "My Product", fields: myproductFields, setFields: setMyproductFields },
          { title: "Dimensions", fields: dimensionsFields, setFields: setDimensionsFields },
          { title: "Warranty", fields: warrantyFields, setFields: setWarrantyFields },
        ].map((section) => (
          <div key={section.title} className="rounded-3xl border border-slate-700 bg-slate-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-100">{section.title} (optional)</h3>
              <button
                type="button"
                onClick={() => addFieldRow(section.setFields)}
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                + Add field
              </button>
            </div>
            {section.fields.map((item, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Field name"
                  value={item.key}
                  onChange={(e) => updateField(section.setFields, idx, "key", e.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => updateField(section.setFields, idx, "value", e.target.value)}
                    className="rounded-2xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeFieldRow(section.setFields, idx)}
                    className="px-3 rounded-2xl bg-red-950 text-red-400 hover:bg-red-900"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-900 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-100">Custom Attributes</h3>
          <button
            type="button"
            onClick={() => addFieldRow(setCustomAttributes)}
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            + Add attribute
          </button>
        </div>
        {customAttributes.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Attribute key"
              value={item.key}
              onChange={(e) => updateField(setCustomAttributes, idx, "key", e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Attribute value"
                value={item.value}
                onChange={(e) => updateField(setCustomAttributes, idx, "value", e.target.value)}
                className="rounded-2xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
              <button
                type="button"
                onClick={() => removeFieldRow(setCustomAttributes, idx)}
                className="px-3 rounded-2xl bg-red-950 text-red-400 hover:bg-red-900"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          name="sale"
          placeholder="Sale %"
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
        />
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body">
          <input type="file" name="image" onChange={handleImageChange} className="text-sm text-slate-200" />
          <input type="file" name="image1" onChange={handleImageChange} className="text-sm text-slate-200" />
          <input type="file" name="image2" onChange={handleImageChange} className="text-sm text-slate-200" />
          <input type="file" name="image3" onChange={handleImageChange} className="text-sm text-slate-200" />
          <input type="file" name="image4" onChange={handleImageChange} className="text-sm text-slate-200" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
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
