import * as React from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { signUp } from '@/integrations/auth/auth-client'
import { toast } from 'sonner'
import { Link, useNavigate } from '@tanstack/react-router'

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Your full name is required' }),
    email: z.email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    // Cast is a safe workaround for a known Zod v4 <-> @hookform/resolvers typing mismatch.
    // It doesn't affect runtime behavior and can be removed once types align.
    resolver:
      (zodResolver as unknown as (schema: unknown) => Resolver<SignUpFormValues>)(
        signUpSchema,
      ),

    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const navigate = useNavigate()
  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const { error } = await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          onSuccess() {
            reset()
            toast.success('check your email address for a confirmation email')
            navigate({ to: '/app/marketplace' })
          },
        },
      )
      if (error) {
        console.error(error)
        toast.error(error.message)
        return
      }
    } catch (error) {
      console.error('Signup failed:', error)
      toast.error('sign up failed')
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register('password')} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </Button>
                <Button variant="outline" disabled type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
