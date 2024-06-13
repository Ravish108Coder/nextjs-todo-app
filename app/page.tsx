'use client'

import AddTodo from "@/components/shared/add-todo";
import { SelectTodo } from "@/components/shared/select-todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Delete, SquareCheckBig, Trash } from "lucide-react";
// import { useFetch } from "@/hooks/useFetch-hook";
import { useState } from "react";

export type TodoItem = {
  userId: number,
  id: number | string,
  title: string,
  completed: boolean
}

export default function Home() {
  const [filterCompleted, setFilterCompleted] = useState(-1);
  const [editableTitle, setEditableTitle] = useState("")
  const [edittodoId, setEditTodoId] = useState<string | number>(-1)
  const [todoData, setTodoData] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [filter, setFilter] = useState("")
  // const [data, loading, error]= useFetch('https://jsonplaceholder.typicode.com/todos')
  const handleFetchTodos = async () => {
    if (todoData.length > 0) {
      alert('already fetched todos')
      return;
    }
    try {
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      const data = await response.json()
      setTodoData(data)
      // console.log(data)
    } catch (error: any) {
      // console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleResetTodos = () => setTodoData([])

  if (loading) return <div>Loading...</div>

  if (error) return <div>error...</div>

  return (
    <main>
      <h1 className="text-center text-3xl">Todo Application</h1>
      <div className="flex justify-between px-6 items-center my-4">
        <Button variant="outline" onClick={handleFetchTodos}>Fetch Todos</Button>
        <AddTodo setTodoData={setTodoData} />
        <Button variant="destructive" onClick={handleResetTodos}>Reset Todos</Button>
      </div>
      <div className="flex justify-end items-center mb-4">
        <div className="w-2/3 flex gap-6">
        <div className="relative">
          <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Todos" />
          <Delete onClick={() => setFilter("")} className={`cursor-pointer absolute right-2 top-1/4 opacity-65 ${filter === "" && "hidden"}`} />
        </div>
        <div className="flex-1">
        <SelectTodo setFilterCompleted={setFilterCompleted}/>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 p-2">
        {
          todoData
          .filter(todo => todo.title.toLowerCase().includes(filter.toLowerCase()))
          .filter(todo => filterCompleted === -1 || Number(todo.completed)=== filterCompleted)
          .map((todoItem) => (
            <div key={todoItem.id} className="grid grid-cols-2 bg-primary/10 p-4 relative">
              <p>😎</p>
              {
                edittodoId === todoItem.id ? (
                  <Input type="text" value={editableTitle} onChange={(e)=>setEditableTitle(e.target.value)} />
                ) : (
                  <p onClick={()=> {
                    setEditTodoId(todoItem.id)
                    setEditableTitle(todoItem.title)
                  }}>{todoItem.title}</p>
                )
              }
              <p>{todoItem.userId}</p>
              <p>{todoItem.completed ? "true" : "false"}</p>
              {
                edittodoId === todoItem.id ? (
                  <SquareCheckBig className="cursor-pointer" onClick={() => {setTodoData(todoData.map((item) => item.id === todoItem.id ? {...item, title: editableTitle} : item))
                setEditTodoId(-1)}} />
                  ) : (
                  <Trash onClick={() => setTodoData(todoData.filter((item) => item.id !== todoItem.id))} className="absolute right-1 bottom-1 cursor-pointer" />
                )
              }
            </div>
          ))
        }
      </div>
    </main>
  );
}


// with nextjs jsonfakeapi no routing no http methods and server actions