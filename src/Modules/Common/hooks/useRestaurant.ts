import { useEffect, useState } from "react";
import axios from "axios";

import { Business, LocalReview, RemoteReview } from "../../../types";

const API_ENDPOINT = "https://api.yelp.com/v3";
const BUSINESS_PATH = "/businesses/";
const REVIEWS_PATH = "/reviews";

const api_key =
	"SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const headers = { authorization: `bearer ${api_key}` };

export const useRestaurant = (id: string): Business | null => {
	const [restaurant, setRestaurant] = useState<Business | null>(null);
	const [reviews, setReviews] = useState<LocalReview[]>([]);

	useEffect(() => {
		(async () => {
			const [res, reviews] = await Promise.all([
				fetchRestaurantDetails(id),
				fetchRestaurantReviews(id),
			]);
			setRestaurant(res);
			setReviews(reviews);
		})();
	}, []);

	if (!restaurant) {
		return null;
	}

	return { ...restaurant, reviews };
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
