import { ChangeEvent } from "react";

export interface TaskUpdate {
    title: string;
}

export interface Task extends TaskUpdate {
    id: string;
}

export interface TaskManagerReturnType {
    completeTask: (id: string) => void;
    updateTask: (id: string, taskUpdate: TaskUpdate) => void;
    handleSearch: (ev: ChangeEvent<HTMLInputElement>) => void;
    addTask: () => void;
    filteredTasks: Task[];
    title: string;
    setTitle: (title: string) => void;
}
