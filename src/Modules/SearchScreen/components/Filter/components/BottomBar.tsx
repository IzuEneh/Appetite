import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

type Props = {
	onUpdate: () => void;
	onCancel: () => void;
};

function ButtonBar({ onCancel, onUpdate }: Props) {
	return (
		<View style={styles.container}>
			<TouchableHighlight
				style={styles.formButton}
				onPress={onCancel}
				underlayColor="#e2e8f0"
			>
				<Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
			</TouchableHighlight>
			<TouchableHighlight
				underlayColor="#7dd3fc"
				style={[styles.formButton, styles.updateButton]}
				onPress={onUpdate}
			>
				<Text style={[styles.buttonText, styles.updateText]}>Update</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 10,
		paddingTop: 8,
		width: "100%",
	},
	formButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderColor: "#0ea5e9",
		borderWidth: 2,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 22,
	},
	updateButton: {
		backgroundColor: "#0ea5e9",
	},
	updateText: {
		color: "white",
	},
	cancelText: {
		color: "#0ea5e9",
	},
});

export default ButtonBar;
