import { useUserStore } from "@/lib/store";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProtectedLayout() {
    const router = useRouter();
    const user = useUserStore((s) => s.user); // get user directly from store
    const checkSession = useUserStore((s) => s.checkSession);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            const sessionUser = await checkSession();
            if (!sessionUser) {
                router.replace("/auth");
            } else {
                setLoading(false);
            }
        };
        verifySession();
    }, [checkSession, router]);

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
