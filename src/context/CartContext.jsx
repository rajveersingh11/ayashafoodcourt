import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ayanshi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('ayanshi_cart', JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addToCart = (dish, portion = 'standard', customConfig = null) => {
    let unitPrice = dish.price;
    let label = dish.name;

    if (portion === 'half' && dish.halfPrice) {
      unitPrice = dish.halfPrice;
      label = `${dish.name} (Half)`;
    } else if (portion === 'full' && dish.fullPrice) {
      unitPrice = dish.fullPrice;
      label = `${dish.name} (Full)`;
    } else if (customConfig) {
      unitPrice = customConfig.totalPrice;
      label = customConfig.title || 'Custom 3D Thali';
    }

    const cartKey = customConfig ? `custom-${Date.now()}` : `${dish.id}-${portion}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.key === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.key === cartKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key: cartKey,
          id: dish.id,
          name: label,
          price: unitPrice,
          portion,
          quantity: 1,
          customConfig,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.key === cartKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (cartKey) => {
    setItems((prev) => prev.filter((item) => item.key !== cartKey));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const freeDeliveryThreshold = RESTAURANT_INFO.deliveryMinOrder; // 350
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || orderType === 'pickup';
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery ? 0 : 30) : 0;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const grandTotal = subtotal + deliveryFee;

  // Generate WhatsApp Order Link
  const generateWhatsAppLink = () => {
    if (items.length === 0) return '#';

    let msg = `*🍛 NEW ORDER - AYANSHI FOOD COURT*\n\n`;
    msg += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerDetails.name) msg += `*Customer:* ${customerDetails.name}\n`;
    if (customerDetails.phone) msg += `*Phone:* ${customerDetails.phone}\n`;
    if (orderType === 'delivery' && customerDetails.address) {
      msg += `*Delivery Address:* ${customerDetails.address}\n`;
    }
    if (customerDetails.notes) msg += `*Special Note:* ${customerDetails.notes}\n`;

    msg += `\n*--- ORDER ITEMS ---*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* x ${item.quantity} = ₹${item.price * item.quantity}\n`;
      if (item.customConfig?.summary) {
        msg += `   └ _${item.customConfig.summary}_\n`;
      }
    });

    msg += `\n*Subtotal:* ₹${subtotal}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery:* ${deliveryFee === 0 ? 'FREE (Special Offer)' : `₹${deliveryFee}`}\n`;
    }
    msg += `*GRAND TOTAL:* *₹${grandTotal}*\n\n`;
    msg += `_Please confirm my order and approximate delivery time. Thank you!_`;

    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        freeDeliveryThreshold,
        isFreeDelivery,
        remainingForFreeDelivery,
        deliveryFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        customerDetails,
        setCustomerDetails,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
