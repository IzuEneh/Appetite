import { useEffect, useState } from "react";
import axios from "axios";

import { Business, RemoteReview, SearchResponse } from "../../../types";
import { useLocation } from "./useLocation";

const API_ENDPOINT = "https://api.yelp.com/v3";
const SEARCH_PATH = "/businesses/search";
const BUSINESS_PATH = "/businesses/";
const REVIEWS_PATH = "/reviews";

const api_key =
	"SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const headers = { authorization: `bearer ${api_key}` };

const useRestaurants = () => {
	const location = useLocation();
	const [restaurants, setRestaurants] = useState<Business[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);

	const pop = () => {
		setRestaurants((restaurants) => restaurants.slice(0, -1));
	};

	useEffect(() => {
		setError("");
		setLoading(true);

		(async () => {
			if (!location) {
				return;
			}

			const { latitude, longitude } = location;
			const restaurants = await loadMoreRestaurants(
				latitude,
				longitude,
				offset
			);

			setLoading(false);
			if (restaurants.length === 0) {
				setError("Unable To fetch restaurants");
				return;
			}

			const reversed = [...restaurants].reverse();
			setRestaurants(reversed);
			setOffset((offset) => offset + 8);
		})();
	}, [location]);

	useEffect(() => {
		if (restaurants.length < 4) {
			if (!location) {
				return;
			}

			const { latitude, longitude } = location;
			loadMoreRestaurants(latitude, longitude, offset).then(
				(newRestaurants) => {
					const reversed = [...newRestaurants].reverse();
					setRestaurants([...reversed, ...restaurants]);
					setOffset((offset) => offset + 8);
				}
			);
		}
	}, [restaurants]);

	return { restaurants, error, loading, pop };
};

const loadMoreRestaurants = async (
	latitude: number,
	longitude: number,
	offset: number
) => {
	const newRestaurants = await fetchBestRestaurants(
		{ latitude, longitude },
		offset
	);
	return await fetchRestaurantDetailsAndReviews(newRestaurants);
};

const fetchBestRestaurants = async (
	{ latitude, longitude }: { latitude: number; longitude: number },
	offset: number
) => {
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
					limit: 8,
					open_now: true,
					device_platform: "mobile-generic",
					offset,
				},
			}
		);
		return data.businesses;
	} catch (error) {
		console.log(error);
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

export { useRestaurants };
