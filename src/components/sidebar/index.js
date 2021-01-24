import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {AiOutlineEdit} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import { show } from "../../services/TodoApi"


const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
});

export  function SwipeableTemporaryDrawer({ toggleSidebar, parent_state, parent_setState, id }) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!!open){ 
      setState({ ...state, [anchor]: true });
    } else {
      setState({ ...state, [anchor]: false });
      parent_setState({ ...parent_state, toggleSidebar:false })
    }
  };

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (!!toggleSidebar){ 
      setState({ ...state, ["right"]: true });
    } else {
      setState({ ...state, ["right"]: false });
      parent_setState({
        ...parent_state,
        toggleSidebar:false
      })
    }
    let getTodo = async () => {
      let response = await show(id);
      console.log(response);
    };
    if(!!id) getTodo();
  }, [toggleSidebar])

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
     <h2 className="font-weight-bold">My Tasks</h2>

      <br/>
     <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>     
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
          autoWidth
        >
          <MenuItem value={true}>Status: Success</MenuItem>
          <MenuItem value={false}>Status: Pending</MenuItem>
        </Select>
      </FormControl>
      <div className = "mt-5">
        <h6 className = "font-weight-bold">Created</h6>
      </div>
      <div className = "mt-5">
        <h6 className = "font-weight-bold">Description</h6>
      </div>

      <div className="d-flex align-items-end" >
        <Button onClick={()=>{ parent_setState({ ...parent_state,  handleShow: true}) }} variant="contained" className="text-primary"> <AiOutlineEdit/> Editar</Button>
        <Button variant="contained"><RiDeleteBin6Line/> Eliminar</Button>
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