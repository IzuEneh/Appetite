import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Business, SearchResponse } from "../../../types";
import { useLocation } from "./useLocation";
import { FilterState } from "../../SearchScreen/components/Filter/api/FilterContext";
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

	const fetchInitialData = async (filters: FilterState) => {
		if (!location) {
			return;
		}

		const { latitude, longitude } = location;
		try {
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
		} catch (err: any) {
			const error = err.response.data.error;
			setError(error.description);
			setRestaurants([]);
		}
	};

	useEffect(() => {
		setLoading(true);
		setOffset(0);
		setError("");
		fetchInitialData(filters);
		setLoading(false);
	}, [location, filters]);

	useEffect(() => {
		if (
			restaurants.length < Math.floor(fetchNum / 3) &&
			restaurants.length > 0
		) {
			if (!location) {
				return;
			}

			const { latitude, longitude } = location;
			setOffset((offset) => offset + fetchNum);
			fetchBestRestaurants({ latitude, longitude }, offset, filters).then(
				(newRestaurants) => {
					const reversed = [...newRestaurants].reverse();
					setRestaurants([...reversed, ...restaurants]);
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
	const filterCategories = categories.join(",");
	const priceOptions = prices.map((price) => price.length).join(",");
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
				price: priceOptions.length > 0 ? priceOptions : undefined,
				categories: filterCategories,
			},
		}
	);
	return data.businesses;
};

export { useRestaurants };
