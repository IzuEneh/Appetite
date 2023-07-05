import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	ActivityIndicator,
	Text,
	Dimensions,
} from "react-native";
import TinderCard from "react-tinder-card";

import { Business } from "../../../Common/api/types";
import { useRestaurants } from "../../../Common/hooks/useRestaurants";
import { FilterState } from "../Filter/api/FilterState";
import Card from "./Card";

type Props = {
	onLike: (business: Business) => void;
	style?: ViewStyle;
	filters: FilterState;
};

function CardSwiper({ onLike, style, filters }: Props) {
	const { restaurants, error, loading, pop } = useRestaurants(filters);
	const onSwipe = (direction: string, business: Business) => {
		if (direction == "right") {
			onLike(business);
		}
	};

	if (loading) {
		return (
			<View style={[styles.container, styles.centreAlign]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, styles.centreAlign]}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={[styles.container, style]}>
			{restaurants.map((business, index) => (
				<TinderCard
					key={business.id}
					onSwipe={(direction) => onSwipe(direction, business)}
					onCardLeftScreen={pop}
					preventSwipe={["up", "down"]}
				>
					<Card business={business} style={styles.card} />
				</TinderCard>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 600,
		width: Dimensions.get("window").width - 32,
	},
	centreAlign: {
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		position: "absolute",
		backgroundColor: "#fff",
		width: "100%",
		height: 600,
	},
	errorText: {
		fontSize: 18,
		textTransform: "capitalize",
	},
});

export default CardSwiper;
