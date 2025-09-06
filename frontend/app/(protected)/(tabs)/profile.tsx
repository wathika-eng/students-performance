import { useUserStore } from "@/lib/store";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, List, Text } from "react-native-paper";

export default function Profile() {
	const user = useUserStore((s) => s.user);
	const logout = useUserStore((s) => s.logout);

	function handleLogout() {
		logout();
		router.replace("/(auth)/auth");
	}

	return (
		<View style={styles.container}>
			{/* Profile Header */}
			<Card style={styles.card}>
				<Card.Content style={styles.header}>
					<Avatar.Text
						size={72}
						label={user?.fullName ? user.fullName[0] : "U"}
						style={styles.avatar}
					/>
					<View style={styles.userInfo}>
						<Text variant="titleLarge" style={styles.name}>
							{user?.fullName || "John Doe"}
						</Text>
						<Text variant="bodyMedium" style={styles.email}>
							{user?.email || "johndoe@example.com"}
						</Text>
					</View>
				</Card.Content>
			</Card>

			{/* Settings / Info List */}
			<List.Section style={styles.list}>
				<List.Item
					title="Edit Profile"
					left={(props) => <List.Icon {...props} icon="account-edit" />}
					onPress={() => console.log("Edit profile")}
				/>
				<List.Item
					title="Notifications"
					left={(props) => <List.Icon {...props} icon="bell" />}
					onPress={() => console.log("Notifications")}
				/>
				<List.Item
					title="Privacy Settings"
					left={(props) => <List.Icon {...props} icon="lock" />}
					onPress={() => console.log("Privacy")}
				/>
			</List.Section>

			{/* Logout Button */}
			<Button
				style={styles.logoutBtn}
				mode="contained-tonal"
				onPress={handleLogout}
				icon="logout"
			>
				Logout
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f8f9fa",
	},
	card: {
		marginBottom: 20,
		borderRadius: 12,
		elevation: 2,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		backgroundColor: "#4caf50",
	},
	userInfo: {
		marginLeft: 16,
	},
	name: {
		fontWeight: "bold",
	},
	email: {
		color: "gray",
	},
	list: {
		marginBottom: 20,
	},
	logoutBtn: {
		alignSelf: "center",
		width: "50%",
		borderRadius: 8,
	},
});
