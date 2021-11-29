import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import API from "../API_Interface/API_Interface";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const flexContainer = {
    display: 'flex',
    height: 350,
    flexDirection: 'row',
    flexShrink: 0,
    flexBasis: 0,
    overflowX: 'none',
};

export default function ListsPage({user, lists, setLists}) {
    const [combined, setCombined] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const handleFormOpen = () => {
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
    };

    const handleCreate = async (event) => {
        handleFormClose();
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inputName = data.get('listName');

        const api = new API();
        await api.createList(user, inputName);
        await updateLists();
    }

    const updateLists = async () => {
        const api = new API();
        const listsJSONString = await api.getAllLists(user);
        console.log(`lists: ${JSON.stringify(listsJSONString)}`);
        setLists(listsJSONString.data);
    }

    const refresher = () => {
        if( stateChange === false ) {
            setStateChange(true);
        } else {
            setStateChange(false);
        }
    }

    async function genList() {
        const api = new API();
        let array = [];

        await Promise.all(lists.map(async (list) => {
            const JSONList = await api.getList(list.listid);
            const tempObject = Object.assign(list, JSONList);
            array.push(tempObject);
        }));
        console.log(JSON.stringify(array));
        return array;
    }

    async function waitList() {
        const arr = await genList();
        console.log(JSON.stringify(arr));
        setCombined(arr);
    }

    useEffect( () => {
        waitList();
    }, []);

    useEffect( () => {
        waitList();
    }, [lists]);

    useEffect( () => {
        refresher();
    }, [combined]);

    return (
        <Fragment>
            {user === undefined ? <Redirect to="/"></Redirect> :
                <Typography></Typography>
            }
            <Box marginX={20} marginTop={4}>
                 <Button variant="outlined" onClick={handleFormOpen}>
                     Create New List
                 </Button>
            </Box>
            <Dialog open={openForm} onClose={handleFormClose}>
                <DialogTitle>Create New List</DialogTitle>
                <DialogContent>
                    <form id="myform" onSubmit={handleCreate}>
                        <TextField
                            name="listName"
                            autoFocus
                            margin="dense"
                            id="listName"
                            label="List Name"
                            fullWidth
                            color="secondary"
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormClose}>Cancel</Button>
                    <Button type="submit" form="myform">Submit</Button>
                </DialogActions>
            </Dialog>
            {combined.map( (list) => (
                <Box marginX={20}>
                    <Paper>
                        <Box margin={2} padding={1}>
                            <Box display="flex" justifyContent="left" alignItems="center">
                                <Typography variant="h6"  component="div" sx={{flexGrow: 1}}>
                                    {list.listname}
                                </Typography>
                                <Button variant="contained" color="primary" component={Link} to={{pathname: `/lists/edit`, state: {mylist:list.listid}}}>
                                    Edit
                                </Button>
                            </Box>
                            <ImageList style={flexContainer}>
                                {list.data.map( (item) => (
                                    <Card sx={{ minWidth: 200, maxWidth:200, backgroundColor:"#1d3f53" }}>
                                        <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                                alt={item.title}
                                            />
                                            <CardContent sx={{height: 100, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                <Typography variant="subtitle" component="div">
                                                    {item.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </ImageList>
                        </Box>
                    </Paper>
                </Box>
            ))}
        </Fragment>
    );
}