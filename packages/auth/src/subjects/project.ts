//acoes que podem acontecer no projeto

import { z } from 'zod'

export const ProjectSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'), 
    z.literal('update'),
    z.literal('delete'), 
  ]),
  z.literal('Project'),
])

export type ProjectSubject = z.infer<typeof ProjectSubject>