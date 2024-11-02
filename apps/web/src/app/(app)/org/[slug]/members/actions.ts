'use server'

import { getCurrentOrg } from "@/auth/auth"
import { removeMember } from "@/http/remove-member"
import { revalidateTag } from "next/cache"


export async function removeMemberActions(memberId: string) {
  const  currentOrg = getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}