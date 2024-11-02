import { api } from "./api-client";

interface GetMembersResponse {
  members: {
    id: string;
    userId: string;
    role: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  }[];
}

export async function getMembers(org: string, projectSlug = "default-slug") {
  const result = await api
    .get(`organizations/${org}/members?projectSlug=${projectSlug}`, {
      next: {
        tags: [`${org}/members`],
      }
    })
    .json<GetMembersResponse>();

  return result;
}
