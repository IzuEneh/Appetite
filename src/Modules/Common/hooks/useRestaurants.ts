import { useEffect, useState } from "react";
import axios from "axios";

import { Business, SearchResponse } from "../../../types";
import { useLocation } from "./useLocation";
import { FilterState } from "../../Filter/api/FilterContext";
import { mockBusinesses } from "../../../mocks";

const API_ENDPOINT = "https://api.yelp.com/v3";
const SEARCH_PATH = "/businesses/search";

const api_key =
	"SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const headers = { authorization: `bearer ${api_key}` };
const fetchNum = 20;

const useRestaurants = (filters: FilterState) => {
	const location = useLocation();
	const [restaurants, setRestaurants] = useState<Business[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);

	const pop = () => {
		setRestaurants((restaurants) => restaurants.slice(0, -1));
	};

	const fetchInitialData = async () => {
		if (!location) {
			return;
		}

		const { latitude, longitude } = location;
		const restaurants = await fetchBestRestaurants(
			{ latitude, longitude },
			offset,
			filters
		);

		if (restaurants.length === 0) {
			setError("Unable To fetch restaurants");
			return;
		}

		const reversed = [...restaurants].reverse();
		setRestaurants(reversed);
		setOffset((offset) => offset + fetchNum);
	};

	useEffect(() => {
		setError("");
		setLoading(true);
		fetchInitialData();
		setLoading(false);
	}, [location]);

	useEffect(() => {
		if (restaurants.length < Math.floor(fetchNum / 3)) {
			if (!location) {
				return;
			}

			const { latitude, longitude } = location;
			fetchBestRestaurants({ latitude, longitude }, offset, filters).then(
				(newRestaurants) => {
					const reversed = [...newRestaurants].reverse();
					setRestaurants([...reversed, ...restaurants]);
					setOffset((offset) => offset + fetchNum);
				}
			);
		}
	}, [restaurants]);

	return { restaurants, error, loading, pop };
};

const fetchBestRestaurants = async (
	{ latitude, longitude }: { latitude: number; longitude: number },
	offset: number,
	{ prices, categories }: FilterState
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
					limit: fetchNum,
					open_now: true,
					device_platform: "mobile-generic",
					offset,
					// price: prices.join(","),
					// categories: categories.join(","),
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
