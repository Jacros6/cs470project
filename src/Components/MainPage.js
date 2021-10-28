import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import API from "../API_Interface/API_Interface";
import * as PropTypes from "prop-types";
import {useAutocomplete} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const flexContainer = {
    display: 'flex',
    height: 350,
    flexDirection: 'row',
    flexShrink: 0,
    flexBasis: 0,
    overflowX: 'none',
    padding: 10,
};

export default function MainPage() {
//style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', overflow: 'hidden',padding: 0
    const [recentGames, setRecentGames] = useState([]);
    const [topGames, setTopGames] = useState([]);

    useEffect( () => {
        const api = new API();

        async function getRecentGames() {
            const recentJSONString = await api.recentGames();
            console.log(`recent games from DB ${JSON.stringify(recentJSONString)}`);
            setRecentGames(recentJSONString.data);
        }

        getRecentGames();
    }, []);

    useEffect( () => {
        const api = new API();

        async function getTopGames() {
            const topJSONString = await api.topGames();
            console.log(`top games from DB ${JSON.stringify(topJSONString)}`);
            setTopGames(topJSONString.data);
        }

        getTopGames();
    }, []);



 return (
     <Fragment>

         <Box display="flex" justifyContent="left" alignItems="center" width="25%" m={4}>
             <Typography variant="h6"  component="div">
                 New Releases
             </Typography>
         </Box>

         <ImageList style={flexContainer}>
             {recentGames.map((item) => (
                 <Card sx={{ minWidth: 200 }}>
                     <CardActionArea>
                         <CardMedia
                             component="img"
                             height="240"
                             image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                             alt={item.title}
                         />
                         <CardContent sx={{height: 80, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                             <Typography variant="subtitle1" component="div">
                                 {item.name}
                             </Typography>
                         </CardContent>
                     </CardActionArea>
                 </Card>
             ))}
         </ImageList>


         <Box display="flex" justifyContent="left" alignItems="center" width="25%" m={4}>
             <Typography variant="h6"  component="div">
                 Top Rated
             </Typography>
         </Box>

         <ImageList style={flexContainer}>
             {topGames.map((item) => (
                 <Card sx={{ minWidth: 200 }}>
                     <CardActionArea>
                         <CardMedia
                             component="img"
                             height="240"
                             image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                             alt={item.title}
                         />
                         <CardContent sx={{height: 80, overflow: 'ellipsis'}}>
                             <Typography  variant="subtitle" component="div">
                                 {item.name}
                             </Typography>
                         </CardContent>
                     </CardActionArea>
                 </Card>
             ))}
         </ImageList>

     </Fragment>
    );
}