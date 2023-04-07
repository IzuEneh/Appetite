import React from "react";
import { Image, View, StyleSheet, ImageBackground, Text } from "react-native";
import TinderCard from "react-tinder-card";
import { Business } from "../../types";

type Props = {
	businesses: Business[];
	onLike: (business: Business) => void;
	onDislike: (business: Business) => void;
};

function CardSwiper({ businesses, onLike, onDislike }: Props) {
	const onSwipe = (direction: string, business: Business) => {
		if (direction == "right") {
			onLike(business);
		} else {
			onDislike(business);
		}
	};

	const onCardLeftScreen = (myIdentifier: any) => {
		console.log(myIdentifier + " left the screen");
	};

	return (
		<View style={styles.container}>
			{businesses.map((business) => (
				<TinderCard
					key={business.id}
					onSwipe={(direction) => onSwipe(direction, business)}
					preventSwipe={["up", "down"]}
				>
					<View style={styles.card}>
						<ImageBackground
							style={styles.cardImage}
							source={{ uri: business.image_url }}
						>
							<Text style={styles.cardTitle}>{business.name}</Text>
						</ImageBackground>
					</View>
				</TinderCard>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "90%",
		maxWidth: 260,
		height: 300,
	},
	card: {
		position: "absolute",
		backgroundColor: "#fff",
		width: "100%",
		maxWidth: 260,
		height: 300,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowRadius: 20,
		borderRadius: 20,
		resizeMode: "cover",
	},
	cardImage: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
		borderRadius: 20,
	},
	cardTitle: {
		position: "absolute",
		bottom: 0,
		margin: 10,
		color: "#fff",
	},
});

export default CardSwiper;
