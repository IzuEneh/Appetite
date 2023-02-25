import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/Views/HomeScreen";

export default function App() {
	return <HomeScreen />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
