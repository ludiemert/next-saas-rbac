import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

import githubIMG from '@/assets/github.svg'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/navigation'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    }
  )

  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">E-mail</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>

      <Button type="submit" className="w-full">
        Create your account
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in"> Already registered Sign in🥰</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIMG} className="mr-2 size-4 dark:invert" alt="" />
        Sign UP😎 with GitHub
      </Button>
    </form>
  )
}
