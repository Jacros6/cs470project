import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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
};

export default function ListsPage({lists}) {
    const [combined, setCombined] = useState([]);
    const [stateChange, setStateChange] = useState(false);

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

    useEffect( () => {

        async function waitList() {
            const arr = await genList();
            console.log(JSON.stringify(arr));
            setCombined(arr);
        }

        waitList();
    }, []);

    useEffect( () => {
        if( stateChange === false ) {
            setStateChange(true);
        } else {
            setStateChange(false);
        }
    }, [combined]);

    return (
        <Fragment>
            {combined.map( (list) => (
                <Box marginX={20}>
                    <Box display="flex" justifyContent="left" alignItems="center" width="25%" m={4}>
                        <Typography variant="h6"  component="div">
                            {list.listname}
                        </Typography>
                    </Box>
                    <ImageList style={flexContainer}>
                        {list.data.map( (item) => (
                            <Card sx={{ width: 200 }}>
                                <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                    <CardMedia
                                        component="img"
                                        height="250"
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
            ))}
        </Fragment>
    );
}