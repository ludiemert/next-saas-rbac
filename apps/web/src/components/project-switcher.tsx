"use client";

//primeiro client component que vai usar requisicao HTTP
import { ChevronsUpDown, PlusCircle } from "lucide-react";
import {
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getProjects } from "@/http/get-projects";
import { useQuery } from "@tanstack/react-query";

export function ProjectSwitcher() {
	const { slug: orgSlug } = useParams<{
		slug: string;
	}>();
	//console.log(orgSlug);

	//new hook o react
	//fazer requisicao
	const { data, isLoading } = useQuery({
		queryKey: [orgSlug, "projects"],
		queryFn: () => getProjects(orgSlug),
		enabled: !!orgSlug,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary">
				{/*     
  {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (      /*}  

          <span className="text-muted-foreground">Select project</span>
      {/* )}   */}
				<span className="text-muted-foreground">Select project</span>

				<ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				alignOffset={-16}
				sideOffset={12}
				className="w-[200px]"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Organizations</DropdownMenuLabel>
					{/*     {organizations.map((organization) => {
            return ( */}
					<DropdownMenuItem /*key={organization.id}*/ asChild>
						<Link href={""}>
							<Avatar className="mr-2 size-4">
								{/*       {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )} */}

								<AvatarFallback />
							</Avatar>
							<span className="line-clamp-1">Project Test</span>
						</Link>
					</DropdownMenuItem>
					{/*       );
          })}     */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="">
						<PlusCircle className="mr-2 size-4" />
						Create new 😎
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
