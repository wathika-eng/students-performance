import { useUserStore } from "@/lib/store";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProtectedLayout() {
    const router = useRouter();
    const user = useUserStore((s) => s.isLoggedin);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) router.replace("/(auth)/auth");
            else setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [user, router]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{ marginTop: 10 }}>Checking login...</Text>
            </View>
        );
    }

    return <Slot />;
}
