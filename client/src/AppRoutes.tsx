import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout>
						<HomePage />
					</Layout>
				}
			/>

			<Route
				path='/search/:city'
				element={
					<Layout>
						<SearchPage />
					</Layout>
				}
			/>

			{/* <Route
				path='/search'
				element={
					<Layout>
						<SearchPage />
					</Layout>
				}
			/> */}

			<Route
				path='/user-profile'
				element={
					<Layout>
						<UserProfilePage />
					</Layout>
				}
			/>

			<Route
				path='/manage-restaurant'
				element={
					<Layout>
						<ManageRestaurantPage />
					</Layout>
				}
			/>
			<Route path='/auth-callback' element={<AuthCallbackPage />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default AppRoutes;
