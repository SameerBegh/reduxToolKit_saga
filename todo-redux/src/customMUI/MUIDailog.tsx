import React, { Dispatch, ReactElement, Ref, forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { deleteTodo } from '../reduxToolKit/slices/todoSlice';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IMUIDialogSlide {
    openAlert: boolean,
    setOpenAlert: Dispatch<React.SetStateAction<boolean>>,
    id: number
}
const MUIDialogSlide = ({ openAlert, setOpenAlert, id }: IMUIDialogSlide) => {
    const dispatch = useDispatch()
    const handleClose = () => {
        setOpenAlert(false);
    };
    const handleDelete = () => {
        dispatch(deleteTodo(id))
        setOpenAlert(false);
    }
    return (
        <div>
            <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle>{"Do you want to delete the task!"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default MUIDialogSlide