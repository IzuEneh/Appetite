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

import { Business } from "../../../../types";
import { useRestaurants } from "../../../Common/hooks/useRestaurants";
import { FilterState } from "../../../SearchScreen/components/Filter/api/FilterContext";
import Card from "./Card";

type Props = {
	onLike: (business: Business) => void;
	onDislike: (business: Business) => void;
	style?: ViewStyle;
	filters: FilterState;
};

function CardSwiper({ onLike, onDislike, style, filters }: Props) {
	const { restaurants, error, loading, pop } = useRestaurants(filters);
	const onSwipe = (direction: string, business: Business) => {
		if (direction == "right") {
			onLike(business);
		} else {
			onDislike(business);
		}
	};

	const handleCardLeave = (index: number) => {
		pop();
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		return <Text>error</Text>; // TODO: Add No Location Component
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
	card: {
		position: "absolute",
		backgroundColor: "#fff",
		width: "100%",
		height: 600,
		borderRadius: 20,
	},
});

export default CardSwiper;
