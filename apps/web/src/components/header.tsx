import Image from "next/image";

import iconIMG from "@/assets/icon.svg";
import { ProfileButton } from "./profile-button";
import { Slash } from "lucide-react";
import { OrganizationSwitcher } from "./organization-switcher";
import { permissions } from "../../../../packages/auth/src/permissions";
import { ability } from "@/auth/auth";
import { Separator } from "./ui/separator";
import { ThemeSwitcher } from "./theme/theme-swticher";
import { ProjectSwitcher } from "./project-switcher";
import { PendingInvites } from "./pending-invites";

export async function Header() {
	//permissoes do usuario
	const permissions = await ability();

	return (
		<div className="mx-auto max-w-[1200px]  flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Image src={iconIMG} className="size-8 dark:invert" alt="Icon Dog" />

				<Slash className="size-3 -rotate-[24deg] text-border" />

				<OrganizationSwitcher />

				{permissions?.can("get", "Project") && (
					<>
						<Slash className="size-3 -rotate-[24deg] text-border" />
						<ProjectSwitcher />
					</>
				)}
			</div>

			<div className="flex items-center gap-4">
				<PendingInvites />
				<ThemeSwitcher />
				<Separator orientation="vertical" className="h-5" />
				<ProfileButton />
			</div>
		</div>
	);
}
