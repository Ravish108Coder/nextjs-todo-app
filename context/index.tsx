'use client'

import { TodoItem } from "@/app/page"
import React, { ReactNode, createContext, useState } from "react";

export type TodoContextType = {
    edittodoId: string | number;
    editableTitle: string;
    setEditTodoId: (value: string | number) => void;
    setEditableTitle: (value: string) => void;
    todoData: TodoItem[];
    setTodoData: (value: TodoItem[]) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [editableTitle, setEditableTitle] = useState<string>('');
    const [edittodoId, setEditTodoId] = useState<string | number>('');
    const [todoData, setTodoData] = useState<TodoItem[]>([]);

    return (
        <TodoContext.Provider value={{ edittodoId, editableTitle, setEditTodoId, setEditableTitle, todoData, setTodoData }}>
            {children}
        </TodoContext.Provider>
    );
};