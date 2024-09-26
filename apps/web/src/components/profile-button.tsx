import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export function ProfileButton() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-3 outline-none">
				<div>
					<span className="text-sm font-medium">Paula Silva</span>
					<span className="text-xs text-zinc-400">paulasilva@gmail.com</span>
				</div>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
