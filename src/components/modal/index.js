import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import {createTodo, updateTodo} from "../../services/TodoApi"
export const CreateModal = (props) => {

    const [state,setState] = useState({
        name:"",
        title:"",
        description:"",
        completed:false,
    })
    const handleClose = () => {
        props.setState({ ...props.state, handleShow: false })
    }

    const handleOnchange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        console.log(state);
    }

    const onSubmit = () =>
    {
        !!props.id ? createTodo(state) : updateTodo(props.id, state);
        handleClose();
    }

    useEffect(() => {
        if(!!props.id) setState({...state, id: props.id });
    }, [])

    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Name (Required)</label>
                        <TextField
                            name="name"
                            //label="Title"
                            type="text"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => (handleOnchange(e))}
                        />
                    </div>
                    <div>
                        <label>Title (Required)</label>
                        <TextField
                            name="title"
                            //label="Title"
                            type="text"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => (handleOnchange(e))}
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <TextField
                            name="description"
                            //label="Title"
                            type="text"
                            variant="outlined"
                            multiline
                            textarea
                            rows={5}
                            fullWidth
                            onChange={(e) => (handleOnchange(e))}
                        />
                    </div>
                    <br />
                    <Button variant="secondary" className="mr-3" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick= {onSubmit} >
                        Save
                    </Button>
                </Modal.Body>

            </Modal>
        </>
    );
}