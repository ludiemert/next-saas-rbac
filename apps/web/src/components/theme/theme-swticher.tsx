import { Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ThmeSwitcher() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="size-4" />
					<span className="sr-only">Toggle theme</span>
				</Button>
				<DropdownMenuContent align="end">
					<DropdownMenuItem></DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
