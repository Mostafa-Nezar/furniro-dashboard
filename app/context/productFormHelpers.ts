export type KeyValueField = { key: string; value: string };

export type ProductFormData = {
  key: string;
  name: string;
  price: string;
  salePrice: string;
  category: string;
  des: string;
  not: string;
  sale: string;
  quantity: string;
};

export type ProductFormState = {
  formData: ProductFormData;
  colorsList: string[];
  sizesList: string[];
  generalFields: KeyValueField[];
  myproductFields: KeyValueField[];
  dimensionsFields: KeyValueField[];
  warrantyFields: KeyValueField[];
  customAttributes: KeyValueField[];
  images: File[];
};

export type ProductFormUiState = {
  loading: boolean;
  categoryLoading: boolean;
  showCategoryInput: boolean;
  newCategoryName: string;
  selectedImages: File[];
  popup: {
    open: boolean;
    title: string;
    message: string;
    type: "info" | "success" | "error";
  };
  editingProduct: Record<string, unknown> | null;
  successRedirect: string | null;
};

export const EMPTY_KEY_VALUE: KeyValueField = { key: "", value: "" };

export const initialProductForm: ProductFormState = {
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
  generalFields: [{ ...EMPTY_KEY_VALUE }],
  myproductFields: [{ ...EMPTY_KEY_VALUE }],
  dimensionsFields: [{ ...EMPTY_KEY_VALUE }],
  warrantyFields: [{ ...EMPTY_KEY_VALUE }],
  customAttributes: [{ ...EMPTY_KEY_VALUE }],
  images: [],
};

export const initialProductFormUi: ProductFormUiState = {
  loading: false,
  categoryLoading: false,
  showCategoryInput: false,
  newCategoryName: "",
  selectedImages: [],
  popup: { open: false, title: "", message: "", type: "info" },
  editingProduct: null,
  successRedirect: null,
};

export const NESTED_PRODUCT_KEYS = [
  "general",
  "myproduct",
  "dimensions",
  "warranty",
  "customAttributes",
] as const;

export function objectToFields(
  obj: Record<string, unknown> | null | undefined,
): KeyValueField[] {
  if (!obj || typeof obj !== "object") return [{ ...EMPTY_KEY_VALUE }];
  const entries = Object.entries(obj);
  return entries.length > 0
    ? entries.map(([key, value]) => ({ key, value: String(value) }))
    : [{ ...EMPTY_KEY_VALUE }];
}

export function buildObject(
  fields: KeyValueField[],
): Record<string, string> {
  return fields.reduce<Record<string, string>>((obj, item) => {
    const key = item.key?.trim();
    if (key) obj[key] = item.value;
    return obj;
  }, {});
}

export function filterNonEmptyStrings(list: string[]): string[] {
  return list
    .filter((item) => typeof item === "string" && item.trim() !== "")
    .map((item) => item.trim());
}

export function resolveCategoryId(category: unknown): string {
  if (typeof category === "object" && category !== null && "_id" in category) {
    return String((category as { _id: string })._id);
  }
  return category ? String(category) : "";
}

export function findProductById(
  products: Record<string, unknown>[],
  productId: string,
): Record<string, unknown> | undefined {
  return products.find(
    (p) =>
      String(p.id) === String(productId) ||
      String(p._id) === String(productId),
  );
}

export function productToFormState(
  product: Record<string, unknown>,
): ProductFormState {
  return {
    formData: {
      key: String(product.key ?? ""),
      name: String(product.name ?? ""),
      price: String(product.price ?? ""),
      salePrice: String(product.salePrice ?? ""),
      des: String(product.des ?? ""),
      not: String(product.not ?? ""),
      quantity: String(product.quantity ?? ""),
      sale: String(product.sale ?? ""),
      category: resolveCategoryId(product.category),
    },
    generalFields: objectToFields(product.general as Record<string, unknown>),
    myproductFields: objectToFields(product.myproduct as Record<string, unknown>),
    dimensionsFields: objectToFields(product.dimensions as Record<string, unknown>),
    warrantyFields: objectToFields(product.warranty as Record<string, unknown>),
    customAttributes: objectToFields(
      product.customAttributes as Record<string, unknown>,
    ),
    colorsList:
      Array.isArray(product.colors) && product.colors.length > 0
        ? product.colors.map(String)
        : [""],
    sizesList:
      Array.isArray(product.sizes) && product.sizes.length > 0
        ? product.sizes.map(String)
        : [""],
    images: [],
  };
}

export function buildProductPayload(form: ProductFormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    name: form.formData.name.trim(),
  };

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

  const colors = filterNonEmptyStrings(form.colorsList);
  if (colors.length) payload.colors = colors;

  const sizes = filterNonEmptyStrings(form.sizesList);
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
}

export function hasNestedFields(payload: Record<string, unknown>): boolean {
  return NESTED_PRODUCT_KEYS.some(
    (key) =>
      payload[key] &&
      typeof payload[key] === "object" &&
      Object.keys(payload[key] as object).length > 0,
  );
}

export function pickNestedFields(
  payload: Record<string, unknown>,
): Record<string, unknown> {
  const nested: Record<string, unknown> = {};
  NESTED_PRODUCT_KEYS.forEach((key) => {
    if (payload[key]) nested[key] = payload[key];
  });
  return nested;
}

export function buildScalarsFormData(
  payload: Record<string, unknown>,
  images: File[],
): FormData {
  const body = new FormData();

  body.append("name", String(payload.name));
  if (payload.key) body.append("key", String(payload.key));
  if (payload.category) body.append("category", String(payload.category));
  if (payload.price !== undefined)
    body.append("price", String(payload.price));
  if (payload.salePrice !== undefined)
    body.append("salePrice", String(payload.salePrice));
  if (payload.sale !== undefined) body.append("sale", String(payload.sale));
  if (payload.quantity !== undefined)
    body.append("quantity", String(payload.quantity));
  if (payload.des) body.append("des", String(payload.des));
  if (payload.not) body.append("not", String(payload.not));

  (payload.colors as string[] | undefined)?.forEach((color) =>
    body.append("colors", color),
  );
  (payload.sizes as string[] | undefined)?.forEach((size) =>
    body.append("sizes", size),
  );
  images.forEach((file) => body.append("images", file));

  return body;
}
