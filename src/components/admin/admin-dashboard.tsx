import { useQuery } from '@tanstack/react-query'
import { tokenizationService } from '@/services/tokenization'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { StockStatus } from '@/types/tokenization'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Coins,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: tokenizationService.getPlatformStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">Failed to load dashboard data</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US').format(num)

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStocks || 0}</div>
            <p className="text-xs text-muted-foreground">
              Listed on platform
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Holders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalHolders || 0}</div>
            <p className="text-xs text-muted-foreground">
              Unique token holders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value Locked</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalValueLocked || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              In circulation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pool Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalPoolValue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available to trade
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stocks List */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Stock Tokens</h2>
          <p className="text-muted-foreground">
            All tokenized stocks on the platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats?.stocks.map((stock) => (
            <Card key={stock.symbol} className="overflow-hidden">
              <CardHeader className="border-b bg-muted/50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <Badge
                    variant={
                      stock.status === StockStatus.ACTIVE
                        ? 'default'
                        : stock.status === StockStatus.SUSPENDED
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {stock.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Price
                    </span>
                    <div className="flex items-center gap-1">
                      <div className='font-bold'>KES</div>
                      <span className="text-lg font-bold">
                        {stock.pricePerToken.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Total Supply */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Supply
                    </span>
                    <span className="font-medium">
                      {formatNumber(stock.totalSupply)}
                    </span>
                  </div>

                  {/* Circulating Supply */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Circulating
                    </span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                      <span className="font-medium text-green-600">
                        {formatNumber(stock.circulatingSupply)}
                      </span>
                    </div>
                  </div>

                  {/* Pool Balance */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Pool Balance
                    </span>
                    <div className="flex items-center gap-1">
                      <ArrowDownRight className="h-3 w-3 text-blue-600" />
                      <span className="font-medium text-blue-600">
                        {formatNumber(stock.poolBalance)}
                      </span>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div className="rounded-lg border bg-muted/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Value</span>
                      <span className="text-lg font-bold">
                        {formatCurrency(
                          stock.circulatingSupply * stock.pricePerToken
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {stats?.stocks.length === 0 && (
          <Card className="flex h-[200px] items-center justify-center">
            <CardContent>
              <p className="text-center text-muted-foreground">
                No stocks created yet. Create your first stock token above.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[120px]" />
              <Skeleton className="mt-2 h-3 w-[80px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Skeleton className="mb-4 h-8 w-[200px]" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
