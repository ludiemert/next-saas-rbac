import { HTTPError } from 'ky'
import { z } from 'zod'

import { SignUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name 😉😉😉....',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address...🧐🧐🧐' }),
    password: z.string().min(6, {
      message: 'Please, should have at least 6 characters...🤓🤓🤓🤓',
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match...',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors, error: null }
  }

  const { name, email, password } = result.data

  try {
    await SignUp({
      name,
      email,
      password,
    })

    // Retorna sucesso ao final da operação bem-sucedida
    return {
      success: true, // Aqui indicamos que o cadastro foi um sucesso
      message: 'Account created successfully!',
      errors: null,
      error: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null, error: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes....',
      errors: null,
      error: null,
    }
  }
}
