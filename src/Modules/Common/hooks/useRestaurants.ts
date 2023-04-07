import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { Business, SearchResponse } from "../../../types";

const api_key =
	"bearer SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";

const requestOptions = {
	method: "GET",
	headers: {
		accept: "application/json",
		authorization: api_key,
	},
};

const useRestaurants = () => {
	const [restaurants, setRestaurants] = useState<Business[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			(async () => {
				setLoading(true);
				const hasLocation = await requestLocationPermission();
				if (!hasLocation) {
					setError("No Location access");
					return;
				}

				const location = await Location.getCurrentPositionAsync();
				const { latitude, longitude } = location.coords;
				try {
					const response = await fetch(
						`https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=20&latitude=${latitude}&longitude=${longitude}&term=restaurants&open_now=true&device_platform=mobile-generic`,
						requestOptions
					);
					const { businesses } = (await response.json()) as SearchResponse;
					setLoading(false);
					setRestaurants(businesses);
				} catch (err) {
					setLoading(false);
					setError("Unable to fetch restaurants");
				}
			})();
		}, [])
	);

	return { restaurants, error, loading };
};

const requestLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		return false;
	}

	return true;
};

export { useRestaurants };
