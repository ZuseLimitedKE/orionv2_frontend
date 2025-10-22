import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { AdminTransactions } from '@/components/admin/admin-transactions'
import { CreateStockForm } from '@/components/forms/create-stock-form'
import { MintStockForm } from '@/components/forms/mint-stock-form'
import { BurnStockForm } from '@/components/forms/burn-stock-form'
import { 
  LayoutDashboard, 
  PlusCircle, 
  Coins, 
  Flame,
  Receipt
} from 'lucide-react'

export const Route = createFileRoute('/app/admin')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage stock tokens, mint, burn, and view platform statistics
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="dashboard" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </TabsTrigger>
          <TabsTrigger value="mint" className="gap-2">
            <Coins className="h-4 w-4" />
            <span className="hidden sm:inline">Mint</span>
          </TabsTrigger>
          <TabsTrigger value="burn" className="gap-2">
            <Flame className="h-4 w-4" />
            <span className="hidden sm:inline">Burn</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <div className="mx-auto max-w-3xl">
            <CreateStockForm />
          </div>
        </TabsContent>

        <TabsContent value="mint" className="mt-6">
          <div className="mx-auto max-w-3xl">
            <MintStockForm />
          </div>
        </TabsContent>

        <TabsContent value="burn" className="mt-6">
          <div className="mx-auto max-w-3xl">
            <BurnStockForm />
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <AdminTransactions />
        </TabsContent>
      </Tabs>
    </div>
  )
}
