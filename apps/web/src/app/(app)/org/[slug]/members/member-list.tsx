import { getCurrentOrg, ability } from '@/auth/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getMembers } from '@/http/get-members';
import { getMembership } from '@/http/get-membership';
import { getOrganization } from '@/http/get-organization';
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react';
import Image from 'next/image';
import { organizationSchema } from '@saas/auth';
import { removeMemberActions } from './actions';


export async function MemberList() {
  const currentOrg = getCurrentOrg();
  if (!currentOrg) {
    throw new Error("Organização atual não definida.");
  }

  //permissions the user
  const permissions   = await ability()

  //Membros da organizacao
  //const { members } = await getMembers(currentOrg!);
  //Membro ativo
  //const { membership } = await getMembership(currentOrg!)
  //Dono da organizacao
  //const { organization } = await getOrganization(currentOrg!)
  //fazer um promisse porque uma eh dependente da outra, requisicoes rodando ao mesmo tempo
  const [{ members },{ membership }, { organization }  ] = await Promise.all([
    getMembers(currentOrg!),
    getMembership(currentOrg!),
    getOrganization(currentOrg!)
  ])

  const authOrganization = organizationSchema.parse(organization)


  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">MemberList</h2>
      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback />
                    {member.avatarUrl && (
                      <Image
                        src={member.avatarUrl}
                        width={32}
                        height={32}
                        alt=""
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>

                <TableCell className='py-2.5'>
                  <div className='flex flex-col'>
                    <span className=' inline-flex items-center gap-8 font-medium'>
                      {member.name}
                      {member.userId === membership.userId && '  ( 🥳me🤓 )'}
                      {organization.ownerId === member.userId && (
                        <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                          <Crown className='size-3' />
                          Owner
                        </span>
                      )}                     
                      
                      </span>
                    <span className='text-xs text-muted-foreground'>{member.email}</span>
                    <span className='text-xs text-muted-foreground'>{member.role}</span>
                  </div>
                </TableCell>

                <TableCell className='py-2.5'>
                  <div className='flex items-center justify-end gap-2'>
                    {permissions?.can(
                      'transfer_ownership', 
                      authOrganization
                      ) && (<Button size="sm" variant="ghost">
                        <ArrowLeftRight className='mr-2 size-4' />                        
                        Transfer ownership</Button>)}

                    {permissions?.can('delete', 'User') && (
                      <form action={removeMemberActions.bind(null, member.id)}>
                      <Button
                       disabled={
                        member.userId === membership.userId || 
                        member.userId === organization.ownerId
                      } 
                        type='submit'
                        size='sm' 
                        variant='destructive'
                        >
                        <UserMinus className='mr-2 size-4' />
                        Remove
                      </Button>
                      </form>
                    )}
                  </div>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
