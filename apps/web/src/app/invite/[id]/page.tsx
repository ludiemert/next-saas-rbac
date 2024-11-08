import { auth, isAuthenticated } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { acceptInvite } from "@/http/accept-invite";
import { getInvite } from "@/http/get-invite";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckCircle, LogIn } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

dayjs.extend(relativeTime);

interface invitePageProps {
	params: {
		id: string;
	};
}

export default async function InvitePage({ params }: invitePageProps) {
	const inviteId = params.id;

	const { invite } = await getInvite(inviteId);
	const isUserAuthenticated = isAuthenticated();

	let currentUserEmail = null;

	if (isUserAuthenticated) {
		const { user } = await auth();
		currentUserEmail = user.email;
	}

	const userIsAuthenticateWithSameEmailFromInvite =
		currentUserEmail === invite.email;

	async function signInFromInvite() {
		"use server"; //toda server action tem que ser async

		cookies().set("inviteId", inviteId);

		redirect(`/auth/sign-in?email=${invite.email}`);
	}

	//acceptInviteAction chama acceptInvite
	async function acceptInviteAction() {
		"use server"; //toda server action tem que ser async

		await acceptInvite(inviteId);

		redirect("/");
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<div className="w-full max-w-sm space-y-6 flex flex-col justify-center">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="size-16">
						{invite.author?.avatarUrl && (
							<AvatarImage src={invite.author.avatarUrl} />
						)}
						<AvatarFallback />
					</Avatar>

					<p className=" text-center leading-relaxed text-muted-foreground text-balance">
						<span className="font-medium text-foreground">
							{invite.author?.name ?? "Someone"}...{"   🤩 "}
						</span>
						invite you to join 👏
						<span className="font-medium text-foreground">
							{invite.organization.name}...{"   📩 "}
						</span>
						<span className="text-xs">
							{dayjs(invite.createdAt).fromNow()}{" "}
						</span>
					</p>
				</div>
				<Separator />

				{!isUserAuthenticated && (
					<form action={signInFromInvite}>
						<Button type="submit" variant="secondary" className="w-full">
							<LogIn className="size-4 mr-2" />
							Sign in to accept the invite
						</Button>
					</form>
				)}

				{userIsAuthenticateWithSameEmailFromInvite && (
					<form action={acceptInviteAction}>
						<Button type="submit" variant="secondary" className="w-full">
							<CheckCircle className="size-4 mr-2" />
							Join 🤩 {invite.organization.name}
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
