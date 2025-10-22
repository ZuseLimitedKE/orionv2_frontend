# Admin Panel - Stock Tokenization Frontend

This is the admin section of the Orion V2 frontend for managing tokenized stocks on the Hedera network.

## Features

### 📊 Dashboard
- **Platform Statistics**: View real-time metrics including:
  - Total number of listed stocks
  - Total unique token holders
  - Total value locked in circulation
  - Total pool balance available for trading
  
- **Stock Cards**: Beautiful card layout showing:
  - Stock symbol and name
  - Current price per token
  - Total supply
  - Circulating supply (in user wallets)
  - Pool balance (available for purchase)
  - Total market value
  - Status badge (Active/Suspended/Delisted)

### ➕ Create Stock
Create new tokenized stocks on the Hedera network with:
- Stock symbol (automatically converted to uppercase)
- Stock name
- Initial supply
- Price per token
- Optional custody verification URL

### 🪙 Mint Tokens
Increase the supply of existing stocks:
- Select stock by symbol
- Specify amount to mint
- Optional custody verification URL
- Add notes for record-keeping

### 🔥 Burn Tokens
Decrease the supply of stocks:
- Select stock by symbol
- Specify amount to burn
- Provide reason for burning
- Safety warnings before execution

## Tech Stack

- **React 19** with TypeScript
- **TanStack Router** for routing
- **TanStack Query** (React Query) for data fetching and caching
- **React Hook Form** for form state management
- **Zod** for schema validation
- **shadcn/ui** for beautiful, accessible UI components
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   └── admin-dashboard.tsx      # Main dashboard component
│   ├── forms/
│   │   ├── create-stock-form.tsx    # Create stock form
│   │   ├── mint-stock-form.tsx      # Mint tokens form
│   │   └── burn-stock-form.tsx      # Burn tokens form
│   └── ui/                           # shadcn/ui components
├── services/
│   ├── api.ts                        # Axios instance with interceptors
│   └── tokenization.ts               # Tokenization API client
├── types/
│   └── tokenization.ts               # TypeScript types and Zod schemas
└── routes/
    └── app/
        └── admin.tsx                 # Admin page route
```

## API Integration

The admin panel connects to the backend at:
- **Base Path**: `/api/v2/tokenization`
- **Admin Endpoints**:
  - `POST /admin/stocks` - Create stock
  - `PUT /admin/stocks/:symbol` - Update stock
  - `POST /admin/stocks/mint` - Mint tokens
  - `POST /admin/stocks/burn` - Burn tokens
  - `GET /admin/transactions` - Get transactions
  - `GET /admin/stats` - Get platform stats

## Environment Setup

Create a `.env` file in the frontend root:

```env
VITE_BACKEND_DEV_URL=http://localhost:4000
VITE_BACKEND_PROD_URL=https://your-production-api.com
```

## Running the Admin Panel

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Access the admin panel**:
   Navigate to `http://localhost:3000/app/admin`

## Form Validation

All forms use Zod schemas for validation:

### Create Stock Form
- **Symbol**: Required, 1-10 characters (auto-uppercase)
- **Name**: Required
- **Initial Supply**: Required, must be positive number ≥ 1
- **Price Per Token**: Required, must be positive number ≥ 0.01
- **Custody Verification URL**: Optional, must be valid URL

### Mint Stock Form
- **Symbol**: Required, 1-10 characters (auto-uppercase)
- **Amount**: Required, must be positive number ≥ 1
- **Custody Verification URL**: Optional, must be valid URL
- **Notes**: Optional

### Burn Stock Form
- **Symbol**: Required, 1-10 characters (auto-uppercase)
- **Amount**: Required, must be positive number ≥ 1
- **Reason**: Optional

## Features & UX

### Loading States
- Skeleton loaders while fetching data
- Button disabled states during mutations
- Loading spinners on form submissions

### Error Handling
- Toast notifications for success/error
- Inline form validation errors
- Error boundaries for unexpected failures

### Real-time Updates
- Dashboard auto-refreshes every 30 seconds
- React Query cache invalidation after mutations
- Optimistic UI updates

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Collapsible sidebar navigation
- Touch-friendly interactive elements

## Color Coding

- **Green**: Mint operations (increasing supply)
- **Red**: Burn operations (decreasing supply)
- **Blue**: General stats and pool balances
- **Muted**: Secondary information

## Status Badges

- **Active** (default variant): Stock is available for trading
- **Suspended** (secondary variant): Stock trading is paused
- **Delisted** (destructive variant): Stock is removed from platform

## Best Practices

1. **Always verify** stock symbols before minting/burning
2. **Document reasons** for burning tokens
3. **Monitor pool balance** to ensure sufficient liquidity
4. **Check custody verification URLs** before creating stocks
5. **Review transactions** regularly in the dashboard

## Future Enhancements

- [ ] Transaction history table with filters
- [ ] Stock price chart visualization
- [ ] Bulk operations support
- [ ] Export data to CSV
- [ ] Role-based access control
- [ ] Audit logs
- [ ] Email notifications
- [ ] Advanced analytics

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ using modern web technologies
