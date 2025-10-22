import { z } from 'zod'

// Enums
export enum StockStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELISTED = 'DELISTED',
}

export enum TransactionType {
  MINT = 'MINT',
  BURN = 'BURN',
  TRANSFER_TO_USER = 'TRANSFER_TO_USER',
  TRANSFER_FROM_USER = 'TRANSFER_FROM_USER',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Zod Schemas for Forms
export const createStockFormSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol must be 10 characters or less'),
  name: z.string().min(1, 'Name is required'),
  initialSupply: z.string().min(1, 'Initial supply is required'),
  pricePerToken: z.string().min(1, 'Price per token is required'),
//   todayPrice: z.string(),
//   totalShares: z.string(),
  custodyVerificationUrl: z.string().optional(),
})

export const mintStockFormSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol must be 10 characters or less'),
  amount: z.string().min(1, 'Amount is required'),
  custodyVerificationUrl: z.string().optional(),
  notes: z.string().optional(),
})

export const burnStockFormSchema = z.object({
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol must be 10 characters or less'),
  amount: z.string().min(1, 'Amount is required'),
  reason: z.string().optional(),
})

// Keep the original schemas for API types
export const createStockSchema = z.object({
  symbol: z.string().toUpperCase(),
  name: z.string(),
  initialSupply: z.number().positive(),
  pricePerToken: z.number().positive(),
  custodyVerificationUrl: z.string().optional(),
})

export const mintStockSchema = z.object({
  symbol: z.string().toUpperCase(),
  amount: z.number().positive(),
  custodyVerificationUrl: z.string().optional(),
  notes: z.string().optional(),
})

export const burnStockSchema = z.object({
  symbol: z.string().toUpperCase(),
  amount: z.number().positive(),
  reason: z.string().optional(),
})

// TypeScript Types
export type CreateStockFormInput = z.infer<typeof createStockFormSchema>
export type MintStockFormInput = z.infer<typeof mintStockFormSchema>
export type BurnStockFormInput = z.infer<typeof burnStockFormSchema>

export type CreateStockInput = z.infer<typeof createStockSchema>
export type UpdateStockInput = Partial<CreateStockInput> & { status?: StockStatus }
export type MintStockInput = z.infer<typeof mintStockSchema>
export type BurnStockInput = z.infer<typeof burnStockSchema>

export interface Stock {
  _id?: string
  symbol: string
  name: string
  tokenId: string
  totalSupply: number
  circulatingSupply: number
  poolBalance: number
  pricePerToken: number
  custodyVerificationUrl?: string
  status: StockStatus
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  _id?: string
  stockId: string
  symbol: string
  type: TransactionType
  amount: number
  pricePerToken?: number
  totalValue?: number
  publicKey?: string
  hederaTxHash?: string
  status: TransactionStatus
  metadata?: Record<string, any>
  errorMessage?: string
  createdAt: string
  completedAt?: string
}

export interface PlatformStats {
  totalStocks: number
  totalHolders: number
  totalValueLocked: number
  totalPoolValue: number
  stocks: Array<{
    symbol: string
    name: string
    totalSupply: number
    circulatingSupply: number
    poolBalance: number
    pricePerToken: number
    status: StockStatus
  }>
}
