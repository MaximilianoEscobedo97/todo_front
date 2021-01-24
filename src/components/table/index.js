import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {SwipeableTemporaryDrawer} from "../../components/sidebar"
import Paper from '@material-ui/core/Paper';
import { HiOutlineCheckCircle } from "react-icons/hi";
import {CreateModal} from "../../components/modal"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function TableTodo(props) {
  const classes = useStyles();

  const onSelectRow = (id) => {
    setState({toggleSidebar: true, selectedId: id})
  }
  const [editModal,setEditModal] = useState(false);

  const [state, setState] = useState({
    handleShow: false,
    toggleSidebar: false,
    selectedId: null,
  })

  const [editData,setEditData] = useState({});
  
  useEffect(()=>{
    setEditModal(false);
    props.setTableUpdate(true);
  },[state.handleShow])

  const setToggleSidebar = (state_) => {
    setState(state_);
  }

  return (
    <div className="table-responsive-material">
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-weight-bold" align="left"></TableCell>
              <TableCell className="font-weight-bold" align="left">Title</TableCell>
              <TableCell className="font-weight-bold" align="left">Created</TableCell>
              <TableCell className="font-weight-bold" align="left">Description</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.id} className="fila" onClick={onSelectRow.bind(null, row.id)} >
                <TableCell align="left"><HiOutlineCheckCircle/></TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.created}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <SwipeableTemporaryDrawer
        id={state.selectedId}
        toggleSidebar={state.toggleSidebar}
        parent_state={state}
        parent_setState={setState}
        setEditModal = {setEditModal}
        setEditData = {setEditData}
      />
      
      {editModal && <CreateModal data = {editData} title={"Edit Task"} state={state} setState={setState} id={state.selectedId} />}

    </div>
  );
}