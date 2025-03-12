export interface Reminder {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
}

export interface CreateReminderDto {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
}

export interface UpdateReminderDto {
    title?: string;
    description?: string;
    dueDate?: string;
    isCompleted?: boolean;
}