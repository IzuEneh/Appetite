import { useEffect, useState } from "react";
import axios from "axios";

import { Business, SearchResponse } from "../../../types";
import { useLocation } from "./useLocation";

const API_ENDPOINT = "https://api.yelp.com/v3";
const SEARCH_PATH = "/businesses/search";

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
			const restaurants = await fetchBestRestaurants(
				{ latitude, longitude },
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
			fetchBestRestaurants({ latitude, longitude }, offset).then(
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

export { useRestaurants };
