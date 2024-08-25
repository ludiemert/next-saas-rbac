'use client'

import githubIMG from '@/assets/github.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { AlertTriangle, Loader2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import React from 'react'
import { requestFormReset } from 'react-dom'

import { signInWithEmailAndPassword } from './action'
import { type FormEvent, useState, useTransition } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function SignInForm() {
  const [isPending, startTransition] = useTransition()

  const [{ success, message, errors }, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>({
    success: false,
    message: null,
    errors: null,
  })

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await signInWithEmailAndPassword(data)

      // Adiciona verificação para garantir que o estado esteja conforme o tipo esperado
      setFormState({
        success: state.success,
        message: state.message,
        errors: state.errors || null,
      })
    })

    //reset form automatic
    requestFormReset(form)
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!!!!!😯😯😯😯</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />

        {errors?.email && (
          <p className="text-xs font-medium text-red-600 dark:text-red-500">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        {errors?.password && (
          <p className="text-xs font-medium text-red-600 dark:text-red-500">
            {errors.password[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forget your password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up"> Create new account😎</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIMG} className="mr-2 size-4 dark:invert" alt="" />
        Sign IN🥰 with GitHub
      </Button>
    </form>
  )
}
