import { AbilityBuilder } from '@casl/ability';
//import { AppAbility } from '@saas/auth';
import { User } from './models/user';
import { AppAbility } from '.';
import { Role } from './roles';


type PermissionsRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsRole> = {
  ADMIN(_, { can}) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
   // can('invite', 'User') //invite = convidar
   // can('manage', 'Project') //manege =  gerenciar

   can(['create', 'get'], 'Project')
   can(['update', 'delete'], 'Project', { ownerId: {$eq: user.id}})
  },
  BILLING() {  // BILLING = FATURAMENTO
    
   },
}