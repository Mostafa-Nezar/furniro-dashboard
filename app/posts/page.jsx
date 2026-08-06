"use client";
import { useState } from "react";
import { useAppContext } from "../context/context";

export default function PostsPage() {
  const { posts, createPost } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const categoryOptions = ["Furniture", "Design", "Decor", "Interior"];

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    content: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      if (formData.id) data.append("id", formData.id);
      if (formData.title) data.append("title", formData.title);
      if (formData.category) data.append("category", formData.category);
      if (formData.content) data.append("content", formData.content);
      if (formData.date) data.append("date", formData.date);
      if (imageFile) data.append("image", imageFile);

      const res = await createPost(data);
      if (res && res.post) {
        alert("Post added successfully!");
        setShowAddForm(false);
        setFormData({ id: "", title: "", category: "", content: ""});
        setImageFile(null);
      } else {
        alert(res?.message || "Failed to add post");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-heading">Posts</h1>
          <p className="text-sm text-muted mt-2">Manage your blog posts</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span>
          <span>Add Post</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 rounded-3xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">Add New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Post Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Post ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Unique ID (e.g., post-1)"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Post content..."
                rows={4}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary px-8 py-3"
              >
                {loading ? "Saving..." : "Save Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="group rounded-3xl overflow-hidden border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 flex flex-col hover:-translate-y-1"
          >
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold text-xl">
                  No Image
                </div>
              )}
              <div className="absolute top-3 left-3 px-3 py-1 bg-violet-600/90 backdrop-blur-sm rounded-full">
                <span className="text-xs font-bold text-white">{post.category}</span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                {post.content}
              </p>
              <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.id && <span className="font-mono">ID: {post.id}</span>}
              </div>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}
