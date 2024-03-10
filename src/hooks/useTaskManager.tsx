import {Task, TaskManagerReturnType, TaskUpdate} from "../types/type.ts";
import {ChangeEvent, useState} from "react";
import {nanoid} from "nanoid";

export function useTaskManager(): TaskManagerReturnType {
    const [title, setTitle] = useState<string>("");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const completeTask = (id: string): void => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: TaskUpdate) => {
        const index = tasks.findIndex((task) => task.id === id);
        if (index != -1) {
            const newTasks = tasks.slice();
            newTasks[index] = {...newTasks[index], ...taskUpdate };
            setTasks(newTasks);
        }
    };

    const addTask = () => {
        if (title.length < 1) {
            return;
        }

        const newTask = {
            // using nanoid to generate unique id
            id: nanoid(),
            title,
        };
        setTasks((prev) => prev.concat(newTask));
        setTitle("");
    };

    const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(ev.target.value);
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return {
        completeTask,
        updateTask,
        handleSearch,
        addTask,
        filteredTasks,
        title,
        setTitle
    }
}