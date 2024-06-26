import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Layout2 from "./layouts/Layout2";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import OrderStatusPage from "./pages/OrderStatusPage";
import Restaurants from "./pages/Restaurants";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout2>
						<HomePage />
					</Layout2>
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

			<Route
				path='/restaurants'
				element={
					<Layout>
						<Restaurants />
					</Layout>
				}
			/>
			<Route
				path='/detail/:restaurantId'
				element={
					<Layout>
						<DetailPage />
					</Layout>
				}
			/>
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

			<Route element={<ProtectedRoute />}>
				<Route
					path='/order-status'
					element={
						<Layout>
							<OrderStatusPage />
						</Layout>
					}
				/>
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default AppRoutes;
