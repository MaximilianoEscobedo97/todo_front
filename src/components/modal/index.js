import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { createTodo, updateTodo } from "../../services/TodoApi"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

export const CreateModal = (props) => {

    

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

    const classes = useStyles();

    const [state, setState] = useState({
        name: !!props.data ? props.data.name : "",
        title: !!props.data ? props.data.title : "",
        description: !!props.data ? props.data.description : "",
        completed: !!props.data ? !!props.data.completed : false,
    })
    const handleClose = () => {
        props.setState({ ...props.state, handleShow: false })
    }

    const handleOnchange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });

    }

    const onSubmit = () => {

        !!props.data ? updateTodo(props.data.id, state) : createTodo(state)
        handleClose();
    }

    useEffect(() => {
        if (!!props.data) setState({ ...state, id: props.data.id });
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
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  
                    <div>
                        <label>Name (Required)</label>
                        <TextField
                            name="name"
                            //label="Title"
                            value={state.name}
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
                            value={state.title}
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
                            value={state.description}
                            type="text"
                            variant="outlined"
                            multiline
                            textarea
                            rows={5}
                            fullWidth
                            onChange={(e) => (handleOnchange(e))}
                        />
                    </div>

                    {!!props.data &&
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel >Completed</InputLabel>
                            <Select
                                name="completed"
                                value={state.completed}
                                onChange={handleOnchange}
                                label="Completed"
                                autoWidth={true}
                                fullWidth
                            >
                                <MenuItem value={true}>Status: Success</MenuItem>
                                <MenuItem value={false}>Status: Pending</MenuItem>
                            </Select>
                        </FormControl>
                    }


                    <br />
                    <Button variant="secondary" className="mr-3" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmit} >
                        Save
                    </Button>
                </Modal.Body>

            </Modal>
        </>
    );
}