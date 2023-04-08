import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	useEffect(() => {
		(async () => {
			if (location) {
				return;
			}

			const hasLocation = await requestLocationPermission();
			if (!hasLocation) {
				return;
			}

			const newLocation = await Location.getCurrentPositionAsync();
			const { latitude, longitude } = newLocation.coords;
			setLocation({ latitude, longitude });
		})();
	}, []);

	return location;
};

const requestLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		return false;
	}

	return true;
};
