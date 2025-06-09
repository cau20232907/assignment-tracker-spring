export interface Assignment {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export interface AssignmentCreate {
  title: string;
  description?: string;
  dueDate?: string;
}
