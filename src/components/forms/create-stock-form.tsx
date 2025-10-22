import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createStockFormSchema,
  type CreateStockFormInput,
  type CreateStockInput,
} from '@/types/tokenization'
import { tokenizationService } from '@/services/tokenization'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function CreateStockForm() {
  const queryClient = useQueryClient()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStockFormInput>({
    resolver: zodResolver(createStockFormSchema),
  })

  const mutation = useMutation({
    mutationFn: tokenizationService.createStock,
    onSuccess: (data) => {
      toast.success('Stock created successfully!', {
        description: `${data.symbol} - ${data.name} has been created with token ID: ${data.tokenId}`,
      })
      queryClient.invalidateQueries({ queryKey: ['platform-stats'] })
      reset()
    },
    onError: (error: any) => {
      toast.error('Failed to create stock', {
        description: error?.message || 'An error occurred while creating the stock',
      })
    },
  })

  const onSubmit = (data: CreateStockFormInput) => {
    // Transform form data to API format
    const apiData: CreateStockInput = {
      symbol: data.symbol.toUpperCase(),
      name: data.name,
      initialSupply: Number(data.initialSupply),
      pricePerToken: Number(data.pricePerToken),
      custodyVerificationUrl: data.custodyVerificationUrl || undefined,
    }
    mutation.mutate(apiData)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Stock Token</CardTitle>
        <CardDescription>
          Create a new tokenized stock on the Hedera network
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

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Stock Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Apple Inc."
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Initial Supply */}
            <div className="space-y-2">
              <Label htmlFor="initialSupply">
                Initial Supply <span className="text-red-500">*</span>
              </Label>
              <Input
                id="initialSupply"
                type="number"
                step="1"
                placeholder="e.g., 1000"
                {...register('initialSupply')}
                className={errors.initialSupply ? 'border-red-500' : ''}
              />
              {errors.initialSupply && (
                <p className="text-sm text-red-500">
                  {errors.initialSupply.message}
                </p>
              )}
            </div>

            {/* Price Per Token */}
            <div className="space-y-2">
              <Label htmlFor="pricePerToken">
                Price Per Token (KES) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pricePerToken"
                type="number"
                step="0.01"
                placeholder="e.g., 150.50"
                {...register('pricePerToken')}
                className={errors.pricePerToken ? 'border-red-500' : ''}
              />
              {errors.pricePerToken && (
                <p className="text-sm text-red-500">
                  {errors.pricePerToken.message}
                </p>
              )}
            </div>
          </div>
{/* Today Price */}
            {/* <div className="space-y-2">
                <Label htmlFor="todayPrice">Today's Price (Optional)</Label>
                <Input
                    id="todayPrice"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 150.50"
                    {...register('todayPrice')}
                    className={errors.todayPrice ? 'border-red-500' : ''}
                />
                {errors.todayPrice && (
                    <p className="text-sm text-red-500">
                        {errors.todayPrice.message}
                    </p>
                )}
            </div> */}

          {/* Total Shares */}
            {/* <div className="space-y-2">
                <Label htmlFor="totalShares">Total Shares (Optional)</Label>
                <Input

                    id="totalShares"
                    type="number"
                    step="1"
                    placeholder="e.g., 1000000"
                    {...register('totalShares')}
                    className={errors.totalShares ? 'border-red-500' : ''}
                />
                {errors.totalShares && (
                    <p className="text-sm text-red-500">
                        {errors.totalShares.message}
                    </p>
                )}
            </div> */}
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
            <p className="text-xs text-muted-foreground">
              Provide a URL to verify proof of custody for the underlying stock
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Stock...
              </>
            ) : (
              'Create Stock Token'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
