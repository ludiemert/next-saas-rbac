//import { getCurrentOrg } from '../../../../../auth/auth';
import { getCurrentOrg } from '@/auth/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getMembers } from '@/http/get-members';
import Image from 'next/image';


export  async function MemberList() {
  const currentOrg = getCurrentOrg()
  const { members } = await getMembers(currentOrg!)

  return (
    <div className='space-y-2'>
      <h2 className='text-lg font-semibold'> MemberList</h2>

      <div className='rounded border'>
        <Table>
          <TableBody>
            {members.map(member => {
              return (
                <TableRow key={member.id}>
                     <TableCell className='py-2.5' style={{ width: 48 }}>
                      <Avatar>
                        <AvatarFallback />
                        {member.avatarUrl && (
                          <Image />
                        )}
                      </Avatar>

                     </TableCell>
                </TableRow>
              )
           
            })}
          </TableBody>
        </Table>
      </div>
     
    </div>
  );
}
