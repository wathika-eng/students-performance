import { getStudents } from "@/lib/MockDB";
import { router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, ProgressBar, Text } from "react-native-paper";

// Map levels to color + label
const gradeLabels: Record<
    string,
    { label: string; color: string; textColor?: string }
> = {
    BE: { label: "Below Expectation", color: "#f44336", textColor: "white" }, // red
    AE: { label: "Approaching Expectation", color: "#ffeb3b", textColor: "black" }, // yellow
    ME: { label: "Meeting Expectation", color: "#4caf50", textColor: "white" }, // green
    EE: { label: "Exceeding Expectation", color: "#2196f3", textColor: "white" }, // blue
};

export default function StudentDetails() {
    const { studentId } = useLocalSearchParams<{ studentId?: string }>();
    const students = getStudents();

    if (!studentId) {
        return (
            <View style={styles.wrapper}>
                <Text>No student selected.</Text>
                <Button mode="contained" onPress={() => router.replace("/")}>
                    Go Back
                </Button>
            </View>
        );
    }


    // Find student by admission number
    const student = students.find((s) => s.admissionNo === studentId);

    if (!student) {
        return (
            <View style={styles.wrapper}>
                <Text>No student found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{student.name}</Text>
                <Button
                    mode="contained"
                    icon="download"
                    onPress={() => console.log("Download report")}
                >
                    Download
                </Button>
            </View>

            {/* Strand Performance */}
            {student.strands.map((s, i) => {
                const grade = gradeLabels[s.level] || {
                    label: s.level,
                    color: "gray",
                    textColor: "white",
                };

                return (
                    <Card key={i} style={styles.card}>
                        <Card.Title title={s.strand} />
                        <Card.Content>
                            <Chip
                                style={{ backgroundColor: grade.color, marginBottom: 8 }}
                                textStyle={{ color: grade.textColor, fontWeight: "bold" }}
                            >
                                {grade.label}
                            </Chip>
                            <Text>Work progress - {Math.round(s.progress * 100)}%</Text>
                            <ProgressBar
                                progress={s.progress}
                                color={grade.color}
                                style={styles.progress}
                            />
                        </Card.Content>
                    </Card>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    card: {
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    progress: {
        marginTop: 8,
        height: 8,
        borderRadius: 4,
    },
});
