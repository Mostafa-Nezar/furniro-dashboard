"use client";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "../../context/context";
import { ArrowLeft, Mail, Phone, MapPin, ShoppingCart, Package, Check, X, Bell } from "lucide-react";

export default function UserProfilePage() {
    const { usersData, orders, loading } = useAppContext();
    const { id } = useParams();
    const router = useRouter();

    const user = useMemo(
        () =>
            usersData.find(
                (u) => u.id?.toString() === id || u._id === id || u.email === id
            ),
        [usersData, id]
    );

    const userOrders = useMemo(
        () =>
            orders.filter(
                (order) =>
                    order.customerInfo?.email === user?.email ||
                    order.customerInfo?.fullName === user?.name
            ),
        [orders, user]
    );

    if (loading) {
        return <p className="text-center py-8 text-muted">Loading user profile...</p>;
    }

    if (!user) {
        return (
            <div className="min-h-screen p-4 sm:p-6">
                <button
                    onClick={() => router.back()}
                    className="btn btn-primary inline-flex items-center gap-2 mb-4"
                >
                    <ArrowLeft size={14} /> Back
                </button>
                <div className="card p-6 text-center">
                    <p className="text-lg font-semibold text-heading">User not found</p>
                    <p className="text-sm text-muted mt-2">تأكد من اختيار مستخدم صحيح من قائمة المستخدمين.</p>
                    <Link href="/users" className="btn btn-primary mt-4 inline-flex items-center justify-center">
                        Users list
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-heading">User Profile</h2>
                    <p className="text-sm text-muted mt-1">عرض بيانات المستخدم من مصفوفة المستخدمين فقط.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn btn-secondary inline-flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                    <Link
                        href="/users"
                        className="btn btn-primary inline-flex items-center gap-2 text-sm"
                    >
                        Users list
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="card p-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-heading mb-3">Basic Information</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Name</p>
                                <p className="text-base font-medium text-body">{user.name || "-"}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Email</p>
                                <p className="text-base font-medium text-body">{user.email || "-"}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">User ID</p>
                                <p className="text-base font-medium text-body">{user.id ?? user._id}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Google User</p>
                                <p className="text-base font-medium text-body">{user.isGoogleUser ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-heading mb-3">Contact & Location</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Phone</p>
                                <p className="text-base font-medium text-body">{user.phoneNumber || "-"}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Location</p>
                                <p className="text-base font-medium text-body">{user.location || "-"}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Subscribed</p>
                                <p className="text-base font-medium text-body">{user.isSubscribed ? "Yes" : "No"}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs uppercase text-muted mb-1">Cart</p>
                                <p className="text-base font-medium text-body">{user.cart ? "Attached" : "Not available"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-6 space-y-6">
                    {/* Notifications Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Bell size={20} className="text-blue-400" />
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-muted">Notifications</p>
                                <p className="text-2xl font-semibold text-heading">
                                    {Array.isArray(user?.notifications) ? user.notifications.length : (user?.notifications ? 1 : 0)}
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 space-y-3 max-h-[300px] overflow-y-auto">
                            {!user?.notifications || (Array.isArray(user?.notifications) && user.notifications.length === 0) ? (
                                <p className="text-sm text-body">لا توجد إشعارات لهذا المستخدم.</p>
                            ) : (
                                <div className="space-y-2">
                                    {Array.isArray(user?.notifications) ? (
                                        user.notifications.map((notif) => (
                                            <div key={notif._id} className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-heading">{notif.title}</p>
                                                        <p className="text-xs text-body mt-1">{notif.message}</p>
                                                        <p className="text-xs text-muted mt-1">
                                                            {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                    <div className={`text-xs font-semibold px-2 py-1 rounded ${notif.read ? 'bg-slate-700 text-slate-300' : 'bg-blue-900/50 text-blue-300'}`}>
                                                        {notif.read ? 'Read' : 'Unread'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
                                            <p className="text-sm font-medium text-heading">{user.notifications.title}</p>
                                            <p className="text-xs text-body mt-1">{user.notifications.message}</p>
                                            <p className="text-xs text-muted mt-1">
                                                {new Date(user.notifications.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="border-t border-slate-700 pt-6">
                        <div className="flex items-center gap-3 mb-3">
                            <ShoppingCart size={20} className="text-emerald-400" />
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-muted">Shopping Cart</p>
                                <p className="text-2xl font-semibold text-heading">
                                    {user?.cart?.items?.length || 0}
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 space-y-3 max-h-[300px] overflow-y-auto">
                            {!user?.cart || !user.cart.items || user.cart.items.length === 0 ? (
                                <p className="text-sm text-body">السلة فارغة</p>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        {user.cart.items.map((item, index) => (
                                            <div key={index} className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
                                                <div className="flex gap-3">
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-12 h-12 rounded object-cover"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-heading">{item.name}</p>
                                                        <p className="text-xs text-muted mt-1">Qty: {item.quantity}</p>
                                                        <p className="text-xs text-body">${item.price}</p>
                                                        {item.variant?.color && (
                                                            <p className="text-xs text-muted mt-1">Color: {item.variant.color}</p>
                                                        )}
                                                        {item.variant?.size && (
                                                            <p className="text-xs text-muted">Size: {item.variant.size}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-slate-700 pt-3 mt-3">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-semibold text-heading">Total Price:</p>
                                            <p className="text-sm font-semibold text-emerald-400">${user.cart.totalPrice?.toFixed(2) || '0.00'}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="border-t border-slate-700 pt-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Package size={20} className="text-purple-400" />
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-muted">Orders</p>
                                <p className="text-2xl font-semibold text-heading">{userOrders.length}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 space-y-3 max-h-[300px] overflow-y-auto">
                            {userOrders.length === 0 ? (
                                <p className="text-sm text-body">لا توجد طلبات مرتبطة بهذا المستخدم.</p>
                            ) : (
                                <div className="space-y-3">
                                    {userOrders.slice(0, 10).map((order) => (
                                        <div key={order._id} className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <p className="text-sm font-medium text-heading">Order #{order._id?.slice(-8)}</p>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded ${order.status === 'delivered' ? 'bg-emerald-900/50 text-emerald-300' :
                                                        order.status === 'shipping' ? 'bg-blue-900/50 text-blue-300' :
                                                            order.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                                                                order.status === 'refused' || order.status === 'cancelled' ? 'bg-red-900/50 text-red-300' :
                                                                    'bg-slate-700 text-slate-300'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-body">Total: <span className="font-semibold text-heading">${order.total}</span></p>
                                            <p className="text-xs text-muted mt-1">{new Date(order.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-body mt-1">{order.products?.length || 0} items</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
