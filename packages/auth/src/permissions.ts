import { AbilityBuilder } from '@casl/ability';
//import { AppAbility } from '@saas/auth';
import { User } from './models/user';
import { AppAbility } from '.';


type Role = 'ADMIN' | 'MEMBER'

type PermissionsRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsRole> = {
  ADMIN(_, { can}) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    can('invite', 'User')
  },
}