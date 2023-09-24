import { z } from "zod";

export const registerSchema = z
	.object({
		firstName: z.string().trim(),
		lastName: z.string().trim(),
		username: z
			.string()
			.trim()
			.min(4, "Username must be at least 4 characters")
			.max(16),
		email: z.string().trim().email({ message: "Invalid email address" }),
		password: z
			.string()
			.trim()
			.min(8, "Min 8 characters")
			.max(16, "Max 16 characters")
			.refine((value) => /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/.test(value), 'At least 1 symbol')
			.refine((value) => /^.*[A-Z].*$/.test(value), 'At least 1 Capitale')
			.refine((value) => /^.*[0-9].*$/.test(value), 'At least 1 symbol'),
		confirmPassword:z
			.string()
			.trim()
			.min(6, "Password must be at least 6 characters")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password doesn't match",
		path: ["confirmPassword"]
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;
