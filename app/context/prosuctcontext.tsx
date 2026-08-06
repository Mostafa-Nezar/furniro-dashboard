"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { fetchInstance } from "./api";
import { useAuthContext } from "./authcontext";
import {
  buildProductPayload,
  buildScalarsFormData,
  findProductById,
  hasNestedFields,
  initialProductForm, initialProductFormUi, pickNestedFields,
  productToFormState,
  type ProductFormState,
  type ProductFormUiState,
} from "./productFormHelpers";

export const ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_PRODUCT: "ADD_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
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
  SET_PRODUCT_FORM_UI: "SET_PRODUCT_FORM_UI",
  PATCH_PRODUCT_FORM_UI: "PATCH_PRODUCT_FORM_UI",
  RESET_PRODUCT_FORM_UI: "RESET_PRODUCT_FORM_UI",
} as const;

type AppState = {
  products: Record<string, unknown>[];
  categories: Record<string, unknown>[];
  productCreateLoading: boolean;
  productForm: ProductFormState;
  productFormUi: ProductFormUiState;
};

const initialState: AppState = {
  products: [],
  categories: [],
  productCreateLoading: false,
  productForm: initialProductForm,
  productFormUi: initialProductFormUi,
};

function reducer(
  state: AppState,
  action: { type: string; payload?: unknown },
): AppState {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload as Record<string, unknown>[] };

    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload as Record<string, unknown>],
      };

    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === (action.payload as Record<string, unknown>)._id
            ? (action.payload as Record<string, unknown>)
            : product,
        ),
      };

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload as Record<string, unknown>[] };

    case ACTIONS.ADD_CATEGORY: {
      const category = action.payload as Record<string, unknown>;
      const exists = state.categories.some((c) => c._id === category._id);
      if (exists) return state;
      return { ...state, categories: [...state.categories, category] };
    }

    case ACTIONS.SET_PRODUCT_LOADING:
      return { ...state, productCreateLoading: action.payload as boolean };

    case ACTIONS.SET_PRODUCT_FORM_DATA: {
      const { name, value } = action.payload as { name: string; value: string };
      return {
        ...state,
        productForm: {
          ...state.productForm,
          formData: { ...state.productForm.formData, [name]: value },
        },
      };
    }

    case ACTIONS.SET_ALL_PRODUCT_DATA:
      return { ...state, productForm: action.payload as ProductFormState };

    case ACTIONS.SET_PRODUCT_IMAGES:
      return {
        ...state,
        productForm: {
          ...state.productForm,
          images: action.payload as File[],
        },
      };

    case ACTIONS.UPDATE_PRODUCT_FIELD: {
      const { section, index, field, value } = action.payload as {
        section: keyof ProductFormState;
        index: number;
        field: "key" | "value";
        value: string;
      };
      const rows = [...(state.productForm[section] as { key: string; value: string }[])];
      rows[index] = { ...rows[index], [field]: value };
      return {
        ...state,
        productForm: { ...state.productForm, [section]: rows },
      };
    }

    case ACTIONS.ADD_PRODUCT_FIELD_ROW: {
      const { section } = action.payload as { section: keyof ProductFormState };
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: [
            ...(state.productForm[section] as { key: string; value: string }[]),
            { key: "", value: "" },
          ],
        },
      };
    }

    case ACTIONS.REMOVE_PRODUCT_FIELD_ROW: {
      const { section, index } = action.payload as {
        section: keyof ProductFormState;
        index: number;
      };
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: (
            state.productForm[section] as { key: string; value: string }[]
          ).filter((_, i) => i !== index),
        },
      };
    }

    case ACTIONS.UPDATE_PRODUCT_STRING_ARRAY: {
      const { section, index, value } = action.payload as {
        section: "colorsList" | "sizesList";
        index: number;
        value: string;
      };
      const list = [...state.productForm[section]];
      list[index] = value;
      return {
        ...state,
        productForm: { ...state.productForm, [section]: list },
      };
    }

    case ACTIONS.ADD_PRODUCT_STRING_ARRAY_ROW: {
      const { section } = action.payload as { section: "colorsList" | "sizesList" };
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: [...state.productForm[section], ""],
        },
      };
    }

    case ACTIONS.REMOVE_PRODUCT_STRING_ARRAY_ROW: {
      const { section, index } = action.payload as {
        section: "colorsList" | "sizesList";
        index: number;
      };
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [section]: state.productForm[section].filter((_, i) => i !== index),
        },
      };
    }

    case ACTIONS.RESET_PRODUCT_FORM:
      return { ...state, productForm: initialProductForm };

    case ACTIONS.SET_PRODUCT_FORM_UI:
      return { ...state, productFormUi: action.payload as ProductFormUiState };

    case ACTIONS.PATCH_PRODUCT_FORM_UI:
      return {
        ...state,
        productFormUi: {
          ...state.productFormUi,
          ...(action.payload as Partial<ProductFormUiState>),
        },
      };

    case ACTIONS.RESET_PRODUCT_FORM_UI:
      return { ...state, productFormUi: initialProductFormUi };

    default:
      return state;
  }
}

