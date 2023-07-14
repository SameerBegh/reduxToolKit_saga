import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { IUser } from '../utility/types';
import { RootState } from '../reduxToolKit';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { deleteUsers, getUser } from '../reduxToolKit/slices/userSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Row = (props: { row: IUser }) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
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
                <TableCell component="th" scope="row" sx={{ fontSize: "17px" }}>
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.phone}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Company Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Comapny Name</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Street</TableCell>
                                        <TableCell>Website</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            {row.company.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.address.city}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.address.street}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.website}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
const User = () => {
    const data = useSelector((state: RootState) => state.users.users);
    const isLoading = useSelector((state: RootState) => state.users.isLoading);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getUser())
    // }, [dispatch]);

    const handleUserData = () => {
        dispatch(getUser())
    }
    const handleDeleteUsers = () => {
        dispatch(deleteUsers())
    }
    return (
        <Box sx={{ display: "flex", mt: "40px", justifyContent: "center" }}>
            <Box>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group" sx={{ mb: 2 }}>
                    <Button
                        onClick={() => handleUserData()}
                        sx={{ color: "white" }}
                    >
                        Get Users
                    </Button>
                    <Button
                        sx={{ color: "white" }}
                        onClick={() => handleDeleteUsers()}
                    >
                        Delete Users
                    </Button>
                </ButtonGroup>
                <TableContainer component={Paper} sx={{ width: "810px" }}>
                    <Table aria-label="collapsible table">
                        <TableHead >
                            <TableRow sx={{}} >
                                <TableCell />
                                <TableCell sx={{ fontSize: "17px" }}>User Name</TableCell>
                                <TableCell sx={{ fontSize: "17px" }}>Email</TableCell>
                                <TableCell sx={{ fontSize: "17px" }}>Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "50px"
                                        }}>
                                        <Typography variant='h6'>Loading...</Typography>
                                    </Box>) :

                                    data.length > 0 ?
                                        data.map((row) => (
                                            <Row key={row.id} row={row} />
                                        )) : <TableRow>
                                            <TableCell colSpan={4}>
                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "50px"
                                                }}>
                                                    <Typography variant='h6'>Users data not found.</Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default User
