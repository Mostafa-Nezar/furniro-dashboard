"use client";

import { useState, useEffect } from "react";
import { useAppContext, ACTIONS } from "../context/context";

export default function AddProductForm() {
  const {
    productForm,
    categories,
    handleProductForm,
    submitProduct,
    isValidObjectId,
    createCategory,
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    handleProductForm(ACTIONS.RESET_PRODUCT_FORM);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleProductForm(ACTIONS.SET_PRODUCT_FORM_DATA, { name, value });
  };

  const handleImageChange = (e) => {
    handleProductForm(ACTIONS.SET_PRODUCT_IMAGES, Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryValue = productForm.formData.category?.trim();
      if (categoryValue && !isValidObjectId(categoryValue) && categoryValue.length === 24) {
        if (!/^[0-9a-fA-F]{24}$/.test(categoryValue)) {
           alert("Category must be a valid ID.");
           setLoading(false);
           return;
        }
      }

      const result = await submitProduct({
        endpoint: "/add-product",
        method: "POST",
      });

      alert(result.msg || "Product added successfully!");
      handleProductForm(ACTIONS.RESET_PRODUCT_FORM);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!showCategoryInput) {
      setShowCategoryInput(true);
      return;
    }

    if (!newCategoryName.trim()) {
      setShowCategoryInput(false);
      return;
    }

    setCategoryLoading(true);
    try {
      const res = await createCategory(newCategoryName.trim());
      if (res.success) {
        handleProductForm(ACTIONS.SET_PRODUCT_FORM_DATA, {
          name: "category",
          value: res.category._id,
        });
        setNewCategoryName("");
        setShowCategoryInput(false);
        alert("Category added successfully!");
      } else {
        alert(res.message || "Failed to add category");
      }
    } finally {
      setCategoryLoading(false);
    }
  };

  const formData = productForm.formData;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-heading">Add New Product</h2>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Basic Info & Media */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="card p-5 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">Basic Information</h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Product Name"
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="key"
                value={formData.key}
                placeholder="Product Key"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  >
                    <option value="">Select Category (Optional)</option>
                    {(categories ?? []).map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={categoryLoading}
                    className="whitespace-nowrap rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition disabled:opacity-50"
                  >
                    {categoryLoading ? "..." : showCategoryInput ? "Add" : "+ New"}
                  </button>
                </div>
                {showCategoryInput && (
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCategory();
                      }
                      if (e.key === "Escape") {
                        setShowCategoryInput(false);
                        setNewCategoryName("");
                      }
                    }}
                    placeholder="New category name"
                    autoFocus
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Product Price"
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                placeholder="Sale Price"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="sale"
                value={formData.sale}
                placeholder="Discount % (Sale)"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                placeholder="Stock Quantity"
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
              />
            </div>

            <textarea
              name="des"
              value={formData.des}
              placeholder="Product Description..."
              onChange={handleChange}
              rows="4"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />

            <textarea
              name="not"
              value={formData.not}
              placeholder="Extra Notes..."
              onChange={handleChange}
              rows="2"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
            />
          </div>

          <div className="card p-5 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">Media Files</h3>
            <div>
              <div className="grid grid-cols-1 gap-2 text-body">
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="w-full text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-500 mt-2">
                You can select multiple images at once. First image will be used as thumbnail.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Variations & Attributes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="card p-5 space-y-5 rounded-3xl border border-slate-800 bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">Variations</h3>

            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-300">Colors</h4>
                <button
                  type="button"
                  onClick={() => handleProductForm(ACTIONS.ADD_PRODUCT_STRING_ARRAY_ROW, { section: "colorsList" })}
                  className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 px-2 py-1 rounded-lg"
                >
                  + Add Color
                </button>
              </div>
              <div className="space-y-2">
                {productForm.colorsList.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Red, #ff0000"
                      value={item}
                      onChange={(e) => handleProductForm(ACTIONS.UPDATE_PRODUCT_STRING_ARRAY, { section: "colorsList", index: idx, value: e.target.value })}
                      className="rounded-xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleProductForm(ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW, { section: "colorsList", index: idx })}
                      className="px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-slate-300">Sizes</h4>
                <button
                  type="button"
                  onClick={() => handleProductForm(ACTIONS.ADD_PRODUCT_STRING_ARRAY_ROW, { section: "sizesList" })}
                  className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 px-2 py-1 rounded-lg"
                >
                  + Add Size
                </button>
              </div>
              <div className="space-y-2">
                {productForm.sizesList.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. XL, 42"
                      value={item}
                      onChange={(e) => handleProductForm(ACTIONS.UPDATE_PRODUCT_STRING_ARRAY, { section: "sizesList", index: idx, value: e.target.value })}
                      className="rounded-xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleProductForm(ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW, { section: "sizesList", index: idx })}
                      className="px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-5 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">Technical Details</h3>

            {[
              { title: "General", fieldKey: "generalFields" },
              { title: "My Product", fieldKey: "myproductFields" },
              { title: "Dimensions", fieldKey: "dimensionsFields" },
              { title: "Warranty", fieldKey: "warrantyFields" },
              { title: "Custom Attributes", fieldKey: "customAttributes" },
            ].map((section) => (
              <div key={section.title} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-slate-300">{section.title}</h4>
                  <button
                    type="button"
                    onClick={() => handleProductForm(ACTIONS.ADD_PRODUCT_FIELD_ROW, { section: section.fieldKey })}
                    className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 px-2 py-1 rounded-lg"
                  >
                    + Add Field
                  </button>
                </div>
                <div className="space-y-2">
                  {productForm[section.fieldKey].map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={item.key}
                        onChange={(e) => handleProductForm(ACTIONS.UPDATE_PRODUCT_FIELD, { section: section.fieldKey, index: idx, field: "key", value: e.target.value })}
                        className="rounded-xl sm:w-1/3 border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                      />
                      <div className="flex gap-2 sm:w-2/3">
                        <input
                          type="text"
                          placeholder="Value"
                          value={item.value}
                          onChange={(e) => handleProductForm(ACTIONS.UPDATE_PRODUCT_FIELD, { section: section.fieldKey, index: idx, field: "value", value: e.target.value })}
                          className="rounded-xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => handleProductForm(ACTIONS.REMOVE_PRODUCT_FIELD_ROW, { section: section.fieldKey, index: idx })}
                          className="px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
