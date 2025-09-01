import { useUserStore } from "@/lib/store";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
	const logout = useUserStore((s) => s.logout);

	function handleLogout() {
		logout();
	}

	return (
		<View>
			<Text>Profile </Text>
			<Button
				style={styles.logoutBtn}
				mode="contained-tonal"
				onPress={handleLogout}
				icon={"logout"}
			>
				Logout
			</Button>
		</View>
	);
}
// with stylesheet you can write custom css

const styles = StyleSheet.create({
	logoutBtn: {
		marginTop: 10,
		width: 100,
		alignSelf: "center", // centers the button horizontally
	},
})
