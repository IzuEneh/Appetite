import { useEffect, useReducer, useState } from "react";
import axios, { AxiosError } from "axios";

import { Business, SearchResponse } from "../../../types";
import { useLocation } from "./useLocation";
import { FilterState } from "../../SearchScreen/components/Filter/api/FilterState";
import { mockBusinesses } from "../../../mocks";

const API_ENDPOINT = "https://api.yelp.com/v3";
const SEARCH_PATH = "/businesses/search";

const api_key =
	"SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const headers = { authorization: `bearer ${api_key}` };
const fetchNum = 20;

type State = {
	restaurants: Business[];
	error: string;
	loading: boolean;
	offset: number;
	initialFetch: boolean;
};

type Action = {
	type: string;
	payload?: any;
};

const initialState: State = {
	restaurants: [],
	error: "",
	loading: false,
	offset: 0,
	initialFetch: false,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "set_initial": {
			if (!action.payload || !Array.isArray(action.payload)) {
				return state;
			}

			return {
				...state,
				restaurants: action.payload,
				error: "",
				initialFetch: true,
				loading: false,
			};
		}
		case "fetch_initial": {
			return {
				...state,
				loading: true,
			};
		}
		case "set_error": {
			if (!action.payload || typeof action.payload !== "string") {
				return state;
			}

			return {
				...state,
				error: action.payload,
				restaurants: [],
				loading: false,
			};
		}
		case "add_restaurants": {
			if (!action.payload || !Array.isArray(action.payload)) {
				return state;
			}

			const reversed = [...action.payload].reverse();
			return {
				...state,
				loading: false,
				error: "",
				restaurants: [...reversed, ...state.restaurants],
			};
		}
		default:
			return state;
	}
};

const useRestaurants = (filters: FilterState) => {
	const location = useLocation();
	const [state, dispatch] = useReducer(reducer, initialState);
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
