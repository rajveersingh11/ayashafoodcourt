import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Check, Copy, Send, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function UpiPaymentModal({
  isOpen,
  onClose,
  grandTotal,
  subtotal,
  deliveryFee,
  items,
  customerDetails,
  orderType,
  onPaymentSuccess = () => {},
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [paidConfirmed, setPaidConfirmed] = useState(false);

  const upiId = RESTAURANT_INFO.upiId || '8271754563@upi';
  const payeeName = RESTAURANT_INFO.upiName || 'Ayanshi Food Court';

  // Format valid UPI deep link string
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('Ayanshi Food Order')}`;

  useEffect(() => {
    if (isOpen && grandTotal > 0) {
      QRCode.toDataURL(upiUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#201712',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('QR Generation Error:', err));
    }
  }, [isOpen, grandTotal, upiUrl]);

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Paid WhatsApp Order
  const handleConfirmOnWhatsApp = () => {
    let msg = `*🍛 ORDER CONFIRMATION & UPI PAYMENT - AYANSHI FOOD COURT*\n\n`;
    msg += `*Payment Status:* ✅ *PAID VIA UPI (₹${grandTotal})*\n`;
    msg += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerDetails.name) msg += `*Customer:* ${customerDetails.name}\n`;
    if (customerDetails.phone) msg += `*Phone:* ${customerDetails.phone}\n`;
    if (orderType === 'delivery' && customerDetails.address) {
      msg += `*Delivery Address:* ${customerDetails.address}\n`;
    }
    if (customerDetails.notes) msg += `*Note:* ${customerDetails.notes}\n`;

    msg += `\n*--- ORDER ITEMS ---*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* x ${item.quantity} = ₹${item.price * item.quantity}\n`;
      if (item.customConfig?.summary) {
        msg += `   └ _${item.customConfig.summary}_\n`;
      }
    });

    msg += `\n*Subtotal:* ₹${subtotal}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery:* ${deliveryFee === 0 ? 'FREE (2km Offer)' : `₹${deliveryFee}`}\n`;
    }
    msg += `*PAID AMOUNT:* *₹${grandTotal}*\n\n`;
    msg += `_I have completed the UPI payment of ₹${grandTotal}. Please verify and start preparing my order. Thank you!_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    onClose();
    if (onPaymentSuccess) onPaymentSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border border-cream-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-cream-300 flex items-center justify-between bg-gradient-to-r from-cream-100 to-cream-200">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-cardamom-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cardamom-600" /> 100% Secure Instant UPI
            </span>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">Scan & Pay</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-300 text-charcoal-800 transition-colors"
            aria-label="Close UPI Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-center">
          {/* Amount Badge */}
          <div className="inline-block px-6 py-2.5 rounded-2xl bg-saffron-500/15 border border-saffron-500/30">
            <span className="text-xs text-muted block uppercase tracking-wider">Total Payable Amount</span>
            <span className="font-serif text-3xl font-black text-cardamom-700">₹{grandTotal}</span>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-3xl shadow-warm border border-cream-300 inline-block">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Ayanshi Food Court UPI Payment QR"
                  className="w-56 h-56 rounded-xl mx-auto"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-muted text-xs">
                  Generating dynamic QR...
                </div>
              )}
            </div>
            <p className="text-xs text-muted mt-2">
              Scan with <strong>Google Pay, PhonePe, Paytm, BHIM</strong>, or any UPI banking app
            </p>
          </div>

          {/* UPI ID Row */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-cream-200 border border-cream-300 max-w-sm mx-auto">
            <div className="text-left">
              <small className="text-[10px] uppercase font-bold text-muted block">Direct UPI ID</small>
              <span className="font-bold text-xs text-charcoal-900">{upiId}</span>
            </div>
            <button
              onClick={handleCopyUPI}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-cream-100 text-charcoal-900 font-bold text-xs shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cardamom-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted" /> Copy ID
                </>
              )}
            </button>
          </div>

          {/* Mobile Direct 1-Tap Links */}
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
              Or Open Directly on Your Mobile Device
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
              <a
                href={upiUrl}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 font-bold text-xs text-charcoal-800 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>📱 Any UPI App</span>
              </a>
              <a
                href={`phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
                  payeeName
                )}&am=${grandTotal}&cu=INR`}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 font-bold text-xs text-charcoal-800 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>🟣 PhonePe</span>
              </a>
              <a
                href={`gpay://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
                  payeeName
                )}&am=${grandTotal}&cu=INR`}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 font-bold text-xs text-charcoal-800 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>🔵 Google Pay</span>
              </a>
              <a
                href={`paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
                  payeeName
                )}&am=${grandTotal}&cu=INR`}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 font-bold text-xs text-charcoal-800 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>🔷 Paytm</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer / WhatsApp Confirmation */}
        <div className="p-5 border-t border-cream-300 bg-cream-100 flex flex-col gap-2">
          <button
            onClick={handleConfirmOnWhatsApp}
            className="w-full py-3 px-4 rounded-xl font-bold bg-cardamom-600 hover:bg-cardamom-500 text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-sm"
          >
            <Send className="w-4 h-4" /> I Have Paid — Send Order to Kitchen
          </button>
          <button
            onClick={onClose}
            className="text-xs text-muted hover:text-charcoal-900 transition-colors py-1"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
