import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import API from "../API_Interface/API_Interface";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea, CardActions } from '@mui/material';
import Paper from "@mui/material/Paper";

const flexContainer = {
    display: 'flex',
    height: 360,
    flexDirection: 'row',
    flexShrink: 0,
    flexBasis: 0,
    overflowX: 'none',
};

export default function MainPage({lists}) {
    const [recentGames, setRecentGames] = useState([]);
    const [topGames, setTopGames] = useState([]);
    const currentDate = Date.now()/1000;

    useEffect( () => {
        const api = new API();

        async function getRecentGames() {
            const recentJSONString = await api.recentGames(currentDate);
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
         <Box marginX={20}>
             <Paper>
                 <Box margin={2} padding={1}>
                     <Box display="flex" justifyContent="left" alignItems="center" width="25%">
                         <Typography variant="h6"  component="div">
                             New Releases
                         </Typography>
                     </Box>
                     <ImageList style={flexContainer}>
                         {recentGames.map((item) => (
                             <Card sx={{ minWidth: 200, backgroundColor: "#1d3f53" }}>
                                 <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                     <CardMedia
                                         component="img"
                                         height="250"
                                         image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                         alt={item.title}
                                     />
                                     <CardContent sx={{height: 110, overflow: 'hidden', textOverflow: 'ellipsis'}}>
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

             <Paper>
                 <Box margin={2} padding={1}>
             <Box display="flex" justifyContent="left" alignItems="center" width="25%">
                 <Typography variant="h6"  component="div">
                     Top Rated
                 </Typography>
             </Box>
             <ImageList style={flexContainer} >
                 {topGames.map((item) => (
                     <Card sx={{ minWidth: 200, backgroundColor: "#1d3f53"  }}>
                         <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                             <CardMedia
                                 component="img"
                                 height="250"
                                 image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                 alt={item.title}
                             />
                             <CardContent sx={{height: 110, overflow: 'ellipsis'}}>
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
     </Fragment>
    );
}