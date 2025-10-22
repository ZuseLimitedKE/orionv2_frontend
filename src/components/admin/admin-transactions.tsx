import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tokenizationService } from '@/services/tokenization'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TransactionStatus, TransactionType } from '@/types/tokenization'
import { ExternalLink, Filter } from 'lucide-react'

export function AdminTransactions() {
  const [filters, setFilters] = useState<{
    symbol?: string
    type?: string
    status?: string
  }>({})

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['admin-transactions', filters],
    queryFn: () => tokenizationService.getAdminTransactions(filters),
    refetchInterval: 15000, // Refetch every 15 seconds
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US').format(num)

  const getStatusBadge = (status: TransactionStatus) => {
    const variants: Record<TransactionStatus, 'default' | 'secondary' | 'destructive'> = {
      [TransactionStatus.COMPLETED]: 'default',
      [TransactionStatus.PENDING]: 'secondary',
      [TransactionStatus.FAILED]: 'destructive',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getTypeBadge = (type: TransactionType) => {
    const colors: Record<TransactionType, string> = {
      [TransactionType.MINT]: 'bg-green-100 text-green-800 border-green-200',
      [TransactionType.BURN]: 'bg-red-100 text-red-800 border-red-200',
      [TransactionType.TRANSFER_TO_USER]: 'bg-blue-100 text-blue-800 border-blue-200',
      [TransactionType.TRANSFER_FROM_USER]: 'bg-purple-100 text-purple-800 border-purple-200',
    }
    return (
      <Badge variant="outline" className={colors[type]}>
        {type.replace(/_/g, ' ')}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Admin Transactions
        </CardTitle>
        <CardDescription>
          View and filter all administrative transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="symbol-filter">Stock Symbol</Label>
            <Input
              id="symbol-filter"
              placeholder="e.g., AAPL"
              value={filters.symbol || ''}
              onChange={(e) =>
                setFilters({ ...filters, symbol: e.target.value || undefined })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-filter">Transaction Type</Label>
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) =>
                setFilters({ ...filters, type: value === 'all' ? undefined : value })
              }
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MINT">Mint</SelectItem>
                <SelectItem value="BURN">Burn</SelectItem>
                <SelectItem value="TRANSFER_TO_USER">Transfer to User</SelectItem>
                <SelectItem value="TRANSFER_FROM_USER">Transfer from User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value === 'all' ? undefined : value })
              }
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>TX Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : transactions && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell className="font-medium">{tx.symbol}</TableCell>
                    <TableCell>{getTypeBadge(tx.type)}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(tx.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(tx.createdAt)}
                    </TableCell>
                    <TableCell>
                      {tx.hederaTxHash ? (
                        <a
                          href={`https://hashscan.io/testnet/transaction/${tx.hederaTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {transactions && transactions.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
