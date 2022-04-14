// import React,{useState,useEffect}from"react";
// import axios from "axios";

// const todoDataUrl = "http://localhost:3100/todos/"
import React,{ useRef } from "react";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

// const TodoTitle = ({title,as}) => {
//     if(as === "h1") return <h1>{title}</h1>;

//     if(as === "h2") return <h2>{title}</h2>;

//     return <p>{title}</p>
// }

// const TodoItem = ({todo,toggleTodoListItemStatus,deleteTodoListItem}) => {
//     const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id,todo.done);

//     const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);
//     return (
//         <li>

//     {todo.content}
//     <button onClick={handleToggleTodoListItemStatus}>
//         {todo.done ? "未完了リストへ" : "完了リストへ"}</button>

//     <button onClick={handleDeleteTodoListItem}>削除</button>

//         </li>

//     );
// }
    


// const TodoList = ({todoList,toggleTodoListItemStatus,deleteTodoListItem}) => {
//     return (
//         <ul>
//     {todoList.map((todo) => (
//     <TodoItem 
//      todo={todo}
//      key={todo.id}
//      toggleTodoListItemStatus = {toggleTodoListItemStatus}
//      deleteTodoListItem = {deleteTodoListItem}
//       />
//     ))}
//         </ul>
//     )
// }

// const TodoAdd = ({inputEl,handleAddTodoListItem}) => {
//     return (
//         <>
//         <textarea ref={inputEl} />
//         <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
//         </>
//     )
// }

function App(){
    // const [todoList, setTodoList] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () =>{
    //         const response = await axios.get(todoDataUrl);

    //         setTodoList(response.data);
    //     }
    //     fetchData();
    // },[]);
    const{
        todoList,
        addTodoListItem,
        toggleTodoListItemStatus,
        deleteTodoListItem
    } = useTodo();

    const inputEl = useRef(null);

    const handleAddTodoListItem = () => {
        if(inputEl.current.value === "") return;

        addTodoListItem(inputEl.current.value);
        inputEl.current.value = "";
    }

    console.log("TODOリスト:",todoList);

    const inCompletedList = todoList.filter((todo) => {
        return !todo.done;
    })

    const completedList = todoList.filter((todo) => {
        return todo.done;
    })

    return (
        <Container centerContent p={{base: "4",md: "6"}} maxWidth="3xl">
        <TodoTitle title="Todo進捗管理"
        as="h1"
        fontSize={{base: "2xl",md:"3xl"}}/>

        <TodoAdd 
        placeholder="ADD TODO"
        leftIcon={<AddIcon />}
        buttonText="TODOを追加" inputEl={inputEl} handleAddTodoListItem = {handleAddTodoListItem} />

        <TodoList  
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title="未完了TODOリスト"
        as="h2"
        fontSize={{base:"xl",md:"2xl"}} />

        <TodoList  
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title="完了TODOリスト"
        as="h2"
        fontSize={{base:"xl",md:"2xl"}} />
        </Container>
    )
}

export default App;