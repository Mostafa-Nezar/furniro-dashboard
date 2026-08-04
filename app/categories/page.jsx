"use client";
import { useState } from "react";
import { useProductContext } from "../context/prosuctcontext";

export default function CategoriesPage() {
  const { categories, createCategory } = useProductContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    try {
      const res = await createCategory(newCategoryName.trim(), selectedImage);
      if (res.success) {
        setNewCategoryName("");
        setSelectedImage(null);
        setImagePreview("");
        setShowAddForm(false);
        alert("Category added successfully!");
      } else {
        alert(res.message || "Failed to add category");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);

    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-heading">Categories</h1>
          <p className="text-sm text-muted mt-2">Manage your product categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span>
          <span>Add Category</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 rounded-3xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary h-[50px] px-8"
              >
                {loading ? "Adding..." : "Save"}
              </button>
            </div>

            <div className="max-w-md">
              <label className="block text-sm font-medium text-slate-400 mb-2">Category Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 file:mr-4 file:rounded-full file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white"
              />
              {selectedImage && (
                <p className="mt-2 text-sm text-slate-400">Selected: {selectedImage.name}</p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="mt-3 h-24 w-24 rounded-xl object-cover border border-slate-700"
                />
              )}
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories?.map((category) => {
          const categoryImage = category.image || category.img || category.imageUrl;

          return (
            <div
              key={category._id}
              className="group p-5 rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={category.name}
                    className="h-12 w-12 rounded-full object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-xl">
                    {category.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-violet-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    ID: {category._id}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {(!categories || categories.length === 0) && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}
