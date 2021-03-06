import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Switch, useCheckboxState, Checkbox} from 'pretty-checkbox-react';
import Button from '@mui/material/Button';
import '@djthoms/pretty-checkbox'
import API from "../../src/API_Interface/API_Interface";
import ImageList from "@mui/material/ImageList";
import Card from "@mui/material/Card";
import {CardActionArea, TableHead} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {Link} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

export default function GamesPage(customTheme) {
    const [value, setValue] = React.useState(0);
    const [genres, setGenres] = React.useState([]);
    const [perspectives, setPerspectives] = React.useState([]);
    const [platforms, setPlatforms] = React.useState([]);

    const [genreList, setGenreList] = React.useState([]);
    const [perspectiveList, setPerspectiveList] = React.useState([]);
    const [platformList, setPlatformList] = React.useState([]);

    let [page, setPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tableState, setTableState] = React.useState([])
    const [sortState, setSortState] = React.useState('aggregated_rating');
//handleChange handles the Genre Player Perspective Platform table

    const [checked, setChecked] = React.useState(false);
    let [text, setText] = React.useState('');


    const handleTextBoxChange = (event) => {
        setSortState(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
        console.log(event.target.value);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
        if(newValue === 0) {
            for (let i = 0; i < genreList.length; i++) {
                console.log(genreList[i]);
            }
        }
    };

    const handlePageChange = (event, value) => {
        page = value
        setPage(page)
        genTable()
    }

    const handleGenreChange = (event) => {
        for (let i = 0; i < genreList.length; i++){
            if (event === genreList[i]){
                genreList.splice(i, 1)
                console.log(genreList)
                return
            }
        }
        genreList.push(event)
        console.log(genreList)
    }

    const handlePerspectiveChange = (event) => {
        for (let i = 0; i < perspectiveList.length; i++){
            if (event === perspectiveList[i]){
                perspectiveList.splice(i, 1)
                console.log(perspectiveList)
                return
            }
        }
        perspectiveList.push(event)
        console.log(perspectiveList)
    }

    const handlePlatformChange = (event) => {
        for (let i = 0; i < platformList.length; i++){
            if (event === platformList[i]){
                platformList.splice(i, 1)
                console.log(platformList)
                return
            }
        }
        platformList.push(event)
        console.log(platformList)
    }

    useEffect( () => {
        const api = new API();
        async function genreTypes(){
            const genresJSONStringType = await api.genres()
            for(let i = 0; i < genresJSONStringType.data.length; i++){
                genresJSONStringType.data[i].checked = false
            }
            setGenres(genresJSONStringType.data)
        }
        //console.log(genres)
        genreTypes()
    },[]);

    useEffect(()=>{
        const api = new API();
        async function perspectiveTypes(){
            const perspectivesJSONStringType = await api.perspectives()
            setPerspectives(perspectivesJSONStringType.data)
        }
        perspectiveTypes()
    }, []);

    useEffect(()=>{
        const api = new API();
        async function platformsTypes() {
            const platformsJSONStringType = await api.platforms()
            setPlatforms(platformsJSONStringType.data)
        }
        platformsTypes()
    },[]);

    //console.log("printing out perspectives: ", perspectives)

    const genTable = () => {
        const api = new API();
        let start_idx = (page - 1) * 102
        async function genTable() {
            let tableJSONStringType
            if(text === ''){
                if (sortState === 'aggregated_rating') {
                    tableJSONStringType = await api.gamesWithFilterRatingNoText(genreList, platformList, perspectiveList, start_idx)
                }
                if (sortState === 'recent') {
                    tableJSONStringType = await api.gamesWithFilterRecentNoText(genreList, platformList, perspectiveList, start_idx)
                }
                if (sortState === 'alphabetical') {
                    tableJSONStringType = await api.gamesWithFilterAlphaNoText(genreList, platformList, perspectiveList, start_idx)
                }
                const numberJSONStringType = await api.gamesNumberWithFilterNoText(genreList,platformList,perspectiveList);
                setNumPages(Math.round(numberJSONStringType.data[0].count / 102))
                setTableState(tableJSONStringType.data)
            }
            if(text !== '') {
                if (sortState === 'aggregated_rating') {
                    tableJSONStringType = await api.gamesWithFilterRating(genreList, platformList, perspectiveList, text, start_idx)
                }
                if (sortState === 'recent') {
                    tableJSONStringType = await api.gamesWithFilterRecent(genreList, platformList, perspectiveList, text, start_idx)
                    console.log("printing tableJsonStringType", tableJSONStringType.data)
                }
                if (sortState === 'alphabetical') {
                    tableJSONStringType = await api.gamesWithFilterAlpha(genreList, platformList, perspectiveList, text, start_idx)
                }
                const numberJSONStringType = await api.gamesNumberWithFilter(genreList,platformList,perspectiveList, text);
                setNumPages(Math.round(numberJSONStringType.data[0].count / 102))
                setTableState(tableJSONStringType.data)
            }


        }
        genTable()
    }

    useEffect( () => {
        genTable();
    }, []);

    return (
        <Fragment>
            <div className="wrap">

                <div class="floatleft">

                    <Box marginX={5} marginTop={5}>
                        <h2>Genres</h2>
                        {genres.map(item=>(
                            <Checkbox value={item.name} onClick={() => handleGenreChange(item.id)} animation="smooth">{item.name}</Checkbox>
                        ))}

                    </Box>
                    <Box marginX={5} marginTop={5}>
                        <h2>Player Perspectives</h2>
                        {perspectives.map((item) =>(
                            <Checkbox value={item.name} onClick={() => handlePerspectiveChange(item.id) } animation="smooth">{item.name}</Checkbox>
                        ))}
                    </Box>
                    <Box marginX={5} marginTop={5}>
                        <h2>Platforms</h2>
                        {platforms.map((item) =>(
                            <Checkbox value={item.name} onClick={() => handlePlatformChange(item.id)} animation="smooth">{item.name}</Checkbox>
                        ))}
                    </Box>
                </div>
                <div className="floatright">
                    <Box marginX={20} marginTop={5}>
                        <Box display={"inline-flex"}>
                            <Box width={150}>
                                <FormControl fullWidth={true}>
                                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                    <Select
                                        color="secondary"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={sortState}
                                        label="Sort By"
                                        onChange={handleTextBoxChange}
                                        onClick={console.log("")}
                                    >

                                        <MenuItem value={"aggregated_rating"} >Rating</MenuItem>
                                        <MenuItem value={"alphabetical"}>Alphabetical</MenuItem>
                                        <MenuItem value={"recent"}>Recent</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box marginX={2} >
                                <TextField color="secondary" label="Search By Name" onChange={handleTextChange}></TextField>
                            </Box>
                            <Button variant="contained" onClick={() => genTable()}>Filter</Button>
                        </Box >
                        <ImageList cols = {6}>
                            {tableState.map((item) => (
                                <Card sx={{ minWidth: 200 }}>
                                    <CardActionArea component={Link} to={{pathname: `/games/${item.slug}`, state: {game:item}}}>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.image_id}.png?w=248&fit=crop&auto=format`}
                                            alt={item.title}
                                        />
                                        <CardContent sx={{height: 80, overflow: 'ellipsis'}}>
                                            <Typography variant="subtitle" component="div">
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </ImageList>
                        <Box display="flex" align="center" justifyContent="center" marginBottom={2}>
                            <Stack spacing={2}>
                                <Pagination count={numPages} page={page} onChange={handlePageChange} variant="outlined" />
                            </Stack>
                        </Box>
                    </Box>
                </div>
            </div>
        </Fragment>
    );
}
/*
*/
const divStyle={
    overflowY: 'scroll',
    width: '1450px',
    float: 'justify',
    height:'155px',
    position:'relative',
    padding: '1px',
};
const divStyle2={
    overflowY: 'scroll',
    overflowX: 'none',
    width: '1900px',
    height:'1000px',
    position:'relative',
    paddingLeft: '20px',
    paddingRight: '20px'
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const spread2evenly={
    display: 'inline-block',
    zoom: 1, /* Trigger hasLayout */
    align:'center',
    overflowY: 'scroll',
    width: '1900px',
}

const split={
    height: '100%',
    width: '50%',
    position: 'fixed',
    top: '0',
    right: '0'
}

const right={
    right: '0'
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}