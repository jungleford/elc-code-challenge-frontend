# ELC Engineer Code Challenge - Frontend

## Prerequisites

- Node.js 18+
- npm  or yarn or pnpm
- IDE: IntelliJ IDEA or Visual Studio Code
- Prepare the backend. See https://github.com/jungleford/elc-code-challenge-backend

## Startup

### Development Environment

Launch the backend from your IDE first. By default the backend is running on http://localhost:8888.

Run the following command to start the development environment:
```bash
npm install
npm run dev
```

Then access http://localhost:5173 in your browser.

If your backend is running on a different host, please modify the related setting in `src/config/globals.ts`:
```typescript
    API_PREFIX: 'http://localhost:8888',
```

## Pages

1. Product list page: http://localhost:5173/products

   User can select one or more products and add to cart, but this step limits to select only one kind of product in the store.

2. Cart page: http://localhost:5173/cart

   Once the user clicks "Add to cart", the browser will redirect to the cart page. The user can view the cart and remove items or checkout.

3. Order list page: http://localhost:5173/orders

   User can view the order list.

4. Order details page: http://localhost:5173/order/{id}

   After checkout, the user will be redirected to the order page, where they can view the order details.
