"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductContext, ACTIONS } from "../context/prosuctcontext";
import ImageEditorPanel from "./ImageEditorPanel";
import Popup from "./Popup";

const TECHNICAL_SECTIONS = [
  { title: "General", fieldKey: "generalFields" },
  { title: "My Product", fieldKey: "myproductFields" },
  { title: "Dimensions", fieldKey: "dimensionsFields" },
  { title: "Warranty", fieldKey: "warrantyFields" },
  { title: "Custom Attributes", fieldKey: "customAttributes" },
];

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition";

const smallInputClass =
  "rounded-xl w-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition";

export default function ProductForm({
  mode = "add",
  title,
  submitLabel,
}) {
  const {
    productForm,
    categories,
    productFormUi,
    handleProductForm,
    setFormField,
    setSelectedImages,
    setNewCategoryName,
    handleAddCategory,
    cancelCategoryInput,
    submitAddProduct,
    submitUpdateProduct,
    dismissProductPopup,
  } = useProductContext();

  const router = useRouter();
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const {
    loading,
    categoryLoading,
    showCategoryInput,
    newCategoryName,
    popup,
    successRedirect,
  } = productFormUi;

  const formData = productForm.formData;
  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) submitUpdateProduct();
    else submitAddProduct();
  };

  const handlePopupClose = () => {
    if (popup.type === "success" && successRedirect) {
      dismissProductPopup();
      router.push(successRedirect);
      return;
    }
    if (popup.type === "success" && isEdit) {
      dismissProductPopup();
      router.push("/getproducts");
      return;
    }
    dismissProductPopup();
  };

  const clearCategoryImageSelection = () => {
    setCategoryImageFile(null);
    setCategoryImagePreview("");
  };

  const handleCategoryImageSelect = (e) => {
    const file = e.target.files?.[0] || null;
    setCategoryImageFile(file);

    if (!file) {
      setCategoryImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setCategoryImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCategoryAction = async () => {
    if (!showCategoryInput) {
      await handleAddCategory();
      return;
    }

    await handleAddCategory(categoryImageFile);
    clearCategoryImageSelection();
  };

  return (
    <>
      <Popup
        open={popup.open}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={handlePopupClose}
      />

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-heading">{title}</h2>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="card p-5 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
                Basic Information
              </h3>

              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Product Name"
                onChange={(e) => setFormField(e.target.name, e.target.value)}
                required
                className={inputClass}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  placeholder="Product Key"
                  onChange={(e) => setFormField(e.target.name, e.target.value)}
                  className={inputClass}
                />

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormField(e.target.name, e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Category (Optional)</option>
                      {categories.map((c) => (
                        <option key={String(c._id)} value={String(c._id)}>
                          {String(c.name)}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleCategoryAction}
                      disabled={categoryLoading}
                      className="whitespace-nowrap rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition disabled:opacity-50"
                    >
                      {categoryLoading ? "..." : showCategoryInput ? "Add" : "+ New"}
                    </button>
                  </div>

                  {showCategoryInput && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleCategoryAction();
                          }
                          if (e.key === "Escape") {
                            cancelCategoryInput();
                            clearCategoryImageSelection();
                          }
                        }}
                        placeholder="New category name"
                        autoFocus
                        className={inputClass}
                      />

                      <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                        <label className="mb-2 block text-sm font-medium text-slate-400">
                          Category Image (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCategoryImageSelect}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 file:mr-3 file:rounded-full file:border-0 file:bg-violet-600 file:px-3 file:py-1.5 file:text-white"
                        />
                        {categoryImagePreview && (
                          <img
                            src={categoryImagePreview}
                            alt="Category preview"
                            className="mt-3 h-16 w-16 rounded-xl border border-slate-700 object-cover"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="Product Price"
                  onChange={(e) => setFormField(e.target.name, e.target.value)}
                  required
                  className={inputClass}
                />
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  placeholder="Sale Price"
                  onChange={(e) => setFormField(e.target.name, e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="sale"
                  value={formData.sale}
                  placeholder="Discount % (Sale)"
                  onChange={(e) => setFormField(e.target.name, e.target.value)}
                  className={inputClass}
                />
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  placeholder="Stock Quantity"
                  onChange={(e) => setFormField(e.target.name, e.target.value)}
                  className={inputClass}
                />
              </div>

              <textarea
                name="des"
                value={formData.des}
                placeholder="Product Description..."
                onChange={(e) => setFormField(e.target.name, e.target.value)}
                rows={4}
                className={inputClass}
              />

              <textarea
                name="not"
                value={formData.not}
                placeholder="Extra Notes..."
                onChange={(e) => setFormField(e.target.name, e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>

            <div className="card p-5 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
                Media Files
              </h3>
              <div>
                <ImageEditorPanel
                  onChange={setSelectedImages}
                  label="Select image(s) and edit dimensions / crop / rotation"
                />
                <div className="text-xs text-slate-500 mt-2">
                  {isEdit
                    ? "You can select multiple images at once. New images will replace existing ones on the server."
                    : "You can select multiple images at once. First image will be used as thumbnail."}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="card p-5 space-y-5 rounded-3xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
                Variations
              </h3>

              {[
                { section: "colorsList", label: "Colors", placeholder: "e.g. Red, #ff0000" },
                { section: "sizesList", label: "Sizes", placeholder: "e.g. XL, 42" },
              ].map(({ section, label, placeholder }) => {

                return (
                  <div key={section}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-slate-300">{label}</h4>
                      <button
                        type="button"
                        onClick={() =>
                          handleProductForm(ACTIONS.ADD_PRODUCT_STRING_ARRAY_ROW, {
                            section,
                          })
                        }
                        className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 px-2 py-1 rounded-lg"
                      >
                        + Add {label.slice(0, -1)}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {productForm[section].map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={placeholder}
                            value={item}
                            onChange={(e) =>
                              handleProductForm(ACTIONS.UPDATE_PRODUCT_STRING_ARRAY, {
                                section,
                                index: idx,
                                value: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleProductForm(
                                ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW,
                                { section, index: idx },
                              )
                            }
                            className="px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card p-5 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
                Technical Details
              </h3>

              {TECHNICAL_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-300">
                      {section.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        handleProductForm(ACTIONS.ADD_PRODUCT_FIELD_ROW, {
                          section: section.fieldKey,
                        })
                      }
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
                          onChange={(e) =>
                            handleProductForm(ACTIONS.UPDATE_PRODUCT_FIELD, {
                              section: section.fieldKey,
                              index: idx,
                              field: "key",
                              value: e.target.value,
                            })
                          }
                          className="rounded-xl sm:w-1/3 border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                        />
                        <div className="flex gap-2 sm:w-2/3">
                          <input
                            type="text"
                            placeholder="Value"
                            value={item.value}
                            onChange={(e) =>
                              handleProductForm(ACTIONS.UPDATE_PRODUCT_FIELD, {
                                section: section.fieldKey,
                                index: idx,
                                field: "value",
                                value: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleProductForm(ACTIONS.REMOVE_PRODUCT_FIELD_ROW, {
                                section: section.fieldKey,
                                index: idx,
                              })
                            }
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
    </>
  );
}
