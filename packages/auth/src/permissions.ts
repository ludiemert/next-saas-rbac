import { AbilityBuilder } from '@casl/ability'
//import { AppAbility } from '@saas/auth';
import { User } from './models/user'
import { AppAbility } from '.'
import { Role } from './roles'

type PermissionsRole = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionsRole> = {
  //ADMIN => pode gerenciar tudo
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },

  // invite = convidar     manege =  gerenciar    BILLING = FATURAMENTO
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },

  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
