"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchInstance } from "./api";
import { useAuthContext } from "./authcontext";

const AppContext = createContext<{
  usersData: any[];
  orders: any[];
  posts: any[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  createPost: (formData: FormData) => Promise<any>;
  handleDeleteUser: (id: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
} | null>(null);

const initialState = {
  usersData: [],
  orders: [],
  posts: [],
  loading: false,
};

export const ACTIONS = {
  SET_USERS: "SET_USERS",
  SET_ORDERS: "SET_ORDERS",
  SET_POSTS: "SET_POSTS",
  SET_LOADING: "SET_LOADING",
};

function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return { ...state, usersData: action.payload };

    case ACTIONS.SET_ORDERS:
      return { ...state, orders: action.payload };

    case ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload };

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, authLoading } = useAuthContext();

  const fetchUsers = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/users");

      dispatch({
        type: ACTIONS.SET_USERS,
        payload: data || [],
      });
    } catch (err: unknown) {
      console.error("fetchUsers error:", err instanceof Error ? err.message : err);
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
    } catch (err: unknown) {
      console.error("fetchOrders error:", err instanceof Error ? err.message : err);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };
  

  const fetchPosts = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/post");

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: data || [],
      });
    } catch (err: unknown) {
      console.error("fetchPosts error:", err instanceof Error ? err.message : err);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const createPost = async (formData: FormData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const data = await fetchInstance("/post", {
        method: "POST",
        body: formData,
      });

      const newPost = data?.post || data;

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: [newPost, ...state.posts],
      });

      return data;
    } catch (err: unknown) {
      console.error("createPost error:", err instanceof Error ? err.message : err);
      throw err;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await fetchInstance(`/users/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_USERS,
        payload: state.usersData.filter((u: any) => u._id !== id),
      });
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
      alert(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await fetchInstance(`/orders/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: ACTIONS.SET_ORDERS,
        payload: state.orders.filter((o: any) => o._id !== id),
      });
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
      alert("Error deleting order");
    }
  };

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    fetchUsers();
    fetchOrders();
    fetchPosts();
  }, [authLoading, isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchUsers,
        fetchOrders,
        fetchPosts,
        createPost,
        handleDeleteUser,
        deleteOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
