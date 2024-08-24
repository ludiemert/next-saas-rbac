'use server'

import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'

const sigInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address...🧐🧐🧐' }),
  password: z
    .string()
    .min(1, { message: 'Please, provide your password....🤓🤓🤓🤓' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = sigInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    //console.log(previousState)

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  //promessa que vai resolver depois de 2seg
  //await new Promise((resolve) => setTimeout(resolve, 2000))
  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    console.log(token)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, error: null }
    }
    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes....',
      error: null,
    }
  }

  return { success: true, message: null, error: null }
}