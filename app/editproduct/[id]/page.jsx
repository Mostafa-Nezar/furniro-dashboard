"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "../../context/context";
import Popup from "../../components/Popup";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const { products } = useAppContext();

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    price: "",
    des: "",
    quantity: "",
    sale: "",
    image: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [generalFields, setGeneralFields] = useState([{ key: "", value: "" }]);
  const [myproductFields, setMyproductFields] = useState([{ key: "", value: "" }]);
  const [dimensionsFields, setDimensionsFields] = useState([{ key: "", value: "" }]);
  const [warrantyFields, setWarrantyFields] = useState([{ key: "", value: "" }]);
  const [customAttributes, setCustomAttributes] = useState([{ key: "", value: "" }]);
  const [popup, setPopup] = useState({ open: false, title: "", message: "", type: "info" });

  const handleClosePopup = () => {
    if (popup.type === "success") {
      router.push("/getproducts");
    } else {
      setPopup({ ...popup, open: false });
    }
  };

  const objectToFields = (obj) => {
    if (!obj || typeof obj !== "object") return [{ key: "", value: "" }];
    const entries = Object.entries(obj);
    return entries.length > 0
      ? entries.map(([key, value]) => ({ key, value: String(value) }))
      : [{ key: "", value: "" }];
  };

  useEffect(() => {
    const prod = products.find((p) => p.id.toString() === productId.toString());
    if (prod) {
      setProduct(prod);
      setFormData({
        key: prod.key || "",
        name: prod.name || "",
        price: prod.price || "",
        des: prod.des || "",
        quantity: prod.quantity || "",
        sale: prod.sale || "",
        image: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });
      setGeneralFields(objectToFields(prod.general));
      setMyproductFields(objectToFields(prod.myproduct));
      setDimensionsFields(objectToFields(prod.dimensions));
      setWarrantyFields(objectToFields(prod.warranty));
      setCustomAttributes(objectToFields(prod.customAttributes));
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
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("general", JSON.stringify(buildObject(generalFields)));
    data.append("myproduct", JSON.stringify(buildObject(myproductFields)));
    data.append("dimensions", JSON.stringify(buildObject(dimensionsFields)));
    data.append("warranty", JSON.stringify(buildObject(warrantyFields)));
    data.append("customAttributes", JSON.stringify(buildObject(customAttributes)));

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

    const res = await fetch(
      `https://furniro-back-production.up.railway.app/api/update-product/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: data,
      }
    );

    if (res.ok) {
      setPopup({ open: true, title: "Success", message: "Product updated successfully!", type: "success" });
    } else {
      const err = await res.json();
      setPopup({ open: true, title: "Error", message: err.message || "Failed to update product.", type: "error" });
    }
  };

  if (!product) return <p className="text-center py-6 text-muted">Loading...</p>;

  return (
    <>
      <Popup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={handleClosePopup}
      />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 card">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-heading">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* الاسم والسعر */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="key"
              placeholder="Product Key"
              value={formData.key}
              onChange={handleChange}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />
          </div>

          {/* الوصف والكمية */}
          <textarea
            name="des"
            placeholder="Description"
            value={formData.des}
            onChange={handleChange}
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition w-full h-24"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition text-sm sm:text-base"
            />
            <input
              type="number"
              name="sale"
              placeholder="Sale"
              value={formData.sale}
              onChange={handleChange}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition text-sm sm:text-base"
            />
          </div>

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

          {/* Images */}
          <div>
            <label className="block mb-2 text-sm sm:text-base font-semibold text-heading">
              Images
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {["image", "image1", "image2", "image3", "image4"].map((img) => (
                <input
                  key={img}
                  type="file"
                  name={img}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-100 file:bg-slate-800 file:border file:border-slate-700 file:text-slate-200 file:px-3 file:py-1 file:rounded-lg"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary justify-center"
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}
