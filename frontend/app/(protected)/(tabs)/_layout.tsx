import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveBackgroundColor: "lavender",
				tabBarActiveTintColor: MD3Colors.error50,
				tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
				headerTitleStyle: styles.title,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Overview",
					tabBarIcon: ({ focused, color }) => (
						<Icon
							source="home"
							size={focused ? 24 : 20}
							color={focused ? MD3Colors.error50 : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="details"
				options={{
					title: "Details",
					tabBarIcon: ({ focused, color }) => (
						<Icon
							source="school"
							size={focused ? 24 : 20}
							color={focused ? MD3Colors.error50 : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused, color }) => (
						<Icon
							source="account"
							size={focused ? 24 : 20}
							color={focused ? MD3Colors.error50 : color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	title: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
});
