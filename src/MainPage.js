import * as React from 'react';
import {Fragment} from 'react';
import TopBar from './menu/TopBar'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as PropTypes from "prop-types";

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

export default function MainPage() {

 return (
     < div class="float-container">
        <TopBar/>
         <div class="rowLine">
         <h1>Top 50</h1>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
         <h1>Most Liked</h1>
     </div>
         <div class="rowLine">

        <ImageList sx={{ width: 300, height: 800 }} cols={1}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
             <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
         <ImageList sx={{ width: 300, height: 800 }} cols={1}>
             {itemData.map((item) => (
                 <ImageListItem key={item.img}>
                     <img
                         src={`${item.img}?w=248&fit=crop&auto=format`}
                         srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                         alt={item.title}
                         loading="lazy"
                     />
                     <ImageListItemBar
                         title={item.title}
                         position="below"
                     />
                 </ImageListItem>
             ))}
         </ImageList>
         </div>
     </div>
    );
}