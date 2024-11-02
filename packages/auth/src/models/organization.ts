import { z } from 'zod';

export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),  // Adiciona o campo name
  domain: z.string().optional().nullable(),  // Permite que domain seja opcional e nulo
  shouldAttachUsersByDomain: z.boolean().optional()  // Adiciona o campo shouldAttachUsersByDomain como opcional, se aplicável
});

export type Organization = z.infer<typeof organizationSchema>;
