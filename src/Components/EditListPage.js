import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import API from "../API_Interface/API_Interface";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditListPage({user, setLists}) {
    const [list, setList] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const location = useLocation();
    const {mylist} = location.state;

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleDelete = async () => {
        handleDeleteClose();
        const api = new API();
        await api.deleteList(mylist);
        await updateLists();
        setDeleted(true);
    }

    const updateLists = async () => {
        const api = new API();
        const listsJSONString = await api.getAllLists(user);
        console.log(`lists: ${JSON.stringify(listsJSONString)}`);
        setLists(listsJSONString.data);
    }

    const handleGameDelete = async (id) => {
        console.log(id);
        const api = new API();
        await api.removeGame(mylist, id);
        await getList();
    }

    async function getList() {
        const api = new API();
        const JSONList = await api.getList(mylist);
        console.log(`List: ${JSON.stringify(JSONList)}`);
        setList(JSONList.data);
    }

    useEffect( () => {
        getList();
    }, []);

    return (
        <Fragment>
            {user === undefined ? <Redirect to="/"></Redirect> :
                <Typography></Typography>
            }
            {deleted === true ? <Redirect to="/lists"></Redirect> :
                <Typography></Typography>
            }
            <Box marginX={20} marginTop={2}>
                <Box display="flex">
                    <Typography variant="h6"  component="div" marginRight={2}>
                        Editing List
                    </Typography>
                    <Button variant="contained" onClick={handleDeleteOpen}>
                        Delete
                    </Button>
                    <Dialog
                        open={openDelete}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete this list?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You will not be able to recover your list once deleted.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose}>Cancel</Button>
                            <Button onClick={handleDelete}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <ImageList cols={7}>
                    {list.map((item) => (
                        <Card sx={{ minWidth: 200, height: 350}}>
                            <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                />
                                <CardContent sx={{height: 45, overflow: 'hidden'}}>
                                    <Typography variant="subtitle" component="div">
                                        {item.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <IconButton size="small" onClick={() => handleGameDelete(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </ImageList>
            </Box>
        </Fragment>
    );
}