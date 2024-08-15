import { defineAbilityFor, projectSchema } from '@saas/auth'

//const ability = defineAbilityFor({ role: 'ADMIN'})
const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const project = projectSchema.parse({ id: 'project-id', ownerId: 'user2-id' })

//const userCanInviteSomeoneElse = ability.can('invite', 'User')
//const userCanDeleteOtherUsers = ability.can('delete', 'User')
//const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

//console.log(userCanInviteSomeoneElse)
//console.log(userCanDeleteOtherUsers)
//console.log(userCannotDeleteOtherUsers)
console.log(ability.can('get', 'Billing'))
console.log(ability.can('create', 'Invite'))
console.log(ability.can('delete', project))
