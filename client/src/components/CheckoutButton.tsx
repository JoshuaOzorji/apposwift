import UserProfileForm, {
	UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useGetMyUser } from "@/api-client/MyUserApi";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";

type Props = {
	onCheckout: (userFormData: UserFormData) => void;
	disabled: boolean;
	isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
	const {
		isAuthenticated,
		isLoading: isAuthLoading,
		loginWithRedirect,
	} = useAuth0();

	const { pathname } = useLocation();

	const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

	const onLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: pathname,
			},
		});
	};

	if (!isAuthenticated) {
		return (
			<Button onClick={onLogin} className='mx-auto'>
				Log in to check out
			</Button>
		);
	}

	if (isAuthLoading || !currentUser || isLoading) {
		return <LoadingButton />;
	}
	return (
		<div className='mx-auto'>
			<Dialog>
				<DialogTrigger asChild>
					<Button disabled={disabled}>Go to Checkout</Button>
				</DialogTrigger>
				<DialogContent className='w-full h-full py-4'>
					<UserProfileForm
						currentUser={currentUser}
						onSave={onCheckout}
						isLoading={isGetUserLoading}
						title='Confirm Delivery Details'
						buttonText='Continue to Payment'
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CheckoutButton;
