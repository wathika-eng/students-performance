import { useUserStore } from "@/lib/store";
import { router } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";


export default function AuthScreen() {
	// const theme = useTheme();
	const [isSignup, setIsSignup] = useState<boolean>(false);
	const [isAnon, setAnon] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [fullName, setfullName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setIsError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	const login = useUserStore((state) => state.login);
	const signup = useUserStore((state) => state.signup);
	const guest = useUserStore((state) => state.startGuestSession);

	const kenyanPhoneRegex = /^(?:2547\d{8}|07\d{8})$/;

	function changeMode() {
		setIsSignup((prev) => !prev);
		setIsError(null);
	}

	async function guestMode() {
		setAnon(true);
		guest();
		router.prefetch("/");
		router.push("/");
		return;
	}

	async function handleAuth() {
		if (!email.trim().toLowerCase() || !password.trim()) {
			setIsError("Please fill all fields as required");
			return;
		}

		if (password.trim().length < 8) {
			setIsError("password must be more than 8 characters");
			return;
		}
		try {
			if (!isSignup) {
				await login(email, password);
				setIsError(null);
				router.prefetch("/profile");
				router.replace("/profile");
			} else {
				if (phone.trim().length < 10 || !kenyanPhoneRegex.test(phone)) {
					setIsError("only kenyan phone format allowed 2547123...");
					return;
				}
				await signup(email, phone, password);
				setIsError(null);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setIsError(error.message || "Something went wrong");
			} else {
				setIsError("Something went wrong");
			}
		}
	}

	return (
		// smooth keyboard
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View>
				<Text style={styles.title1}>Tusome Students Performance App</Text>
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>
					{isSignup ? "Create an" : "Login to your"} account
				</Text>
				{isSignup ? (<TextInput
					style={styles.input}
					label={"full-name"}
					autoCapitalize="none"
					keyboardType="default"
					placeholder="john doe"
					mode="outlined"
					maxLength={40}
					onChangeText={(val) => {
						setfullName(val);
						if (error) setIsError(null);
					}}
				/>) : ""}
				<TextInput
					style={styles.input}
					label={"email"}
					autoCapitalize="none"
					keyboardType="email-address"
					placeholder="john@gmail.com"
					mode="outlined"
					maxLength={40}
					onChangeText={(val) => {
						setEmail(val);
						if (error) setIsError(null);
					}}
				/>
				{isSignup ? (
					<TextInput
						style={styles.input}
						label={"phone number"}
						keyboardType="number-pad"
						mode="outlined"
						maxLength={12}
						onChangeText={(val) => {
							setPhone(val);
							if (error) setIsError(null);
						}}
						placeholder="2547123456789"
					/>
				) : (
					""
				)}
				<TextInput
					style={styles.input}
					label={"password"}
					autoCapitalize="none"
					//keyboardType="visible-password"
					secureTextEntry={!showPassword}
					mode="outlined"
					maxLength={40}
					onChangeText={(val) => {
						setPassword(val);
						if (error) setIsError(null);
					}}
					right={
						<TextInput.Icon
							icon={showPassword ? "eye-off" : "eye"} // 👁 toggle icons
							onPress={() => setShowPassword(!showPassword)}
						/>
					}
				/>

				{error && <Text style={styles.error}>{error}</Text>}
				{/*disabled={!email || !password} */}
				<Button style={styles.button} onPress={handleAuth} mode="contained">
					{isSignup ? "Sign up" : "Login"}
				</Button>

				<Button
					style={styles.button}
					onPress={changeMode}
					mode="contained-tonal"
				>
					{isSignup

						? "Already have an account? Sign in"
						: "Don't have an account? Sign up"}
				</Button>
				{isSignup ? "" : <Button style={styles.button} onPress={guestMode} mode="outlined">
					Continue as a guest
				</Button>}

			</View>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#f5f5f5",
		padding: 16,
	},
	title1: {
		position: "relative",
		top: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		fontSize: 30,
		fontWeight: "900",
	},
	card: {
		borderRadius: 16,
		elevation: 4,
		paddingVertical: 10,
	},
	title: {
		fontSize: 22,
		textAlign: "center",
		marginBottom: 20,
		fontWeight: "600",
	},
	input: {
		marginBottom: 12,
	},
	button: {
		marginTop: 10,
	},
	switchBtn: {
		marginTop: 8,
	},
	guestBtn: {
		marginTop: 12,
		borderStyle: "dashed",
	},
	//content: {},
	content: { flex: 1, padding: 20, justifyContent: "center" },
	error: { fontWeight: "900", color: "red", textAlign: "center" },
});
