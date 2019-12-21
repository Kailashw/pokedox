import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input, TextField, MenuItem, Select } from "@material-ui/core";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function SimpleModal({ categories, save }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [name, setcategoryName] = React.useState("")
    const [categoryId, setcategoryId] = React.useState(null)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formSubmit = () => {
        let res = {
            name: name,
            categoryId: categoryId
        }
        save(res)
        handleClose()
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}> Add to category </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form
                        onSubmit={() => formSubmit()}
                        className={classes.root} noValidate autoComplete="off">
                        <p id="simple-modal-description">
                            Select From Below Categories
                    </p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            onChange={(e) => setcategoryId(e.target.id)}
                        >
                            {
                                categories.length > 0 &&
                                categories.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)
                            }
                        </Select>
                        <p id="simple-modal-description">
                            Create a new Categories
                    </p>
                        <TextField value={name} onChange={(e) => setcategoryName(e.target.value)} id="standard-basic" label="Standard" />
                        <Button type="submit" variant="contained" color="primary"> Save </Button>
                    </form>
                </div>
            </Modal>
        </div >
    );
}