# Eunique — Checkout Flow with UPI Payment

## Current State
- Single-page site with hero, countdown drop section, brand statement, footer
- Size selector (S/M/L) exists visually but the 'SECURE YOURS' button has no onClick handler — clicking it does nothing
- No checkout page exists

## Requested Changes (Diff)

### Add
- Checkout page/view (shown when user clicks 'SECURE YOURS')
- Order summary section: product image, name ('Art Is Alive Tee — Drop 001'), selected size, price (₹999), quantity
- UPI payment section: display UPI ID (uniqueclothing.in@gmail.com), copyable UPI ID, QR code placeholder or UPI badge, instructions ('Pay via any UPI app — GPay, PhonePe, Paytm, etc.')
- Order confirmation state after payment
- Back button to return to main page

### Modify
- 'SECURE YOURS' CTA button: add onClick to open/navigate to checkout view with the selected size pre-filled
- Pass selected size into checkout so it appears in the order summary

### Remove
- Nothing

## Implementation Plan
1. Add a `checkoutOpen` state in App and a `CheckoutPage` component
2. When 'SECURE YOURS' is clicked, set checkoutOpen=true and pass selectedSize
3. CheckoutPage shows:
   - Header with back arrow + EUNIQUE wordmark
   - Left: order summary (product image, name, size, price ₹999)
   - Right: UPI payment section with UPI ID display, copy button, supported app logos text, and payment instructions
   - 'I HAVE PAID' confirmation button that shows a thank-you state
4. Animate in/out with framer-motion
