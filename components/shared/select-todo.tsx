import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectTodoProps = {
    setFilterCompleted : React.Dispatch<React.SetStateAction<number>>;
}

export function SelectTodo({setFilterCompleted}:SelectTodoProps) {
  return (
    <Select onValueChange={(value)=>setFilterCompleted(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Todos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Completed</SelectLabel>
          <SelectItem value="-1">all</SelectItem>
          <SelectItem value="1">true</SelectItem>
          <SelectItem value="0">false</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
