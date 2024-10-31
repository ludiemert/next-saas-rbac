import { getCurrentOrg } from "@/auth/auth"
import { getMembers } from "@/http/get-member"

export async function MemberList() {
  const currentOrg = getCurrentOrg()
  const members = await getMembers(currentOrg!)

  return (
  <div className="space-y-2">
    MemberList
  </div>)
}