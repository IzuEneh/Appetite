import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";

import { Business, RemoteReview, SearchResponse } from "../../../types";

const API_ENDPOINT = "https://api.yelp.com/v3";
const SEARCH_PATH = "/businesses/search";
const BUSINESS_PATH = "/businesses/";
const REVIEWS_PATH = "/reviews";

const api_key =
	"SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const headers = { authorization: `bearer ${api_key}` };

const useRestaurants = () => {
	const [restaurants, setRestaurants] = useState<Business[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setError("");
		setLoading(true);

		(async () => {
			const hasLocation = await requestLocationPermission();
			if (!hasLocation) {
				setLoading(false);
				setError("No Location access");
				return;
			}

			const location = await Location.getCurrentPositionAsync();
			const { latitude, longitude } = location.coords;
			const restaurants = await fetchBestRestaurants(latitude, longitude);
			const restaurantsWithReviews = await fetchRestaurantDetailsAndReviews(
				restaurants
			);

			setLoading(false);
			if (restaurantsWithReviews.length === 0) {
				setError("Unable To fetch restaurants");
				return;
			}

			setRestaurants(restaurantsWithReviews);
		})();
	}, []);

	return { restaurants, error, loading };
};

const requestLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		return false;
	}

	return true;
};

const fetchBestRestaurants = async (latitude: number, longitude: number) => {
	try {
		const { data } = await axios.get<SearchResponse>(
			`${API_ENDPOINT}${SEARCH_PATH}`,
			{
				headers,
				params: {
					latitude,
					longitude,
					term: "restaurants",
					sort_by: "rating",
					limit: 5,
					open_now: true,
					device_platform: "mobile-generic",
				},
			}
		);
		return data.businesses;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const fetchRestaurantDetails = async (id: string) => {
	try {
		const { data } = await axios.get<Business>(
			`${API_ENDPOINT}${BUSINESS_PATH}${id}`,
			{ headers }
		);
		return data;
	} catch (error) {
		console.error(`Error fetching Details: ${error}`);
		return null;
	}
};

const fetchRestaurantReviews = async (id: string) => {
	try {
		const { data } = await axios.get<RemoteReview>(
			`${API_ENDPOINT}${BUSINESS_PATH}${id}${REVIEWS_PATH}`,
			{
				headers,
				params: { limit: 5, sort_by: "yelp_sort" },
			}
		);
		return data.reviews;
	} catch (error) {
		console.error(`Error fetching Reviews: ${error}`);
		return [];
	}
};

const fetchRestaurantDetailsAndReviews = async (restaurants: Business[]) => {
	const detailsAndReviews = await Promise.all(
		restaurants.map(async (restaurant) => {
			const [business, reviews] = await Promise.all([
				fetchRestaurantDetails(restaurant.id),
				fetchRestaurantReviews(restaurant.id),
			]);
			if (!business) {
				return { ...restaurant, reviews };
			}
			return { ...business, reviews };
		})
	);
	return detailsAndReviews;
};

export { useRestaurants };
