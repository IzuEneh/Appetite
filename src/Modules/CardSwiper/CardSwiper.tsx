import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	FlatList,
	ListRenderItem,
	ActivityIndicator,
	Text,
} from "react-native";
import TinderCard from "react-tinder-card";

import { Business } from "../../types";
import { useRestaurants } from "../Common/hooks/useRestaurants";
import Card from "./components/Card";

type Props = {
	onLike: (business: Business) => void;
	onDislike: (business: Business) => void;
	style?: ViewStyle;
};

function CardSwiper({ onLike, onDislike, style }: Props) {
	const { restaurants, error, loading, pop } = useRestaurants();
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
					onCardLeftScreen={() => handleCardLeave(index)}
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
		width: "90%",
		height: 500,
	},
	card: {
		position: "absolute",
		backgroundColor: "#fff",
		width: "100%",
		height: 500,
		borderRadius: 20,
	},
});

export default CardSwiper;
