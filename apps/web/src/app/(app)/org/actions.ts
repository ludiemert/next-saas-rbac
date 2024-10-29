"use server";

import { z } from "zod";
import { HTTPError } from "ky";

import { createOrganization } from "@/http/create-organization";
import { getCurrentOrg } from "@/auth/auth";
import { updateOrganization } from "@/http/update-organization";
import { revalidateTag } from "next/cache";

const organizationSchema = z
	.object({
		name: z
			.string()
			.min(4, { message: "Please include at least 4 characters." }),
		domain: z
			.string()
			.nullable()
			.refine(
				(value) => {
					if (value) {
						const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
						return domainRegex.test(value);
					}
					return true;
				},
				{
					message: "Please, enter a valid domain.",
				},
			),
		shouldAttachUsersByDomain: z
			.union([z.literal("on"), z.literal("off"), z.boolean()])
			.transform((value) => value === true || value === "on")
			.default(false),
	})
	.refine(
		(data) => {
			if (data.shouldAttachUsersByDomain === true && !data.domain) {
				return false;
			}
			return true;
		},
		{
			message: "Domain is required when auto-join is enabled.",
			path: ["domain"],
		},
	);

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;

export async function createOrganizationAction(data: FormData) {
	const result = organizationSchema.safeParse(Object.fromEntries(data));

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { success: false, message: null, errors, error: null };
	}

	const { name, domain, shouldAttachUsersByDomain } = result.data;

	try {
		await createOrganization({
			__typename: "Organization", // Adicionado manualmente
			name,
			domain,
			shouldAttachUsersByDomain,
		});

		revalidateTag("organizations");

		return {
			success: true,
			message: "Account created successfully!",
			errors: null,
			error: null,
		};
	} catch (err) {
		if (err instanceof HTTPError) {
			const { message } = await err.response.json();
			return { success: false, message, errors: null, error: null };
		}

		console.error(err);

		return {
			success: false,
			message: "Unexpected error, try again in a few minutes.",
			errors: null,
			error: null,
		};
	}
}

export async function updateOrganizationAction(data: FormData) {
	const currentOrg = getCurrentOrg();
	const result = organizationSchema.safeParse(Object.fromEntries(data));

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { success: false, message: null, errors, error: null };
	}

	const { name, domain, shouldAttachUsersByDomain } = result.data;

	try {
		await updateOrganization({
			__typename: "Organization", // Adicionado manualmente
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			org: currentOrg!,
			name,
			domain,
			shouldAttachUsersByDomain,
		});

		revalidateTag("organizations");

		return {
			success: true,
			message: "Account created successfully!",
			errors: null,
			error: null,
		};
	} catch (err) {
		if (err instanceof HTTPError) {
			const { message } = await err.response.json();
			return { success: false, message, errors: null, error: null };
		}

		console.error(err);

		return {
			success: false,
			message: "Unexpected error, try again in a few minutes.",
			errors: null,
			error: null,
		};
	}
}
