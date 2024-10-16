"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

import { createProjectAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";

export function ProjectForm() {
	//const router = useRouter();

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		createProjectAction)

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{success === false && message && (
				<Alert variant="destructive">
					<AlertTriangle className="size-4" />
					<AlertTitle>Save project failed!!!!!😯😯😯😯</AlertTitle>
					<AlertDescription>
						<p>{message}</p>
					</AlertDescription>
				</Alert>
			)}

			{success === true && message && (
				<Alert variant="success">
					<AlertTriangle className="size-4" />
					<AlertTitle>Success!!!</AlertTitle>
					<AlertDescription>
						<p>{message}</p>
					</AlertDescription>
				</Alert>
			)}

			<div className="space-y-1">
				<Label htmlFor="name">Project name</Label>
				<Input name="name" id="name" />

				{errors?.name && (
					<p className="text-xs font-medium text-red-600 dark:text-red-500">
						{errors.name[0]}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="description">Description</Label>
				<Textarea name="description" id="description" />

				{errors?.description && (
					<p className="text-xs font-medium text-red-600 dark:text-red-500">
						{errors.description[0]}
					</p>
				)}
			</div>

		

			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					"        Save project"
				)}
			</Button>
		</form>
	);
}
