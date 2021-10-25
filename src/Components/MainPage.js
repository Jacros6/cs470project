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

const itemData = [
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2kh5.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
    {
        img: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png',
    },
];
const flexContainer = {
    display: 'flex',
    height: 400,
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
                 <ImageListItem key={item.id} sx={{ flexShrink: 0 }}>
                     <img
                         src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png`}
                         srcSet={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png`}
                         alt={item.name}
                         loading="lazy"
                     />
                     <ImageListItemBar
                         title={item.name}
                     />
                 </ImageListItem>
             ))}
         </ImageList>


         <Box display="flex" justifyContent="left" alignItems="center" width="25%" m={4}>
             <Typography variant="h6"  component="div">
                 Top Rated
             </Typography>
         </Box>

         <ImageList style={flexContainer}>
             {topGames.map((item) => (
                 <ImageListItem key={item.id} sx={{ flexShrink: 0 }}>
                     <img
                         src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                         srcSet={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format&dpr=2 2x`}
                         alt={item.title}
                         loading="lazy"
                     />
                     <ImageListItemBar
                         title={item.name}
                     />
                 </ImageListItem>
             ))}
         </ImageList>

     </Fragment>
    );
}