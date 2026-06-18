import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://furniro-back-production.up.railway.app/api";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 30 * 24 * 60 * 60,
};

const MONGO_OBJECT_ID = /^[0-9a-fA-F]{24}$/;

type ProductListItem = { id?: number; _id?: string };

async function resolveUpdateProductPath(
  pathSegments: string[],
): Promise<string[] | null> {
  if (pathSegments[0] !== "update-product" || !pathSegments[1]) {
    return pathSegments;
  }

  const paramId = pathSegments[1];
  if (MONGO_OBJECT_ID.test(paramId)) {
    return pathSegments;
  }

  const listRes = await fetch(`${BACKEND_URL}/products/db`, {
    cache: "no-store",
  });

  if (!listRes.ok) return null;

  const products: ProductListItem[] = await listRes.json();
  const product = products.find((p) => p.id?.toString() === paramId);

  if (!product?._id) return null;

  return ["update-product", product._id, ...pathSegments.slice(2)];
}

async function proxy(request: NextRequest, pathSegments: string[]) {
  let segments = pathSegments;

  if (request.method === "PUT" && pathSegments[0] === "update-product") {
    const resolved = await resolveUpdateProductPath(pathSegments);
    if (!resolved) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    segments = resolved;
  }

  const path = segments.join("/");
  const url = `${BACKEND_URL}/${path}${request.nextUrl.search}`;
  const token = request.cookies.get("adminToken")?.value;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (token) headers.set("x-auth-token", token);

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const body = await request.arrayBuffer();
    if (body.byteLength) init.body = body;
  }

  const backendRes = await fetch(url, init);
  const resContentType = backendRes.headers.get("content-type") || "";

  if (path === "adminlogin" && backendRes.ok && resContentType.includes("json")) {
    const data = await backendRes.json();
    const response = NextResponse.json({
      msg: data.msg,
      admin: data.admin
        ? {
            id: data.admin.id,
            name: data.admin.name,
            email: data.admin.email,
            role: data.admin.role,
          }
        : undefined,
    });

    if (data.token) {
      response.cookies.set("adminToken", data.token, COOKIE_OPTIONS);
    }

    return response;
  }

  if (path === "adminlogout") {
    const data = resContentType.includes("json")
      ? await backendRes.json()
      : { msg: "Admin logged out successfully" };
    const response = NextResponse.json(data, { status: backendRes.status });
    response.cookies.set("adminToken", "", { ...COOKIE_OPTIONS, maxAge: 0 });
    return response;
  }

  const responseBody = await backendRes.arrayBuffer();
  const response = new NextResponse(responseBody, { status: backendRes.status });
  if (resContentType) response.headers.set("content-type", resContentType);

  return response;
}

type RouteContext = { params: Promise<{ path: string[] }> };

async function handle(
  request: NextRequest,
  context: RouteContext,
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
