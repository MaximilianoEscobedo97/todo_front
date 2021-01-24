import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { show, updateTodoCompleted, deleteTodo } from "../../services/TodoApi"
import {CreateModal} from "../modal"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export function SwipeableTemporaryDrawer({ toggleSidebar, parent_state, parent_setState, id , setEditModal, setEditData}) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    handleShow: false,
  });

  const [todo, setTodo] = useState({
    id: "",
    title: "0",
    name: "",
    completed: 0,
    description: "",
    created: "",
  })

  const [completed, setCompleted] = useState('');
  const handleChange = (event) => {
    setCompleted(event.target.value);
    handleUpdateCompleted();
  };

  const handleUpdateCompleted = async () => {
    await updateTodoCompleted(todo.id);
  }


  const handleDelete = async () => {
    await deleteTodo(todo.id);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!!open) {
      setState({ ...state, [anchor]: true });
    } else {
      setState({ ...state, [anchor]: false });
      parent_setState({ ...parent_state, toggleSidebar: false })
    }
  };

  const handleEdit = () =>
  {
    setEditModal(true);
  }

  useEffect(() => {
    if (!!toggleSidebar) {
      setState({ ...state, ["right"]: true });
    } else {
      setState({ ...state, ["right"]: false });
      parent_setState({
        ...parent_state,
        toggleSidebar: false
      })
    }

    if (!!id) getTodo();
  }, [toggleSidebar])

  const getTodo = async () => {
    let response = await show(id);
    let data = response.data.todo;
    setTodo({
      ...todo,
      id: data.id,
      name: data.name,
      title: data.title,
      completed: data.completed,
      created: data.created,
      description: data.description
    })
    setCompleted(!!data.completed);

    setEditData(data);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="container-fluid p-5 ">
        <h2 className="font-weight-bold mb-5">{todo.title}</h2>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Completed</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={completed}
            onChange={handleChange}
            label="Completed"
            autoWidth={true}
            fullWidth
          >
            <MenuItem value={true}>Status: Success</MenuItem>
            <MenuItem value={false}>Status: Pending</MenuItem>
          </Select>
        </FormControl>
        <div className="mt-5">
          <h6 className="font-weight-bold">Created</h6>
          <p>{todo.created}</p>
        </div>
        <div className="mt-5">
          <h6 className="font-weight-bold">Description</h6>
          <p>{todo.description}</p>
        </div>

        <div className="d-flex align-items-end" >
          <Button onClick={handleEdit} 
            variant="contained" 
            className="text-primary mr-5"
          > 
            <AiOutlineEdit /> Edit
          </Button>
          <Button onClick={handleDelete}
            variant="contained"
            className="text-danger mr-3"
          >
            <RiDeleteBin6Line /> Delete
         </Button>
        </div>

      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment >
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
        
      </React.Fragment>

    </div>
  );
}