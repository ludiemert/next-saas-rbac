import type { Role } from '@saas/auth'

import { api } from './api-client'

interface GetInviteResponse {
  invite: {
    organization: {
      name: string
    }
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return result
}
