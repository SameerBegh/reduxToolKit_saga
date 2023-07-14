import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { ITodo } from '../utility/types';
import { RootState } from '../reduxToolKit';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDialogSlide from '../customMUI/MUIDailog';
import { useSelector, useDispatch } from 'react-redux'
import TableContainer from '@mui/material/TableContainer';
import { updateStatus } from '../reduxToolKit/slices/todoSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Row = (props: { row: ITodo, index: number }) => {
    const { row, index } = props;
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    // const [edit, setEdit] = useState(false);
    const dispatch = useDispatch()

    const handleChange = (id: number) => {
        dispatch(updateStatus(id))
    };

    const handleDelete = () => {
        // setOpenAlert(!openAlert)
        setOpenAlert(!openAlert)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    sx={{
                        textDecoration: row.isDone ? "line-through" : null,
                        fontSize: "17px"
                    }}>
                    {row.todo}
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    sx={{
                        color: row.isDone ? "Green" : "red",
                        fontSize: "17px"
                    }}>
                    {row.isDone ? 'Completed' : 'Pending'}
                </TableCell>
                <TableCell component="th" scope="row">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <Checkbox
                            checked={row.isDone && true}
                            onChange={() => handleChange(row.id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="success"
                        />
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon
                                onClick={() => handleDelete()}
                                sx={{ cursor: "pointer" }} />
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Reminder
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Created Time</TableCell>
                                        <TableCell>Updated At</TableCell>
                                        <TableCell>Updated Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detail?.map((data) => (
                                        <TableRow key={data.created}>
                                            <TableCell component="th" scope="row">
                                                {data.created}
                                            </TableCell><TableCell component="th" scope="row">
                                                {data.createdTime}
                                            </TableCell>
                                            <TableCell>{data.updated}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {data.updatedTime}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <MUIDialogSlide
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                id={index}
            />
        </>
    );
}

const TodoList = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const [todoList, setTodoList] = useState(todos)
    useEffect(() => {
        setTodoList(todos)
    }, [todos])
    return (
        <Box sx={{ display: "flex", mt: "20px", justifyContent: "center" }}>
            <TableContainer component={Paper} sx={{ width: "810px" }}>
                <Table aria-label="collapsible table">
                    <TableHead >
                        <TableRow >
                            <TableCell />
                            <TableCell sx={{ fontSize: "17px" }}>Todo Task</TableCell>
                            <TableCell sx={{ fontSize: "17px" }}>Status</TableCell>
                            <TableCell sx={{ fontSize: "17px" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            todoList.length > 0 ?
                                todoList.map((row, index) => (
                                    <Row key={row.id} row={row} index={index} />
                                )) : <TableRow>
                                    <TableCell colSpan={4}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "50px"
                                            }}>
                                            <Typography variant='h6'>No Task</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default TodoList