import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, LogOut } from "lucide-react";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenu,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export function ProfileButton() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-3 outline-none">
				<div className="flex flex-col items-end">
					<span className="text-sm font-medium ">Paula Silva</span>
					<span className="text-xs text-muted-foreground">
						paulasilva@gmail.com
					</span>
				</div>
				<Avatar>
					<AvatarImage
						src="https://github.com/ludiemert.png"
						className="size-8 rounded-full object-cover"
					/>
					<AvatarFallback>PS</AvatarFallback>
				</Avatar>
				<ChevronDown className="size-4 text-muted-foreground" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link href="/api/auth/sign-out">
						<LogOut className="mr-2 size-4" />
						Sign out
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
