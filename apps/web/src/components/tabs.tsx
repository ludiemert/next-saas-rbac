import { Button } from "./ui/button";
import { getCurrentOrg } from "@/auth/auth";
import { NavLink } from "./nav-link";

export function Tabs() {
	const currentOrg = getCurrentOrg(); // Executa a função para obter o valor da organização atual

	return (
		<div className="border-b py-4">
			<nav className="mx-auto flex max-w-[1200px] items-center gap-2">
				<Button
					asChild
					variant="ghost"
					size="sm"
					className="border border-transparent  text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
				>
					<NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
				</Button>

				<Button
					asChild
					variant="ghost"
					size="sm"
					className="border border-transparent  text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
				>
					<NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
				</Button>

				<Button
					asChild
					variant="ghost"
					size="sm"
					className="border border-transparent  text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
				>
					<NavLink href={`/org/${currentOrg}/settings`}>
						Settings & Billing
					</NavLink>
				</Button>
			</nav>
		</div>
	);
}
