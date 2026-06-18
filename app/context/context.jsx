"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchInstance } from "./api";

const AppContext = createContext();

const initialState = {
  usersData: [],
  orders: [],
  products: [],
  categories: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  productCreateLoading: false,
  authLoading: true,
  productForm: {
    formData: {
      key: "",
      name: "",
      price: "",
      salePrice: "",
      category: "",
      des: "",
      not: "",
      sale: "",
      quantity: "",
    },
    colorsList: [""],
    sizesList: [""],
    generalFields: [{ key: "", value: "" }],
    myproductFields: [{ key: "", value: "" }],
    dimensionsFields: [{ key: "", value: "" }],
    warrantyFields: [{ key: "", value: "" }],
    customAttributes: [{ key: "", value: "" }],
    images: [],
  },
};

export const ACTIONS = {
  SET_USERS: "SET_USERS",
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  SET_ORDERS: "SET_ORDERS",
  SET_CATEGORIES: "SET_CATEGORIES",
  ADD_CATEGORY: "ADD_CATEGORY",

  SET_USER: "SET_USER",
  SET_AUTH: "SET_AUTH",
  LOGOUT: "LOGOUT",

  SET_LOADING: "SET_LOADING",
  SET_PRODUCT_LOADING: "SET_PRODUCT_LOADING",
  SET_AUTH_LOADING: "SET_AUTH_LOADING",

  SET_PRODUCT_FORM_DATA: "SET_PRODUCT_FORM_DATA",
  SET_ALL_PRODUCT_DATA: "SET_ALL_PRODUCT_DATA",
  SET_PRODUCT_IMAGES: "SET_PRODUCT_IMAGES",
  UPDATE_PRODUCT_FIELD: "UPDATE_PRODUCT_FIELD",
  ADD_PRODUCT_FIELD_ROW: "ADD_PRODUCT_FIELD_ROW",
  REMOVE_PRODUCT_FIELD_ROW: "REMOVE_PRODUCT_FIELD_ROW",
  UPDATE_PRODUCT_STRING_ARRAY: "UPDATE_PRODUCT_STRING_ARRAY",
  ADD_PRODUCT_STRING_ARRAY_ROW: "ADD_PRODUCT_STRING_ARRAY_ROW",
  REMOVE_PRODUCT_STRING_ARRAY_ROW: "REMOVE_PRODUCT_STRING_ARRAY_ROW",
  RESET_PRODUCT_FORM: "RESET_PRODUCT_FORM",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return { ...state, usersData: action.payload };

    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };

    case ACTIONS.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case ACTIONS.SET_ORDERS:
      return { ...state, orders: action.payload };

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case ACTIONS.ADD_CATEGORY: {
      const exists = state.categories.some((c) => c._id === action.payload._id);
      if (exists) return state;
      return { ...state, categories: [...state.categories, action.payload] };
    }

    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };

    case ACTIONS.SET_AUTH:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_PRODUCT_LOADING:
      return { ...state, productCreateLoading: action.payload };

    case ACTIONS.SET_AUTH_LOADING:
      return { ...state, authLoading: action.payload };

    case ACTIONS.SET_PRODUCT_FORM_DATA:
      return {
        ...state,
        productForm: {
          ...state.productForm,
          formData: {
            ...state.productForm.formData,
            [action.payload.name]: action.payload.value,
          },
        },
      };
    case ACTIONS.SET_ALL_PRODUCT_DATA:
      return { ...state, productForm: action.payload };
    case ACTIONS.SET_PRODUCT_IMAGES:
      return {
        ...state,
        productForm: { ...state.productForm, images: action.payload },
      };
    case ACTIONS.UPDATE_PRODUCT_FIELD: {
      const { section, index, field, value } = action.payload;
      const newFields = [...state.productForm[section]];
      newFields[index] = { ...newFields[index], [field]: value };
      return {
        ...state,
        productForm: { ...state.productForm, [section]: newFields },
      };
    }
    case ACTIONS.ADD_PRODUCT_FIELD_ROW: {
      const { section } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: [...state.productForm[section], { key: "", value: "" }],
        },
      };
    }
    case ACTIONS.REMOVE_PRODUCT_FIELD_ROW: {
      const { section, index } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: state.productForm[section].filter((_, i) => i !== index),
        },
      };
    }
    case ACTIONS.UPDATE_PRODUCT_STRING_ARRAY: {
      const { section, index, value } = action.payload;
      const newList = [...state.productForm[section]];
      newList[index] = value;
      return {
        ...state,
        productForm: { ...state.productForm, [section]: newList },
      };
    }
    case ACTIONS.ADD_PRODUCT_STRING_ARRAY_ROW: {
      const { section } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: [...state.productForm[section], ""],
        },
      };
    }
    case ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW: {
      const { section, index } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: state.productForm[section].filter((_, i) => i !== index),
        },
      };
    }
    case ACTIONS.RESET_PRODUCT_FORM:
      return { ...state, productForm: initialState.productForm };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    localStorage.setItem("adminUser", JSON.stringify(userData));

    dispatch({
      type: ACTIONS.SET_AUTH,
      payload: { user: userData },
    });
  };

  const logout = async () => {
    try {
      await fetchInstance("/adminlogout", { method: "POST" });
    } catch (err) {
      console.error("logout error:", err.message);
    }

    localStorage.removeItem("adminUser");
    dispatch({ type: ACTIONS.LOGOUT });
  };

  useEffect(() => {
    const verifySession = async () => {
      const savedUser = localStorage.getItem("adminUser");

      if (!savedUser) {
        dispatch({ type: ACTIONS.SET_AUTH_LOADING, payload: false });
        return;
      }

      try {
        await fetchInstance("/categories");
        const user = JSON.parse(savedUser);
        dispatch({
          type: ACTIONS.SET_AUTH,
          payload: { user },
        });
      } catch {
        localStorage.removeItem("adminUser");
        dispatch({ type: ACTIONS.LOGOUT });
      } finally {
        dispatch({ type: ACTIONS.SET_AUTH_LOADING, payload: false });
      }
    };

    verifySession();
  }, []);

  const fetchUsers = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/users");

      dispatch({
        type: ACTIONS.SET_USERS,
        payload: data || [],
      });
    } catch (err) {
      console.error("fetchUsers error:", err.message);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetchInstance("/categories");
      const list = Array.isArray(res) ? res : res?.categories;
      if (Array.isArray(list)) {
        dispatch({ type: ACTIONS.SET_CATEGORIES, payload: list });
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const createCategory = async (name) => {
    try {
      const res = await fetchInstance("/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (res.success && res.category) {
        dispatch({ type: ACTIONS.ADD_CATEGORY, payload: res.category });
        return { success: true, category: res.category };
      }
      return {
        success: false,
        message: res.message || "Failed to create category",
      };
    } catch (err) {
      console.error("createCategory error:", err);
      return { success: false, message: err.message };
    }
  };

  const fetchProducts = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/products/db");

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: data || [],
      });
    } catch (err) {
      console.error("fetchProducts error:", err.message);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const fetchOrders = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/orders");

      dispatch({
        type: ACTIONS.SET_ORDERS,
        payload: data || [],
      });
    } catch (err) {
      console.error("fetchOrders error:", err.message);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetchInstance(`/users/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_USERS,
        payload: state.usersData.filter((u) => u._id !== id),
      });
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetchInstance(`/products/${id}/delete`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: state.products.filter((p) => p._id !== id),
      });
    } catch (err) {
      console.error(err.message);
      alert("Error deleting product");
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/adminregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return data;
    } catch (err) {
      console.error("register error:", err.message);
      throw err;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const createProduct = async (productData) => {
    try {
      dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: true });

      const data = await fetchInstance("/products", {
        method: "POST",
        body: productData,
      });

      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: data });
      return data;
    } catch (err) {
      console.error("createProduct error:", err.message);
      throw err;
    } finally {
      dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: false });
    }
  };

  const deleteOrder = async (id) => {
    try {
      await fetchInstance(`/orders/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_ORDERS,
        payload: state.orders.filter((o) => o._id !== id),
      });
    } catch (err) {
      console.error(err.message);
      alert("Error deleting order");
    }
  };

  const handleProductForm = (type, payload) => {
    dispatch({ type, payload });
  };

  const buildObject = (fields) => {
    return fields.reduce((obj, item) => {
      const key = item.key && item.key.trim();
      if (key) obj[key] = item.value;
      return obj;
    }, {});
  };

  const NESTED_PRODUCT_KEYS = [
    "general",
    "myproduct",
    "dimensions",
    "warranty",
    "customAttributes",
  ];

  const buildProductPayload = () => {
    const form = state.productForm;
    const payload = { name: form.formData.name.trim() };

    if (form.formData.key?.trim()) payload.key = form.formData.key.trim();

    const categoryValue = form.formData.category?.trim();
    if (categoryValue) payload.category = categoryValue;

    if (form.formData.price !== "") payload.price = Number(form.formData.price);
    if (form.formData.salePrice !== "")
      payload.salePrice = Number(form.formData.salePrice);
    if (form.formData.sale !== "") payload.sale = Number(form.formData.sale);
    if (form.formData.quantity !== "")
      payload.quantity = Number(form.formData.quantity);
    if (form.formData.des?.trim()) payload.des = form.formData.des.trim();
    if (form.formData.not?.trim()) payload.not = form.formData.not.trim();

    const colors = form.colorsList
      .filter((color) => typeof color === "string" && color.trim() !== "")
      .map((color) => color.trim());
    if (colors.length) payload.colors = colors;

    const sizes = form.sizesList
      .filter((size) => typeof size === "string" && size.trim() !== "")
      .map((size) => size.trim());
    if (sizes.length) payload.sizes = sizes;

    const general = buildObject(form.generalFields);
    if (Object.keys(general).length) payload.general = general;
    const myproduct = buildObject(form.myproductFields);
    if (Object.keys(myproduct).length) payload.myproduct = myproduct;
    const dimensions = buildObject(form.dimensionsFields);
    if (Object.keys(dimensions).length) payload.dimensions = dimensions;
    const warranty = buildObject(form.warrantyFields);
    if (Object.keys(warranty).length) payload.warranty = warranty;
    const customAttrs = buildObject(form.customAttributes);
    if (Object.keys(customAttrs).length) payload.customAttributes = customAttrs;

    return payload;
  };

  const buildProductScalarsFormData = () => {
    const payload = buildProductPayload();
    const body = new FormData();

    body.append("name", payload.name);
    if (payload.key) body.append("key", payload.key);
    if (payload.category) body.append("category", payload.category);
    if (payload.price !== undefined)
      body.append("price", String(payload.price));
    if (payload.salePrice !== undefined)
      body.append("salePrice", String(payload.salePrice));
    if (payload.sale !== undefined) body.append("sale", String(payload.sale));
    if (payload.quantity !== undefined)
      body.append("quantity", String(payload.quantity));
    if (payload.des) body.append("des", payload.des);
    if (payload.not) body.append("not", payload.not);

    payload.colors?.forEach((color) => body.append("colors", color));
    payload.sizes?.forEach((size) => body.append("sizes", size));
    state.productForm.images.forEach((file) => body.append("images", file));

    return body;
  };

  const hasNestedFields = (payload) =>
    NESTED_PRODUCT_KEYS.some(
      (key) => payload[key] && Object.keys(payload[key]).length > 0,
    );

  const pickNestedFields = (payload) => {
    const nested = {};
    NESTED_PRODUCT_KEYS.forEach((key) => {
      if (payload[key]) nested[key] = payload[key];
    });
    return nested;
  };

  const submitProduct = async ({ endpoint, method = "POST" }) => {
    const payload = buildProductPayload();
    const hasImages = state.productForm.images.length > 0;

    if (!hasImages) {
      return fetchInstance(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
    }

    const scalarBody = buildProductScalarsFormData();

    if (method === "POST") {
      const result = await fetchInstance(endpoint, {
        method: "POST",
        body: scalarBody,
      });
      const productId = result.product?._id;

      if (productId && hasNestedFields(payload)) {
        await fetchInstance(`/update-product/${productId}`, {
          method: "PUT",
          body: JSON.stringify({
            name: payload.name,
            price: payload.price,
            ...pickNestedFields(payload),
          }),
        });
      }

      return result;
    }

    await fetchInstance(endpoint, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return fetchInstance(endpoint, { method: "PUT", body: scalarBody });
  };

  const isValidObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

  const buildProductFormData = () => buildProductScalarsFormData();

  useEffect(() => {
    if (state.authLoading || !state.isAuthenticated) return;
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchCategories();
  }, [state.authLoading, state.isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        ...state,

        login,
        logout,
        register,
        createProduct,

        fetchUsers,
        fetchOrders,
        fetchProducts,
        fetchCategories,

        handleDeleteUser,
        deleteProduct,
        deleteOrder,
        createCategory,

        handleProductForm,
        buildProductFormData,
        submitProduct,
        isValidObjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* =========================
   HOOK
========================= */
export function useAppContext() {
  return useContext(AppContext);
}
