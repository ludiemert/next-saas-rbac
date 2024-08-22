'use server'

import ky from 'ky'

const api = ky.create({
  prefixUrl: 'http://localhost:3333',
})

export async function signInWithEmailAndPassword(data: FormData) {
  // Extraindo os valores do FormData
  const formData = Object.fromEntries(data.entries())
  const { email, password } = formData

  console.log(formData)

  try {
    const result = await api
      .post('sessions/password', {
        json: {
          email,
          password,
        },
      })
      .json()

    console.log(result)
  } catch (error) {
    console.error('Error during sign in:', error)
  }
}
