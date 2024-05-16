import { z } from 'zod'
import { organizationSchema } from '../models/organization'

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),  
    z.literal('delete'),
    z.literal('transfer_ownership'), //transferir a organizacao para outro usuario
  ]),
 
  z.union([ z.literal('Organization'), organizationSchema])
])

export type OrganizationSubject = z.infer<typeof organizationSubject>