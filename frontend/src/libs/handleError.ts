export const handleError = (validation: any) => {
	const newErrors: Record<string, string> = {
		username: "",
		password: ""
	};

	validation.error.errors.forEach((error: any) => {
		if (error.path[0] === "username") {
			newErrors.username = error.message;
		} else if (error.path[0] === "password") {
			newErrors.password = error.message;
		}
	});

	return newErrors;
};
