'use client'

import AddTodo from "@/components/shared/add-todo";
import { SelectTodo } from "@/components/shared/select-todo";
import TodoComponent from "@/components/shared/todo-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoContext } from "@/hooks/useTodoContext-hook";
import { Delete } from "lucide-react";
// import { useFetch } from "@/hooks/useFetch-hook";
import { Suspense, useState } from "react";

export type TodoItem = {
  userId: number,
  id: number | string,
  title: string,
  completed: boolean
}

export default function Home() {
  const { todoData, setTodoData } = useTodoContext()
  const [filterCompleted, setFilterCompleted] = useState(-1);
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

  // if (loading) return <div>Loading...</div>

  if (error) return <div>error...</div>

  return (
    <main>
      <h1 className="text-center text-3xl">Todo Application</h1>
      <div className="flex justify-between px-6 items-center my-4">
        <Button disabled={todoData.length > 0} variant="outline" onClick={handleFetchTodos}>Fetch Todos</Button>
        <AddTodo />
        <Button disabled={todoData.length === 0} variant="destructive" onClick={handleResetTodos}>Reset Todos</Button>
      </div>
      <div className="flex justify-center items-center mb-4 gap-6">
        <div className="w-1/6 relative">
          <Input disabled={todoData.length === 0} type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Todos" />
          <Delete onClick={() => setFilter("")} className={`cursor-pointer absolute right-2 top-1/4 opacity-65 ${filter === "" && "hidden"}`} />
        </div>
        <SelectTodo setFilterCompleted={setFilterCompleted} />
      </div>
      {
        loading &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2">
          {Array(16).fill(0).map((_, index) => {
            return (
              <div key={index} className="bg-primary/10 animate-pulse h-44 w-full rounded-lg shadow-lg"></div>
            )
          })}
        </div>
      }
      {!loading &&
        todoData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2">
          {
            todoData
              .filter(todo => todo.title.toLowerCase().includes(filter.toLowerCase()))
              .filter(todo => filterCompleted === -1 || Number(todo.completed) === filterCompleted)
              .map((todoItem) => (
                <TodoComponent todoItem={todoItem} key={todoItem.id} />
              ))
          }
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center">
          <h1 className="flex flex-col justify-center items-center gap-6 text-3xl font-semibold bg-primary/10 p-6">
            <span>Add a todo</span>
            <span>OR</span>
            <span>Fetch todos by clicking on top left side</span>
          </h1>
        </div>
      )
      }
    </main>
  );
}


// with nextjs jsonfakeapi no routing no http methods and server actions

// with redux or database needed specailly with server actions and prisma