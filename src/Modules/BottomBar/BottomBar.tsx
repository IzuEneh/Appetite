import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Alert,
} from "react-native";

type Props = {
	coordinates: { latitude: string; longitude: string };
	phone: string;
};

function BottomBar({ coordinates, phone }: Props) {
	const handleNavigate = async () => {
		const { latitude, longitude } = coordinates;
		const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
		const supported = await Linking.canOpenURL(url);
		if (!supported) {
			Alert.alert("Unable to open url");
			return;
		}

		await Linking.openURL(url);
	};

	const handleCall = () => {
		Linking.openURL(`tel:${phone}`);
	};

	return (
		<View style={styles.bottomBar}>
			<TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
				<Text style={styles.navigateButtonText}>Navigate</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.callButton} onPress={handleCall}>
				<Text style={styles.callButtonText}>Call</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomBar: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: 10,
	},
	navigateButton: {
		backgroundColor: "#ED4337",
		padding: 10,
		borderRadius: 5,
		flex: 1,
	},
	navigateButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
	callButton: {
		backgroundColor: "#4CAF50",
		padding: 10,
		borderRadius: 5,
	},
	callButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default BottomBar;
