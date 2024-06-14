import { TodoContext } from "@/context";
import { useContext } from "react";

export const useTodoContext = () => {
    const context = useContext(TodoContext)
    if(!context) throw new Error('useTodoContext must be used withing a TodoProvider')
    return context;
}