import { useEffect, useReducer } from "react";
import axios from "axios";

import { Business, SearchResponse } from "../api/types";
import { useLocation } from "./useLocation";
import { FilterState } from "Modules/SearchScreen/components/Filter/api/FilterState";

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

const useRestaurants = (filters: FilterState) => {
	const location = useLocation();
	const [{ restaurants, error, offset, loading, initialFetch }, dispatch] =
		useReducer(reducer, initialState);

	const pop = () => dispatch({ type: "pop" });

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
				dispatch({
					type: "set_error",
					payload:
						"Unable to find any restaurants. Please adjust filters and try again.",
				});
				return;
			}

			dispatch({ type: "set_initial", payload: restaurants });
		} catch (err: any) {
			const error = err.response.data.error;
			dispatch({ type: "set_error", payload: error.description });
		}
	};

	useEffect(() => {
		dispatch({ type: "start_fetch" });
		fetchInitialData(filters);
	}, [location, filters]);

	useEffect(() => {
		if (
			restaurants.length < Math.floor(fetchNum / 3) &&
			initialFetch &&
			!error
		) {
			if (!location) {
				return;
			}

			const { latitude, longitude } = location;
			fetchBestRestaurants({ latitude, longitude }, offset, filters).then(
				(newRestaurants) => {
					dispatch({ type: "add_restaurants", payload: newRestaurants });
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
	const filterCategories = categories.map((cat) => cat.alias).join(",");
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

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "set_initial": {
			if (!action.payload || !Array.isArray(action.payload)) {
				return state;
			}

			const reversed = [...action.payload].reverse();
			return {
				...state,
				restaurants: reversed,
				error: "",
				initialFetch: true,
				offset: state.offset + fetchNum,
				loading: false,
			};
		}
		case "start_fetch": {
			return {
				...state,
				loading: true,
				offset: 0,
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
				offset: state.offset + fetchNum,
			};
		}
		case "pop": {
			return {
				...state,
				restaurants: state.restaurants.slice(0, -1),
			};
		}
		default:
			return state;
	}
};

export { useRestaurants };
