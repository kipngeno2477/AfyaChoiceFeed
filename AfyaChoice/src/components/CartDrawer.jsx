import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Mail, MapPin } from 'lucide-react';
import { STORE_INFO, BRANCHES } from '../data/feedsData';
import AfyaLogo from './AfyaLogo';

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
    selectedBranch,
    setSelectedBranch
}) {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [deliveryType, setDeliveryType] = useState('pickup');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [orderSentMessage, setOrderSentMessage] = useState(false);

    if (!isOpen) return null;

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.pricePerBag * item.quantity),
        0
    );

    const handleWhatsAppCheckout = () => {
        if (cartItems.length === 0) return;

        let itemsList = cartItems
            .map((item, index) => `${index + 1}. *${item.name}* (${item.packaging}) x ${item.quantity} bags = KES ${(item.pricePerBag * item.quantity).toLocaleString()}`)
            .join('\n');

        const message =
            `*NEW ORDER - AFYACHOICE FEEDS*
---------------------------------------
*Customer:* ${customerName || 'Customer'}
*Phone:* ${customerPhone || 'Not provided'}
*Selected Branch:* ${selectedBranch}
*Order Type:* ${deliveryType === 'delivery' ? `Delivery to: ${deliveryAddress || 'Farm address'}` : 'Store Pickup'}

*ITEMS ORDERED:*
${itemsList}

*TOTAL AMOUNT:* KES ${totalAmount.toLocaleString()}
---------------------------------------
Please confirm stock availability and M-Pesa payment details.`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${STORE_INFO.phoneRaw}?text=${encoded}`, '_blank');
    };

    const handleEmailOrder = (e) => {
        e.preventDefault();
        if (!customerName || !customerPhone) {
            alert("Please enter your name and phone number");
            return;
        }
        setOrderSentMessage(true);
        setTimeout(() => {
            setOrderSentMessage(false);
            onClearCart();
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

                    {/* Drawer Header */}
                    <div className="p-4 sm:p-5 bg-farm-primary text-white flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <AfyaLogo variant="icon" size="sm" />
                            <div>
                                <h2 className="text-base sm:text-lg font-bold leading-tight">Your Feeds Cart</h2>
                                <p className="text-xs text-emerald-200">
                                    {cartItems.length} product(s) selected
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                        {orderSentMessage ? (
                            <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-farm-primary space-y-2">
                                <div className="w-12 h-12 bg-farm-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    ✓
                                </div>
                                <h3 className="font-bold text-lg">Order Received!</h3>
                                <p className="text-xs text-slate-600">
                                    Our dispatch manager at <b>{selectedBranch}</b> will contact you shortly on {customerPhone}.
                                </p>
                            </div>
                        ) : cartItems.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 space-y-3">
                                <div className="flex justify-center mb-3">
                                    <AfyaLogo variant="mark" size="md" className="opacity-70" />
                                </div>
                                <p className="text-base font-semibold text-slate-700">Your cart is currently empty</p>
                                <p className="text-xs text-slate-500 max-w-xs mx-auto">Browse our store and add Dairy Meals, Poultry Mash, or Nuscience Concentrates.</p>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items List */}
                                <div className="space-y-3">
                                    {cartItems.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                                        >
                                            <div className="flex-1 min-w-0 pr-2">
                                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-slate-500">
                                                    {item.packaging} • KES {item.pricePerBag.toLocaleString()}
                                                </p>
                                                <p className="text-xs font-bold text-farm-primary mt-1">
                                                    KES {(item.pricePerBag * item.quantity).toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-rooster-red transition"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="px-2 text-xs font-bold text-slate-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-farm-primary transition"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => onRemoveItem(item.id)}
                                                    className="p-1.5 text-slate-400 hover:text-rooster-red transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Farmer / Checkout Details */}
                                <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
                                    <h3 className="font-bold text-slate-900 text-sm">Delivery & Customer Info</h3>

                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1">Select Branch for Pickup / Dispatch:</label>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-farm-primary focus:outline-none"
                                        >
                                            {BRANCHES.map(b => (
                                                <option key={b.id} value={b.name}>{b.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-slate-600 mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Kamau"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-farm-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-600 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="0712 345 678"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-farm-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="delType"
                                                value="pickup"
                                                checked={deliveryType === 'pickup'}
                                                onChange={() => setDeliveryType('pickup')}
                                                className="text-farm-primary"
                                            />
                                            <span>Store Pickup</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="delType"
                                                value="delivery"
                                                checked={deliveryType === 'delivery'}
                                                onChange={() => setDeliveryType('delivery')}
                                                className="text-farm-primary"
                                            />
                                            <span>Farm Delivery</span>
                                        </label>
                                    </div>

                                    {deliveryType === 'delivery' && (
                                        <input
                                            type="text"
                                            placeholder="Town, Ward, or Farm landmark..."
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
                                            className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-farm-primary"
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Drawer Footer with Checkout CTAs */}
                    {cartItems.length > 0 && !orderSentMessage && (
                        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                            <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
                                <span>Total Amount:</span>
                                <span className="text-xl text-farm-primary">
                                    KES {totalAmount.toLocaleString()}
                                </span>
                            </div>

                            {/* Order via WhatsApp */}
                            <button
                                onClick={handleWhatsAppCheckout}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2 transition"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>Order via WhatsApp (Instant)</span>
                            </button>

                            {/* Order via Email */}
                            <button
                                onClick={handleEmailOrder}
                                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-xs"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Submit Order via Email</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}