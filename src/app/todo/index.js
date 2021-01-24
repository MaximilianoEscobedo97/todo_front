import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { TableTodo } from "../../components/table"
import { index } from "../../services/TodoApi"
import { AiOutlinePlusCircle } from "react-icons/ai"
import {CreateModal} from "../../components/modal"
import "./index.css";

export const Todo = () => {
    const [state, setState] = useState({
        created: "",
        todos: [],
        allTodos: [],
        handleShow: false
    });

    useEffect(() => {
        getRows();
    }, [])

    const getRows = async () => {
        let response = await index();
        let todos = response.data.todos
        setState({ ...state, todos, allTodos: todos })
    }

    useEffect(() => {
        if (state.created !== "") {
            let todos = state.allTodos.filter(todo => todo.created === state.created)
            setState({ ...state, todos })
        }
    }, [state.created])

    const handleOnchange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        console.log(state);
    }

    const handleButtonCreate =()=>
    {
        setState({...state,handleShow: true})
    }

    return (
        <div className="container-fluid p-5">
            <h2 className="font-weight-bold mb-4">My Tasks</h2>
            <div className="container-fluid bg-white fill card">
                <div className="row justify-content-between p-3">
                    <div className="align-self-center" >
                        <h5 className="font-weight-bold m-2">Tasks</h5>
                    </div>
                    <div className="row">
                        <div className="align-self-end">
                            <TextField
                                type="date"
                                id="created"
                                name="created"
                                defaultValue="Default Value"
                                placeholder="Created"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                margin="dense"
                                variant="outlined"
                                onChange={(e) => (handleOnchange(e))}
                            />
                        </div>
                        <div className="border-end h-75 mx-3">
                            <span onClick={()=>handleButtonCreate()} >
                                <a className="btn btn-outline-light text-primary font-weight-medium">
                                    <AiOutlinePlusCircle />
                                    <span> Add Task</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                <TableTodo rows={state.todos}/>
            {state.handleShow && <CreateModal
             state = {state}
             setState = {setState}
            />}
            </div>

        </div>

    )

}