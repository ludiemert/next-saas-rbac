"use client";

//import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, UserPlus } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createInviteAction } from "./actions";

export function CreateInviteForm() {
	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		(data) => createInviteAction(data, null),
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* Exibir erro ao salvar */}
			{success === false && message && (
				<Alert variant="destructive">
					<AlertTriangle className="size-4" />
					<AlertTitle>Invite failed!!!!!😯</AlertTitle>
					<AlertDescription>
						<p>{message}</p>
					</AlertDescription>
				</Alert>
			)}

			{/* Exibir sucesso ao salvar */}
			{success === true && message && (
				<Alert variant="success">
					<AlertTriangle className="size-4" />
					<AlertTitle>Success!!!</AlertTitle>
					<AlertDescription>
						<p>{message}</p>
					</AlertDescription>
				</Alert>
			)}

			<div className="flex items-center gap-2">
				<div className="flex-1 space-y-1">
					<Input
						name="email"
						id="email"
						type="email"
						placeholder="email@example.com"
					/>

					{errors?.email && (
						<p className="text-xs font-medium text-red-600 dark:text-red-500">
							{errors.email[0]}
						</p>
					)}
				</div>

				<Select name="role" defaultValue="MEMBER">
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ADMIN">Admin</SelectItem>
						<SelectItem value="MEMBER">Member</SelectItem>
						<SelectItem value="BILLING">Billing</SelectItem>
					</SelectContent>
				</Select>

				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<>
							<UserPlus className="size-4 mr-2" />
							"Invite user"
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
