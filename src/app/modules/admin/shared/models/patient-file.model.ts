export interface PatientFile {
    id?: string; 
    idUser: string;// Optional since it's auto-generated
    fullName: string;
    birthDate: string; // Format: 'YYYY-MM-DD'
    gender: string; // Example: 'Male', 'Female', 'Other'
    bloodType: string; // Example: 'A+', 'O-', etc.
    allergies: string; // Comma-separated list
    chronicDiseases: string; // Comma-separated list
    currentMedications: string; // Comma-separated list
    emergencyContact: string;
    date:string;
  }
  