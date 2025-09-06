// lib/mockDb.ts

export type Strand = {
  strand: string;
  level: "BE" | "AE" | "ME" | "EE";
  progress: number;
};

export type Student = {
  admissionNo: string;
  name: string;
  email: string;
  strands: Strand[];
};

let students: Student[] = [
  {
    admissionNo: "ADM001",
    name: "Alice Johnson",
    email: "alice@example.com",
    strands: [
      { strand: "Mathematics", level: "ME", progress: 0.8 },
      { strand: "Science", level: "AE", progress: 0.65 },
      { strand: "Languages", level: "EE", progress: 0.9 },
      { strand: "Arts", level: "BE", progress: 0.4 },
    ],
  },
  {
    admissionNo: "ADM002",
    name: "Bob Smith",
    email: "bob@example.com",
    strands: [
      { strand: "Mathematics", level: "BE", progress: 0.3 },
      { strand: "Science", level: "ME", progress: 0.75 },
      { strand: "Languages", level: "AE", progress: 0.6 },
      { strand: "Arts", level: "EE", progress: 0.95 },
    ],
  },
];

// ---------------------- CRUD FUNCTIONS ----------------------

// Create
export function addStudent(newStudent: Student): Student {
  students.push(newStudent);
  return newStudent;
}

// Read all
export function getStudents(): Student[] {
  return students;
}

// Read one
export function getStudentById(admissionNo: string): Student | undefined {
  return students.find((s) => s.admissionNo === admissionNo);
}

// Update
export function updateStudent(
  admissionNo: string,
  updated: Partial<Student>
): Student | null {
  const idx = students.findIndex((s) => s.admissionNo === admissionNo);
  if (idx === -1) return null;

  students[idx] = { ...students[idx], ...updated };
  return students[idx];
}

// Delete
export function deleteStudent(admissionNo: string): boolean {
  const initialLength = students.length;
  students = students.filter((s) => s.admissionNo !== admissionNo);
  return students.length < initialLength;
}
