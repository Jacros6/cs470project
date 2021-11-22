import * as React from 'react';
import {Fragment, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"
import PropTypes from 'prop-types';
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Link, useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import API from "../API_Interface/API_Interface";
import ImageList from "@mui/material/ImageList";
import {CardActionArea} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

function getDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleDateString();
}

const flexContainer = {
    display: 'flex',
    height: 350,
    flexDirection: 'row',
    flexShrink: 0,
    flexBasis: 0,
    overflowX: 'none',
};

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open, lists, game } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (data) => {
        const api = new API();
        api.addToList(data.listid, game.id);
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Lists</DialogTitle>
            <List sx={{ pt: 0 }}>
                {lists.map((data) => (
                    <ListItem button onClick={() => handleListItemClick(data)} key={data}>
                        <ListItemText primary={data.listname} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemText primary="Create List" />
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function GameSummary({lists}) {
    const location = useLocation();
    const {game} = location.state;
    const formattedDate = getDate(game.first_release_date);
    const [genres, setGenres] = React.useState('');
    const [platforms, setPlatforms] = React.useState('');
    const [similar, setSimilar] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const refresh = () => {
        return window.location.reload(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() =>{
        const api = new API();
        async function similarTypes(){
            let gamesSimilarString = ''
            for (let z = 0; z < game.similar_games.length; z++){
                if (game.similar_games[z] !== ',' && game.similar_games[z] !== '[' && game.similar_games[z] !== ']'){
                    gamesSimilarString = gamesSimilarString + game.similar_games[z]
                }
            }
            const gamesSimilarList = gamesSimilarString.split(' ')
            const tempArray = []
            for (let i = 0; i < gamesSimilarList.length; i++){
                let tempJSONString = await api.gameLookup(gamesSimilarList[i]);
                if(tempJSONString.data[0] !== undefined) {
                    tempArray.push(tempJSONString.data[0])
                }
            }
            setSimilar(tempArray)
        }
        similarTypes()
    }, [])

    useEffect( () => {
        const api = new API();
        async function genreTypes(){
            let gamesGenreString = ''
            for (let z = 0; z < game.genres.length; z++){
                if(game.genres[z] !== ',' && game.genres[z] !== '[' && game.genres[z] !== ']'){
                    gamesGenreString = gamesGenreString + game.genres[z]
                }
            }
            const gamesGenreList = gamesGenreString.split(' ')
            const genresJSONStringType = await api.genres()
            let tempString = ''
            for (let i = 0; i < genresJSONStringType.data.length; i++){
                for (let j = 0; j < gamesGenreList.length; j++){
                    if (gamesGenreList[j] == genresJSONStringType.data[i].id){

                        tempString = genresJSONStringType.data[i].name + ' ' + tempString
                    }
                }
            }
            setGenres(tempString)
        }
        genreTypes()
    },[]);

    useEffect( () => {
        const api = new API();
        async function platformTypes(){
            let gamesPlatformString = ''
            for (let z = 0; z < game.platforms.length; z++){
                if(game.platforms[z] !== ',' && game.platforms[z] !== '[' && game.platforms[z] !== ']'){
                    gamesPlatformString = gamesPlatformString + game.platforms[z]
                }
            }
            const gamesPlatformList = gamesPlatformString.split(' ')
            const platformsJSONStringType = await api.platforms()
            let tempString = ''
            for (let i = 0; i < platformsJSONStringType.data.length; i++){
                for (let j = 0; j < gamesPlatformList.length; j++){
                    if (gamesPlatformList[j] == platformsJSONStringType.data[i].id){

                        tempString = platformsJSONStringType.data[i].name + ' ' + tempString
                    }
                }
            }
            setPlatforms(tempString)
        }
        platformTypes()
    },[]);

    return (
        <Fragment>
            <Box display="flex" marginTop={10} alignItems="center" justifyContent="center">

                <Grid container width={1000} spacing={5}sx={{bgcolor: 'background.paper', border: `1px solid white`}}>

                    <Grid item xs={4} height={450}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.png?w=248&fit=crop&auto=format`}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Stack>
                            <Typography variant="h2">
                                {game.name}
                            </Typography>
                            <Typography variant="h4">
                                {formattedDate}
                            </Typography>
                            <Typography variant="subtitle1">
                                Genres: {genres}
                            </Typography>
                            <Typography variant="subtitle1">
                                Platforms: {platforms}
                            </Typography>
                            <Box>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Add to list
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">

                        </Typography>
                        <Box>
                            {game.summary}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4">
                        Similar Games
                        </Typography>
                        <Box>
                            <ImageList style={flexContainer}>
                                {similar.map((item) => (
                                    <Card sx={{ minWidth: 200 }}>
                                        <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                                alt={item.title}

                                            />
                                            <CardContent sx={{height: 80, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                <Typography variant="subtitle" component="div">
                                                    {item.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </ImageList>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                lists={lists}
                game={game}
            />
        </Fragment>
    )
}
