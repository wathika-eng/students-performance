import { getStudents, Student } from "@/lib/MockDB";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, DataTable, Searchbar, Text } from "react-native-paper";
// const students = [
// 	{ name: "Alice Johnson", admissionNo: "ADM001", grade: "BE" },
// 	{ name: "Bob Smith", admissionNo: "ADM002", grade: "AE" },
// 	{ name: "Cynthia Lee", admissionNo: "ADM003", grade: "ME" },
// 	{ name: "David Kim", admissionNo: "ADM004", grade: "EE" },
// ];

const gradeLabels: Record<
	string,
	{ label: string; color: string; textColor?: string }
> = {
	BE: { label: "Below Expectation", color: "#f44336", textColor: "white" }, // red
	AE: { label: "Approaching Expectation", color: "#ffeb3b", textColor: "black" }, // yellow
	ME: { label: "Meeting Expectation", color: "#4caf50", textColor: "white" }, // green
	EE: { label: "Exceeding Expectation", color: "#2196f3", textColor: "white" }, // blue
};

export default function Index() {
	const router = useRouter();
	const [query, setQuery] = React.useState("");

	const [students, setStudents] = useState<(null | Student[])>(null);

	useEffect(() => {
		setStudents(getStudents())
	}, [])

	const filtered = students?.filter((s) => {
		const q = query.toLowerCase();
		if (s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q)) {
			return true;
		}
		return s.strands.some(
			(st) =>
				st.strand.toLowerCase().includes(q) ||
				st.level.toLowerCase().includes(q)
		);
	});
	return (
		<View style={styles.wrapper}>
			{/* Search */}
			<Searchbar
				placeholder="Search students"
				value={query}
				onChangeText={setQuery}
				style={styles.searchbar}
			/>

			{/* Table */}
			<DataTable style={styles.table}>
				<DataTable.Header>
					<DataTable.Title style={{ flex: 2 }}>Student Name</DataTable.Title>
					<DataTable.Title style={{ flex: 1.5 }}>Admission No.</DataTable.Title>
					<DataTable.Title style={{ flex: 2 }}>Performance</DataTable.Title>
				</DataTable.Header>

				{(filtered?.length ?? 0) === 0 ? (
					<View style={styles.emptyState}>
						<Text variant="bodyMedium" style={{ color: "gray" }}>
							No students found
						</Text>
					</View>
				) : (
					(filtered ?? []).map((student, i) => {
						const grade = gradeLabels[student.strands[0].level] || {
							label: student.strands,
							color: "gray",
						};

						return (
							<DataTable.Row
								key={i}
								style={[
									i % 2 === 0 ? styles.rowEven : styles.rowOdd,
								]}
								onPress={() => router.push(`/details?studentId=${student.admissionNo}`)}
							>
								<DataTable.Cell style={{ flex: 2 }}>
									{student.name}
								</DataTable.Cell>
								<DataTable.Cell style={{ flex: 1.5 }}>
									{student.admissionNo}
								</DataTable.Cell>
								<DataTable.Cell style={{ flex: 2 }}>
									<Chip
										style={[
											styles.chip,
											{ backgroundColor: grade.color },
										]}
										textStyle={{
											color: grade.textColor || "white",
											fontWeight: "600",
										}}
									>
										{grade.label}
									</Chip>
								</DataTable.Cell>
							</DataTable.Row>
						);
					})
				)}
			</DataTable>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f8f9fa",
	},
	searchbar: {
		marginBottom: 16,
		borderRadius: 12,
	},
	table: {
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "white",
		elevation: 3,
	},
	chip: {
		borderRadius: 20,
		elevation: 1,
		paddingHorizontal: 6,
	},
	rowEven: {
		backgroundColor: "#ffffff",
	},
	rowOdd: {
		backgroundColor: "#f5f5f5",
	},
	emptyState: {
		padding: 20,
		alignItems: "center",
	},
});
