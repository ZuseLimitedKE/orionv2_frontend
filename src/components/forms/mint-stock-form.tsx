import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  mintStockFormSchema,
  type MintStockFormInput,
  type MintStockInput,
} from '@/types/tokenization'
import { tokenizationService } from '@/services/tokenization'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react'

export function MintStockForm() {
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MintStockFormInput>({
    resolver: zodResolver(mintStockFormSchema),
  })

  const mutation = useMutation({
    mutationFn: tokenizationService.mintStock,
    onSuccess: (data) => {
      toast.success('Tokens minted successfully!', {
        description: `Minted ${data.amount} tokens for ${data.symbol}`,
      })
      queryClient.invalidateQueries({ queryKey: ['platform-stats'] })
      queryClient.invalidateQueries({ queryKey: ['admin-transactions'] })
      reset()
    },
    onError: (error: any) => {
      toast.error('Failed to mint tokens', {
        description: error?.message || 'An error occurred while minting tokens',
      })
    },
  })

  const onSubmit = (data: MintStockFormInput) => {
    // Transform form data to API format
    const apiData: MintStockInput = {
      symbol: data.symbol.toUpperCase(),
      amount: Number(data.amount),
      custodyVerificationUrl: data.custodyVerificationUrl || undefined,
      notes: data.notes || undefined,
    }
    mutation.mutate(apiData)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plus className="h-6 w-6 text-green-600" />
          Mint Stock Tokens
        </CardTitle>
        <CardDescription>
          Increase the supply of tokens when purchasing additional stocks
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
                Amount to Mint <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="1"
                placeholder="e.g., 100"
                {...register('amount')}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
          </div>

          {/* Custody Verification URL */}
          <div className="space-y-2">
            <Label htmlFor="custodyVerificationUrl">
              Custody Verification URL (Optional)
            </Label>
            <Input
              id="custodyVerificationUrl"
              type="url"
              placeholder="https://..."
              {...register('custodyVerificationUrl')}
              className={errors.custodyVerificationUrl ? 'border-red-500' : ''}
            />
            {errors.custodyVerificationUrl && (
              <p className="text-sm text-red-500">
                {errors.custodyVerificationUrl.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this mint operation..."
              rows={3}
              {...register('notes')}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting Tokens...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Mint Tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
