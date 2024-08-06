//acoes que podem acontecer no users

import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'), 
  ]),
  z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubject>