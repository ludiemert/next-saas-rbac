"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

// Importe o tipo corretamente
import {
	createOrganizationAction,
	updateOrganizationAction,
	type OrganizationSchemaType,
} from "./actions";

interface OrganizationFormProps {
	isUpdating?: boolean;
	initialData?: OrganizationSchemaType; // Atualizado para usar o tipo correto
}

export function OrganizationForm({
	isUpdating = false,
	initialData,
}: OrganizationFormProps) {
	const formAction = isUpdating
		? updateOrganizationAction
		: createOrganizationAction;

	const [{ success, message, errors }, handleSubmit, isPending] =
		useFormState(formAction);

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{success === false && message && (
				<Alert variant="destructive">
					<AlertTriangle className="size-4" />
					<AlertTitle>Save organization failed!!!!!😯😯😯😯</AlertTitle>
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
				<Label htmlFor="name">Organization name</Label>
				<Input name="name" id="name" defaultValue={initialData?.name || ""} />
				{errors?.name && (
					<p className="text-xs font-medium text-red-600 dark:text-red-500">
						{errors.name[0]}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">E-mail domain</Label>
				<Input
					name="domain"
					type="text"
					id="domain"
					inputMode="url"
					placeholder="example.com"
					defaultValue={initialData?.domain || ""}
				/>
				{errors?.domain && (
					<p className="text-xs font-medium text-red-600 dark:text-red-500">
						{errors.domain[0]}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<div className="flex items-start space-x-2">
					<div className="translate-y-0.5">
						<Checkbox
							name="shouldAttachUsersByDomain"
							id="shouldAttachUsersByDomain"
							defaultChecked={initialData?.shouldAttachUsersByDomain || false}
						/>
					</div>
					<label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
						<span className="text-sm font-medium leading-none">
							Auto-join new members
						</span>
						<p className="text-sm text-muted-foreground">
							This will automatically invite all members with the same e-mail
							domain to this organization.
						</p>
					</label>
				</div>
				{errors?.shouldAttachUsersByDomain && (
					<p className="text-xs font-medium text-red-600 dark:text-red-500">
						{errors.shouldAttachUsersByDomain[0]}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? (
					<Loader2 className="size-4 animate-spin" />
				) : (
					"Save organization"
				)}
			</Button>
		</form>
	);
}
