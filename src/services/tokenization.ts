import { Api } from './api'
import type {
  CreateStockInput,
  UpdateStockInput,
  MintStockInput,
  BurnStockInput,
  Stock,
  Transaction,
  PlatformStats,
} from '@/types/tokenization'

const BASE_PATH = '/api/v2/tokenization'

export const tokenizationService = {
  // Admin endpoints
  async createStock(data: CreateStockInput): Promise<Stock> {
    return Api.post(`${BASE_PATH}/admin/stocks`, data)
  },

  async updateStock(symbol: string, data: UpdateStockInput): Promise<Stock> {
    return Api.put(`${BASE_PATH}/admin/stocks/${symbol}`, data)
  },

  async mintStock(data: MintStockInput): Promise<Transaction> {
    return Api.post(`${BASE_PATH}/admin/stocks/mint`, data)
  },

  async burnStock(data: BurnStockInput): Promise<Transaction> {
    return Api.post(`${BASE_PATH}/admin/stocks/burn`, data)
  },

  async getAdminTransactions(params?: {
    symbol?: string
    type?: string
    status?: string
    limit?: number
  }): Promise<Transaction[]> {
    return Api.get(`${BASE_PATH}/admin/transactions`, { params })
  },

  async getPlatformStats(): Promise<PlatformStats> {
    return Api.get(`${BASE_PATH}/admin/stats`)
  },
}
