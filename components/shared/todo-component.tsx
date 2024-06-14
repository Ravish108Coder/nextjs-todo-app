import { TodoItem } from "@/app/page";
import { SquareCheckBig, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTodoContext } from "@/hooks/useTodoContext-hook";

const TodoComponent = ({ todoItem }: { todoItem: TodoItem }) => {
    const { edittodoId, editableTitle, setEditTodoId, setEditableTitle, todoData, setTodoData } = useTodoContext()
    return (
        <div key={todoItem.id} className={`rounded-lg shadow-lg flex flex-col justify-between ${todoItem.completed ? "bg-green-200" : "bg-primary/10"} p-4 relative min-h-[176px]`}>
            {
                edittodoId === todoItem.id ? (
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        setTodoData(todoData.map((item) => item.id === todoItem.id ? { ...item, title: editableTitle } : item))
                        setEditTodoId(-1)
                    }}>
                    <Input type="text" value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} />
                    </form>
                ) : (
                    <p className="hover:outline outline-2 outline-offset-2 rounded-lg font-semibold text-xl p-1 capitalize" onClick={() => {
                        setEditTodoId(todoItem.id)
                        setEditableTitle(todoItem.title)
                    }}>{todoItem.title}</p>
                )
            }
            <p className="cursor-pointer" onClick={() => setTodoData(todoData.map((item) => item.id === todoItem.id ? { ...item, completed: !item.completed } : item))}><div className="hover:outline outline-2 outline-offset-8 rounded-lg inline-block"><span className="text-lg text-black font-semibold">Completed:</span> <span className="hover:bg-white/60 bg-white p-1 rounded-lg">{todoItem.completed ? "true" : "false"}</span></div></p>
            {
                edittodoId === todoItem.id ? (
                    <SquareCheckBig className="absolute right-3 bottom-3 cursor-pointer" onClick={() => {
                        setTodoData(todoData.map((item) => item.id === todoItem.id ? { ...item, title: editableTitle } : item))
                        setEditTodoId(-1)
                    }} />
                ) : (
                    <Trash onClick={() => setTodoData(todoData.filter((item) => item.id !== todoItem.id))} className="absolute right-3 bottom-3 cursor-pointer" />
                )
            }
        </div>
    )
}

export default TodoComponent