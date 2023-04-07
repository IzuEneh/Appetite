import React from "react";
import { Image, View } from "react-native";
import TinderCard from "react-tinder-card";
import { Business } from "../../types";

type Props = {
	businesses: Business[];
};

function CardSwiper({ businesses }: Props) {
	const onSwipe = (direction: any) => {
		console.log("You swiped: " + direction);
	};

	const onCardLeftScreen = (myIdentifier: any) => {
		console.log(myIdentifier + " left the screen");
	};
	return (
		<View>
			{businesses.map((business) => (
				<TinderCard
					onSwipe={onSwipe}
					onCardLeftScreen={() => onCardLeftScreen("fooBar")}
					preventSwipe={["right", "left"]}
				>
					<Image
						source={{ uri: business.image_url }}
						style={{ height: 50, width: 50 }}
					/>
				</TinderCard>
			))}
		</View>
	);
}

export default CardSwiper;