type ProductContextValue = {
  products: Record<string, unknown>[];
  categories: Record<string, unknown>[];
  productCreateLoading: boolean;
  productForm: ProductFormState;
  productFormUi: ProductFormUiState;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createCategory: (
    name: string,
    imageFile?: File | null,
  ) => Promise<{ success: boolean; category?: Record<string, unknown>; message?: string }>;
  handleProductForm: (type: string, payload?: unknown) => void;
  initAddProductPage: () => void;
  initEditProductPage: (productId: string) => void;
  setFormField: (name: string, value: string) => void;
  setSelectedImages: (files: File[]) => void;
  setNewCategoryName: (name: string) => void;
  toggleCategoryInput: () => void;
  cancelCategoryInput: () => void;
  handleAddCategory: () => Promise<void>;
  submitAddProduct: () => Promise<void>;
  submitUpdateProduct: () => Promise<void>;
  closeProductPopup: (redirectTo?: string | null) => void;
  dismissProductPopup: () => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, authLoading } = useAuthContext();

  const patchUi = useCallback((patch: Partial<ProductFormUiState>) => {
    dispatch({ type: ACTIONS.PATCH_PRODUCT_FORM_UI, payload: patch });
  }, []);

  const showPopup = useCallback(
    (title: string, message: string, type: ProductFormUiState["popup"]["type"]) => {
      patchUi({
        popup: { open: true, title, message, type },
      });
    },
    [patchUi],
  );

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

  const fetchProducts = async () => {
    try {
      const data = await fetchInstance("/products/db");
      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: data || [],
      });
    } catch (err: unknown) {
      console.error(
        "fetchProducts error:",
        err instanceof Error ? err.message : err,
      );
    }
  };

  const createCategory = async (name: string, imageFile?: File | null) => {
    try {
      const res = imageFile
        ? await fetchInstance("/add-category", {
            method: "POST",
            body: (() => {
              const formData = new FormData();
              formData.append("name", name);
              formData.append("image", imageFile);
              return formData;
            })(),
          })
        : await fetchInstance("/add-category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    } catch (err: unknown) {
      console.error("createCategory error:", err);
      return {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetchInstance(`/products/${id}/delete`, { method: "DELETE" });
      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: state.products.filter((p) => p._id !== id),
      });
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
      alert("Error deleting product");
    }
  };

  const createProductWithPayload = async (
    payload: Record<string, unknown>,
    images: File[],
  ) => {
    dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: true });

    try {
      const hasImages = images.length > 0;

      if (!hasImages) {
        const data = await fetchInstance("/add-product", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (data?.product) dispatch({ type: ACTIONS.ADD_PRODUCT, payload: data.product });
        return data;
      }

      const result = await fetchInstance("/add-product", {
        method: "POST",
        body: buildScalarsFormData(payload, images),
      });

      const productId = result?.product?._id;
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

      if (result?.product) {
        dispatch({ type: ACTIONS.ADD_PRODUCT, payload: result.product });
      }

      return result;
    } finally {
      dispatch({ type: ACTIONS.SET_PRODUCT_LOADING, payload: false });
    }
  };

  const updateProductWithPayload = async (
    productId: string,
    payload: Record<string, unknown>,
    images: File[],
  ) => {
    const hasImages = images.length > 0;
    const nested = pickNestedFields(payload);
    const hasNested = hasNestedFields(payload);

    if (!hasImages) {
      const data = await fetchInstance(`/update-product/${productId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      return data?.product ?? data;
    }

    await fetchInstance(`/update-product/${productId}`, {
      method: "PUT",
      body: buildScalarsFormData(payload, images),
    });

    if (hasNested) {
      const data = await fetchInstance(`/update-product/${productId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: payload.name,
          price: payload.price,
          ...nested,
        }),
      });
      return data?.product ?? data;
    }

    return fetchInstance(`/update-product/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ name: payload.name, price: payload.price }),
    });
  };

  const handleProductForm = (type: string, payload?: unknown) => {
    dispatch({ type, payload });
  };

  const initAddProductPage = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_PRODUCT_FORM });
    dispatch({ type: ACTIONS.RESET_PRODUCT_FORM_UI });
  }, []);

  const initEditProductPage = useCallback(
    (productId: string) => {
      dispatch({ type: ACTIONS.RESET_PRODUCT_FORM_UI });

      const product = findProductById(state.products, productId);
      if (!product) {
        patchUi({ editingProduct: null });
        return;
      }

      patchUi({ editingProduct: product });
      dispatch({
        type: ACTIONS.SET_ALL_PRODUCT_DATA,
        payload: productToFormState(product),
      });
    },
    [state.products, patchUi],
  );

  const setFormField = useCallback((name: string, value: string) => {
    dispatch({
      type: ACTIONS.SET_PRODUCT_FORM_DATA,
      payload: { name, value },
    });
  }, []);

  const setSelectedImages = useCallback(
    (files: File[]) => {
      patchUi({ selectedImages: files });
      dispatch({ type: ACTIONS.SET_PRODUCT_IMAGES, payload: files });
    },
    [patchUi],
  );

  const setNewCategoryName = useCallback(
    (name: string) => patchUi({ newCategoryName: name }),
    [patchUi],
  );

  const toggleCategoryInput = useCallback(() => {
    patchUi({ showCategoryInput: !state.productFormUi.showCategoryInput });
  }, [patchUi, state.productFormUi.showCategoryInput]);

  const cancelCategoryInput = useCallback(() => {
    patchUi({ showCategoryInput: false, newCategoryName: "" });
  }, [patchUi]);

  const handleAddCategory = useCallback(async () => {
    const { showCategoryInput, newCategoryName } = state.productFormUi;

    if (!showCategoryInput) {
      patchUi({ showCategoryInput: true });
      return;
    }

    if (!newCategoryName.trim()) {
      cancelCategoryInput();
      return;
    }

    patchUi({ categoryLoading: true });
    try {
      const res = await createCategory(newCategoryName.trim());
      if (res.success && res.category) {
        setFormField("category", String(res.category._id));
        cancelCategoryInput();
        showPopup("Success", "Category added successfully!", "success");
      } else {
        showPopup("Error", res.message || "Failed to add category", "error");
      }
    } finally {
      patchUi({ categoryLoading: false });
    }
  }, [state.productFormUi, patchUi, cancelCategoryInput, setFormField, showPopup]);

  const submitAddProduct = useCallback(async () => {
    patchUi({ loading: true, successRedirect: null });
    try {
      const payload = buildProductPayload(state.productForm);
      const result = await createProductWithPayload(
        payload,
        state.productFormUi.selectedImages,
      );

      dispatch({ type: ACTIONS.RESET_PRODUCT_FORM });
      patchUi({ selectedImages: [] });
      showPopup(
        "Success",
        result?.msg || "Product added successfully!",
        "success",
      );
    } catch (err: unknown) {
      showPopup(
        "Error",
        err instanceof Error ? err.message : "Failed to add product.",
        "error",
      );
    } finally {
      patchUi({ loading: false });
    }
  }, [state.productForm, state.productFormUi.selectedImages, patchUi, showPopup]);

  const submitUpdateProduct = useCallback(async () => {
    const { editingProduct } = state.productFormUi;
    if (!editingProduct) return;

    const productId = String(editingProduct._id ?? editingProduct.id);
    patchUi({ loading: true, successRedirect: "/getproducts" });

    try {
      const payload = buildProductPayload(state.productForm);
      const updated = await updateProductWithPayload(
        productId,
        payload,
        state.productFormUi.selectedImages,
      );

      if (updated) {
        dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: updated });
      } else {
        await fetchProducts();
      }

      showPopup("Success", "Product updated successfully!", "success");
    } catch (err: unknown) {
      patchUi({ successRedirect: null });
      showPopup(
        "Error",
        err instanceof Error ? err.message : "Failed to update product.",
        "error",
      );
    } finally {
      patchUi({ loading: false });
    }
  }, [state.productForm, state.productFormUi, patchUi, showPopup]);

  const closeProductPopup = useCallback(
    (redirectTo?: string | null) => {
      const redirect = redirectTo ?? state.productFormUi.successRedirect;
      patchUi({
        popup: { ...state.productFormUi.popup, open: false },
        successRedirect: null,
      });
      if (redirect && typeof window !== "undefined") {
        window.location.href = redirect;
      }
    },
    [patchUi, state.productFormUi.popup, state.productFormUi.successRedirect],
  );

  const dismissProductPopup = useCallback(() => {
    patchUi({
      popup: { ...state.productFormUi.popup, open: false },
      successRedirect: null,
    });
  }, [patchUi, state.productFormUi.popup]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    fetchProducts();
    fetchCategories();
  }, [authLoading, isAuthenticated]);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        productCreateLoading: state.productCreateLoading,
        productForm: state.productForm,
        productFormUi: state.productFormUi,
        fetchProducts,
        fetchCategories,
        deleteProduct,
        createCategory,
        handleProductForm,
        initAddProductPage,
        initEditProductPage,
        setFormField,
        setSelectedImages,
        setNewCategoryName,
        toggleCategoryInput,
        cancelCategoryInput,
        handleAddCategory,
        submitAddProduct,
        submitUpdateProduct,
        closeProductPopup,
        dismissProductPopup,
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
