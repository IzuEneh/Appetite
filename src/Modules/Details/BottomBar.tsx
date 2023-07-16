import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Alert,
	ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type Props = {
	coordinates: { latitude: string; longitude: string };
	phone: string;
	style?: ViewStyle;
};

function BottomBar({ coordinates, phone, style }: Props) {
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
		<View style={[styles.bottomBar, style]}>
			<TouchableOpacity
				style={[styles.navigateButton, styles.iconButton]}
				onPress={handleNavigate}
			>
				<Ionicons name="navigate" size={24} color="white" />
				<Text style={styles.navigateButtonText}>Navigate</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.callButton, styles.iconButton]}
				onPress={handleCall}
			>
				<FontAwesome name="phone" size={24} color="#ED4337" />
				<Text style={styles.callButtonText}>Call</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.callButton, styles.iconButton]}
				onPress={() => {}}
			>
				<AntDesign name="hearto" size={24} color="#ED4337" />
				<Text style={styles.callButtonText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomBar: {
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
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#ED4337",
	},
	callButtonText: {
		color: "#ED4337",
		fontWeight: "bold",
		fontSize: 16,
	},
	iconButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});

export default BottomBar;
