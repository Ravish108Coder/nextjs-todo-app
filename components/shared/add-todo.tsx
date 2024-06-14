import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {v4 as uuid} from 'uuid'
import { TodoItem } from "@/app/page"
import { useRef, useState } from "react"
import { useTodoContext } from "@/hooks/useTodoContext-hook"

// interface AddTodoProps {
//     setTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
// }

const AddTodo = () => {
    const {todoData, setTodoData} = useTodoContext()
    const [open, setOpen] = useState(false)
    const formRef = useRef(null)
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data:any = {}
        data.title = formData.get('title')
        data.userId = formData.get('userId')
        data.completed = formData.get('completed')
        if(data.title === "") return
        if(data.userId === "") return
        const title = formData.get('title')
        const newTodo:TodoItem = {
            id: uuid(),
            completed: formData.get('completed') === "on",
            title: data.title,
            userId: Number(formData.get('userId'))
        }
        setTodoData([newTodo, ...todoData])
        setOpen(!open)
    }
    return (
        <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
            <DialogTrigger asChild>
                <Button>Add Todo</Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <Textarea name="title" placeholder="title" required />
                    <Input name="userId" type="number" placeholder="userId" autoComplete="off" required />
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="isCompleted"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Completed
                        </label>
                        <Checkbox name="completed" id="isCompleted" />
                    </div>
                    <Button type="submit">Add</Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default AddTodo