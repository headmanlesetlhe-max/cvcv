export enum StepStatus {
  LOCKED = 'locked',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface CourseStep {
  id: string;
  title: string;
  description: string;
  path: string;
  status: StepStatus;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  images?: string[]; // Base64 string array for images
}

export interface WorkoutData {
  name: string;
  reps: string;
  sets: string;
  image: string;
}