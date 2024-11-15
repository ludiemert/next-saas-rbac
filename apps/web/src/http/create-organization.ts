import { api } from './api-client'

interface CreateOrganizationRequest {
  __typename: 'Organization' // Adicionado manualmente
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
type CreateOrganizationResponse = void

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  await api.post('organizations', {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
