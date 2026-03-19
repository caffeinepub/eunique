# Eunique

## Current State
Single-page app. SHOP THE DROP button in HeroSection has no onClick. CheckoutPage/PolicyPage are modal overlays managed by state in App.

## Requested Changes (Diff)

### Add
- ShopDropPage: full-screen overlay, new tee image /assets/uploads/IMG_7866-1.PNG, product title, sizes S/M/L/XL, price 2499, SECURE YOURS CTA
- shopOpen state in App

### Modify
- HeroSection SHOP THE DROP button calls onShopDrop handler
- App renders ShopDropPage in AnimatePresence

### Remove
- Nothing

## Implementation Plan
1. Add shopOpen state and handleShopDrop to App
2. Create ShopDropPage component
3. Wire HeroSection button to onShopDrop prop
