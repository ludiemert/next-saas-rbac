import { ChevronsUpDown, PlusCircle } from "lucide-react";
import {
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSubContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export function OrganizationSwitcher() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary">
				<span className="text-muted-foreground">Select organization</span>
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
					<DropdownMenuItem>
						<Avatar className="mr-2 size-4">
							<AvatarImage src="https://github.com/rocketseat.png" />
							<AvatarFallback />
						</Avatar>
						<span className="line-clamp-1">Rocketseat</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/create-organization">
						<PlusCircle className="mr-2 size-4" />
						Create new 😎
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
