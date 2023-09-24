import { toast } from "react-toastify";

interface validationProps {
	status: "success" | "error" | "warn" | "info";
	message: string;
}

export const validationToast = (props: validationProps) => {
	const { status, message } = props;

	switch (status) {
		case "success":
			toast.success(message, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			break;
		case "error":
			toast.error(message, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			break;
		case "warn":
			toast.warn(message, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			break;
		case "info":
			toast.info(message, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			break;
		default:
		case "info":
			toast.info(message, {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			break;
	}
};

export default validationToast;
