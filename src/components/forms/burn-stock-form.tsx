import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  burnStockFormSchema,
  type BurnStockFormInput,
  type BurnStockInput,
} from '@/types/tokenization'
import { tokenizationService } from '@/services/tokenization'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Flame } from 'lucide-react'

export function BurnStockForm() {
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BurnStockFormInput>({
    resolver: zodResolver(burnStockFormSchema),
  })

  const mutation = useMutation({
    mutationFn: tokenizationService.burnStock,
    onSuccess: (data) => {
      toast.success('Tokens burned successfully!', {
        description: `Burned ${data.amount} tokens for ${data.symbol}`,
      })
      queryClient.invalidateQueries({ queryKey: ['platform-stats'] })
      queryClient.invalidateQueries({ queryKey: ['admin-transactions'] })
      reset()
    },
    onError: (error: any) => {
      toast.error('Failed to burn tokens', {
        description: error?.message || 'An error occurred while burning tokens',
      })
    },
  })

  const onSubmit = (data: BurnStockFormInput) => {
    // Transform form data to API format
    const apiData: BurnStockInput = {
      symbol: data.symbol.toUpperCase(),
      amount: Number(data.amount),
      reason: data.reason || undefined,
    }
    mutation.mutate(apiData)
  }

  return (
    <Card className="w-full border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Flame className="h-6 w-6 text-red-600" />
          Burn Stock Tokens
        </CardTitle>
        <CardDescription>
          Decrease the supply of tokens when selling underlying stocks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Symbol */}
            <div className="space-y-2">
              <Label htmlFor="symbol">
                Stock Symbol <span className="text-red-500">*</span>
              </Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                {...register('symbol')}
                className={errors.symbol ? 'border-red-500' : ''}
              />
              {errors.symbol && (
                <p className="text-sm text-red-500">{errors.symbol.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount to Burn <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="1"
                placeholder="e.g., 50"
                {...register('amount')}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Explain the reason for burning these tokens..."
              rows={3}
              {...register('reason')}
            />
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Burning tokens is irreversible. This will permanently
              decrease the total supply of the stock token.
            </p>
          </div>

          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Burning Tokens...
              </>
            ) : (
              <>
                <Flame className="mr-2 h-4 w-4" />
                Burn Tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
