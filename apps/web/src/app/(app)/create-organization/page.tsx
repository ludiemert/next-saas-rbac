import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
//import { AlertTriangle, Loader2 } from "lucide-react";

export default function CreateOrganization() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Create Organization 😎</h1>
			<form className="space-y-4">
				{/*success === false && message && (
					<Alert variant="destructive">
						<AlertTriangle className="size-4" />
						<AlertTitle>Sign in failed!!!!!😯😯😯😯</AlertTitle>
						<AlertDescription>
							<p>{message}</p>
						</AlertDescription>
					</Alert>
				)*/}
				<div className="space-y-1">
					<Label htmlFor="name">Organization name</Label>
					<Input name="name" id="name" />

					{/*			{errors?.name && (
						<p className="text-xs font-medium text-red-600 dark:text-red-500">
							{errors.name[0]}
						</p>
					)} */}
				</div>

				<div className="space-y-1">
					<Label htmlFor="domain">E-mail domain</Label>
					<Input
						name="domain"
						type="text"
						id="domain"
						inputMode="url"
						placeholder="example.com"
					/>

					{/*				{errors?.email && (
						<p className="text-xs font-medium text-red-600 dark:text-red-500">
							{errors.email[0]}
						</p>
					)}  */}
				</div>

				<div className="space-y-1">
					<div className="flex items-start space-x-2">
						<div className="translate-y-0.5">
							<Checkbox
								name="shouldAttachUsersByDomain"
								id="shouldAttachUsersByDomain"
								className=""
							/>
						</div>

						<label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
							<span className="text-sm font-medium leading-none">
								Auto-join new members
							</span>
							<p className="text-sm text-muted-foreground">
								This will automatically invite all members with same e-mail
								domain to this organization.
							</p>
						</label>
					</div>
				</div>

				<Button type="submit" className="w-full">
					Save Organization
				</Button>
			</form>
		</div>
	);
}
