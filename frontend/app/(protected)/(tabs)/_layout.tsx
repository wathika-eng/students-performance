import { Tabs } from "expo-router";
import { Icon, MD3Colors } from "react-native-paper";
// define screens
export default function TabsLayout() {
	// define screens, name and title
	// change Tabs to become tabs
	// configure if focused e.t.c and switching
	return (
		<Tabs screenOptions={{ tabBarActiveBackgroundColor: "lavender" }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Class Performance Overview",
					tabBarIcon: ({ focused }) => {
						return focused ? (
							<Icon source="home" size={24} color={MD3Colors.error50} />
						) : (
							<Icon source="home" size={20} />
						);
					},
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="studyPlan"
				options={{
					title: "Study plan",
					tabBarIcon: ({ focused }) => {
						return focused ? (
							<Icon source="calendar" size={24} color={MD3Colors.error50} />
						) : (
							<Icon source="calendar" size={20} />
						);
					},
				}}
			></Tabs.Screen>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => {
						return focused ? (
							<Icon source="account" size={24} color={MD3Colors.error50} />
						) : (
							<Icon source="account" size={20} />
						);
					},
				}}
			></Tabs.Screen>
		</Tabs>
	);
}
