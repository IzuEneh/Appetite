import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Text,
	ViewStyle,
} from "react-native";
import TinderCard from "react-tinder-card";
import { LinearGradient } from "expo-linear-gradient";

import { Business } from "../../types";
import Card from "./components/Card";

type Props = {
	businesses: Business[];
	onLike: (business: Business) => void;
	onDislike: (business: Business) => void;
	style?: ViewStyle;
};

function CardSwiper({ businesses, onLike, onDislike, style }: Props) {
	const onSwipe = (direction: string, business: Business) => {
		if (direction == "right") {
			onLike(business);
		} else {
			onDislike(business);
		}
	};

	return (
		<View style={[styles.container, style]}>
			{businesses.map((business) => (
				<TinderCard
					key={business.id}
					onSwipe={(direction) => onSwipe(direction, business)}
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
