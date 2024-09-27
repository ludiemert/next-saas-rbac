import Image from "next/image";

import iconIMG from "@/assets/icon.svg";
import { ProfileButton } from "./profile-button";
import { Slash } from "lucide-react";
import { OrganizationSwitcher } from "./organization-switcher";

export function Header() {
	return (
		<div className="max-w[1200px] mx-auto flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Image src={iconIMG} className="size-8 dark:invert" alt="Icon Dog" />

				<Slash className="size-3 -rotate-[24deg] text-border" />

				<OrganizationSwitcher />
			</div>

			<div className="flex items-center gap-4">
				<ProfileButton />
			</div>
		</div>
	);
}
