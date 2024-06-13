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

interface AddTodoProps {
    // setTodoData: (item:TodoItem=>TodoItem[])
    // setTodoData: () => void;
    setTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const AddTodo = ({setTodoData}: AddTodoProps) => {
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
        if((data.userId === "") || isNaN(Number(formData.get('userId')))) return
        const title = formData.get('title')
        const newTodo:TodoItem = {
            id: uuid(),
            completed: formData.get('completed') === "on",
            title: data.title,
            userId: Number(formData.get('userId'))
        }
        // console.log(newTodo)
        // const todos:TodoItem[] = []
        // const newTodos:TodoItem[] = [...todos, newTodo]
        setTodoData(prev=>[newTodo, ...prev])
        setOpen(!open)
    }
    return (
        <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
            <DialogTrigger asChild>
                <Button>Add Todo</Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <Textarea name="title" placeholder="title" className="my-2" />
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="isCompleted"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Completed
                        </label>
                        <Checkbox name="completed" id="isCompleted" />
                    </div>
                    <Input name="userId" type="text" placeholder="userId" className="my-4" />
                    <Button type="submit">Add</Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default AddTodo