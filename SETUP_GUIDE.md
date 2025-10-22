# 🚀 Quick Setup Guide - Admin Panel

Follow these steps to get the admin panel running:

## 1. Backend Setup

Ensure your backend is running:

```bash
cd orion_v2_backend
pnpm install
pnpm dev
```

The backend should be running on `http://localhost:4000` (or your configured port).

## 2. Frontend Setup

### Install Dependencies
```bash
cd orionv2_frontend
pnpm install
```

### Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and set your backend URL
# VITE_BACKEND_DEV_URL=http://localhost:4000
```

### Start Development Server
```bash
pnpm dev
```

The frontend will start on `http://localhost:3000`.

## 3. Access Admin Panel

1. Open your browser to `http://localhost:3000`
2. Log in (if auth is enabled)
3. Click "Admin" in the sidebar
4. You should see the admin dashboard!

## 4. Test the Features

### Dashboard Tab
- View platform statistics
- See all stocks in card format
- Watch real-time updates (refreshes every 30 seconds)

### Create Tab
- Fill in the form:
  - Symbol: AAPL
  - Name: Apple Inc.
  - Initial Supply: 1000
  - Price: 150.50
  - Custody URL: https://example.com/proof
- Click "Create Stock Token"
- Watch for success toast

### Mint Tab
- Enter stock symbol (e.g., AAPL)
- Enter amount to mint
- Optional: Add custody URL and notes
- Click "Mint Tokens"

### Burn Tab
- Enter stock symbol
- Enter amount to burn
- Optional: Add reason
- Click "Burn Tokens"

### Transactions Tab
- View all admin transactions
- Filter by symbol, type, or status
- Click transaction hash to view on HashScan

## 5. Verify Everything Works

### Check Dashboard Stats
After creating a stock, you should see:
- Total Stocks: 1
- A new stock card with your data

### Check Transactions
After minting/burning:
- Transaction should appear in Transactions tab
- Should have a Hedera transaction hash
- Status should change from PENDING → COMPLETED

## 6. Common Issues

### Backend Not Connected
**Error**: "Failed to load dashboard data"

**Solution**:
- Check backend is running
- Verify VITE_BACKEND_DEV_URL in .env
- Check browser console for CORS errors

### Route Type Error
**Error**: Type error in admin.tsx

**Solution**:
- This resolves automatically when dev server runs
- TanStack Router generates types on start
- If persists, try: `pnpm dev` again

### Form Not Submitting
**Error**: Validation errors

**Solution**:
- Check all required fields are filled
- Ensure numbers are valid (positive, >= minimums)
- URLs must be complete (https://)

### No Toast Notifications
**Issue**: Success/error messages not showing

**Solution**:
- Check that Sonner is configured in your app
- Verify `<Toaster />` is in your root layout

## 7. Next Steps

### For Development
- Add more stocks to test
- Try filtering in transactions
- Test responsive design on mobile
- Monitor React Query DevTools

### For Production
- Add authentication/authorization
- Set up error monitoring (Sentry)
- Configure production API URL
- Enable analytics
- Add rate limiting

## 8. File Structure Reference

```
src/
├── components/
│   ├── admin/
│   │   ├── admin-dashboard.tsx       ✅ Created
│   │   └── admin-transactions.tsx    ✅ Created
│   ├── forms/
│   │   ├── create-stock-form.tsx     ✅ Created
│   │   ├── mint-stock-form.tsx       ✅ Created
│   │   └── burn-stock-form.tsx       ✅ Created
│   ├── ui/
│   │   └── textarea.tsx              ✅ Created
│   └── app-sidebar.tsx               ✅ Updated
├── services/
│   └── tokenization.ts               ✅ Created
├── types/
│   └── tokenization.ts               ✅ Created
└── routes/
    └── app/
        └── admin.tsx                 ✅ Created
```

## 9. API Endpoints Reference

All endpoints are prefixed with `/api/v2/tokenization`

### Admin Endpoints
```
POST   /admin/stocks              Create new stock
PUT    /admin/stocks/:symbol      Update stock
POST   /admin/stocks/mint         Mint tokens
POST   /admin/stocks/burn         Burn tokens
GET    /admin/transactions        Get transactions (with filters)
GET    /admin/stats               Get platform stats
```

## 10. Tech Stack Summary

- **React 19**: Latest React with modern hooks
- **TypeScript**: Full type safety
- **TanStack Router**: File-based routing
- **TanStack Query**: Data fetching & caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **shadcn/ui**: Beautiful UI components
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client
- **Lucide**: Icon library

## 11. Support & Resources

- **Backend Code**: `orion_v2_backend/src/routes/tokenization.ts`
- **API Docs**: Check backend README
- **Component Docs**: See ADMIN_README.md
- **Implementation**: See ADMIN_IMPLEMENTATION.md

---

**Happy Building! 🎉**

If you encounter any issues, check the console for detailed error messages.
