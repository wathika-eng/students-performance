import { useUserStore } from "@/lib/store";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProtectedLayout() {
    const router = useRouter();
    const user = useUserStore((s) => s.user); // get user directly from store
    const checkSession = useUserStore((s) => s.checkSession);
    // where the user is
    const segments = useSegments()

    const [loading, setLoading] = useState(true);
    console.log(`User at auth screen ${user?.email}`)
    useEffect(() => {
        async function checkAuth() {
            const isAuthPage = segments[0] === "auth"
            const session = await checkSession();
            console.log("Checking session")
            if (user === null || !session && !isAuthPage) {
                console.log(`before going to profile ${user?.email}`)
                router.replace("/auth");
            } else if (user?.email !== "" && isAuthPage) {
                console.log(`now going to profile ${user?.email}`)
                router.replace("/")
                setLoading(false);
            }
            setLoading(false)
            console.log(`finally ${user?.email}`)
        }
        checkAuth();
    }, [router, segments, user, checkSession])

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
