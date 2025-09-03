import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProtectedLayout() {
    const router = useRouter();
    // let user = useUserStore((s) => s.checkSession());
    // console.log(user);
    // let user = true;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const user = {
                id: "1",
                email: "kamaa@gmail.com",
                phone_number: "0712345",
            };
            console.log(`user at ${user}`);
            if (!user || user === undefined) router.replace("/auth");
            else setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [router]);

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
