"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchInstance } from "./api";
import { useAuthContext } from "./authcontext";

const ProductContext = createContext<{
  products: any[];
  categories: any[];
  productCreateLoading: boolean;
  productForm: any;
  createProduct: (productData: FormData) => Promise<any>;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createCategory: (name: string) => Promise<{ success: boolean; category?: any; message?: string }>;
  handleProductForm: (type: string, payload: any) => void;
  buildProductFormData: () => FormData;
  submitProduct: ({ endpoint, method, imagesOverride }: { endpoint: string; method?: string; imagesOverride?: File[] }) => Promise<any>;
  isValidObjectId: (value: string) => boolean;
} | null>(null);

const initialState = {
  products: [],
  categories: [],
  productCreateLoading: false,
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
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  SET_CATEGORIES: "SET_CATEGORIES",
  ADD_CATEGORY: "ADD_CATEGORY",
  SET_PRODUCT_LOADING: "SET_PRODUCT_LOADING",
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

function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };

    case ACTIONS.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case ACTIONS.ADD_CATEGORY: {
      const exists = state.categories.some((c: any) => c._id === action.payload._id);
      if (exists) return state;
      return { ...state, categories: [...state.categories, action.payload] };
    }

    case ACTIONS.SET_PRODUCT_LOADING:
      return { ...state, productCreateLoading: action.payload };

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
      const newFields = [...(state.productForm[section as keyof typeof state.productForm] as any[])];
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
          [section]: [
            ...(state.productForm[section as keyof typeof state.productForm] as any[]),
            { key: "", value: "" },
          ],
        },
      };
    }
    case ACTIONS.REMOVE_PRODUCT_FIELD_ROW: {
      const { section, index } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: (state.productForm[section as keyof typeof state.productForm] as any[]).filter(
            (_: any, i: number) => i !== index,
          ),
        },
      };
    }
    case ACTIONS.UPDATE_PRODUCT_STRING_ARRAY: {
      const { section, index, value } = action.payload;
      const newList = [...(state.productForm[section as keyof typeof state.productForm] as any[])];
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
          [section]: [
            ...(state.productForm[section as keyof typeof state.productForm] as any[]),
            "",
          ],
        },
      };
    }
    case ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW: {
      const { section, index } = action.payload;
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: (state.productForm[section as keyof typeof state.productForm] as any[]).filter(
            (_: any, i: number) => i !== index,
          ),
        },
      };
    }
    case ACTIONS.RESET_PRODUCT_FORM:
      return { ...state, productForm: initialState.productForm };

    default:
      return state;
  }
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, authLoading } = useAuthContext();

  const fetchCategories = async () => {
    try {
      const res = await fetchInstance("/products/db/categories");
      const list = Array.isArray(res) ? res : res?.categories;
      if (Array.isArray(list)) {
        dispatch({ type: ACTIONS.SET_CATEGORIES, payload: list });
      }
    } catch (err: unknown) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const createCategory = async (name: string, imageFile?: File | null) => {
    try {
      let res;

      if (imageFile) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", imageFile);
        res = await fetchInstance("/add-category", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetchInstance("/add-category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
      }

      if (res.success && res.category) {
        dispatch({ type: ACTIONS.ADD_CATEGORY, payload: res.category });
        return { success: true, category: res.category };
      }
      return {
        success: false,
        message: res.message || "Failed to create category",
      };
    } catch (err: unknown) {
      console.error("createCategory error:", err);
      return { success: false, message: err instanceof Error ? err.message : "Unknown error" };
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await fetchInstance("/products/db");
      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: data || [],
      });
    } catch (err: unknown) {
      console.error("fetchProducts error:", err instanceof Error ? err.message : err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetchInstance(`/products/${id}/delete`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: state.products.filter((p: any) => p._id !== id),
      });
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
      alert("Error deleting product");
    }
  };

  const createProduct = async (productData: FormData) => {
    try {
      dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: true });

      const data = await fetchInstance("/products", {
        method: "POST",
        body: productData,
      });

      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: data });
      return data;
    } catch (err: unknown) {
      console.error("createProduct error:", err instanceof Error ? err.message : err);
      throw err;
    } finally {
      dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: false });
    }
  };

  const handleProductForm = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const buildObject = (fields: Array<{ key: string; value: string }>) => {
    return fields.reduce<Record<string, string>>((obj, item) => {
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
    const payload: Record<string, any> = { name: form.formData.name.trim() };

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
      .filter((color: string) => typeof color === "string" && color.trim() !== "")
      .map((color: string) => color.trim());
    if (colors.length) payload.colors = colors;

    const sizes = form.sizesList
      .filter((size: string) => typeof size === "string" && size.trim() !== "")
      .map((size: string) => size.trim());
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

  const buildProductScalarsFormData = (imagesOverride?: File[]) => {
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

    payload.colors?.forEach((color: string) => body.append("colors", color));
    payload.sizes?.forEach((size: string) => body.append("sizes", size));
    const imagesToAttach = imagesOverride ?? state.productForm.images;
    imagesToAttach.forEach((file: File) => body.append("images", file));

    return body;
  };

  const hasNestedFields = (payload: Record<string, any>) =>
    NESTED_PRODUCT_KEYS.some(
      (key) => payload[key] && Object.keys(payload[key]).length > 0,
    );

  const pickNestedFields = (payload: Record<string, any>) => {
    const nested: Record<string, any> = {};
    NESTED_PRODUCT_KEYS.forEach((key) => {
      if (payload[key]) nested[key] = payload[key];
    });
    return nested;
  };

  const submitProduct = async ({ endpoint, method = "POST", imagesOverride }: { endpoint: string; method?: string; imagesOverride?: File[] }) => {
    const payload = buildProductPayload();
    const imagesToUse = imagesOverride ?? state.productForm.images;
    const hasImages = imagesToUse.length > 0;

    if (!hasImages) {
      return fetchInstance(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
    }

    const scalarBody = buildProductScalarsFormData(imagesToUse);

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

  const isValidObjectId = (value: string) => /^[0-9a-fA-F]{24}$/.test(value);

  const buildProductFormData = () => buildProductScalarsFormData();

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    fetchProducts();
    fetchCategories();
  }, [authLoading, isAuthenticated]);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        createProduct,
        fetchProducts,
        fetchCategories,
        deleteProduct,
        createCategory,
        handleProductForm,
        buildProductFormData,
        submitProduct,
        isValidObjectId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
