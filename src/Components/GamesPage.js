import * as React from 'react';
import {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Switch, useCheckboxState, Checkbox} from 'pretty-checkbox-react';
import Button from '@mui/material/Button';
import '@djthoms/pretty-checkbox'
import API from "../../src/API_Interface/API_Interface";
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ImageList from "@mui/material/ImageList";
import Card from "@mui/material/Card";
import {CardActionArea, TableHead} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";


//npm i pretty-checkbox pretty-checkbox-react
//npm i @djthoms/pretty-checkbox pretty-checkbox-react

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function createInitialStateNone() {
    let table = Array(0)
    table = table.map((row) =>{
        return {...table}
    })

    return {
        table
    }
}

function createTableState() {
    let table = Array(0)
    table = table.map((row) =>{
        return {...table}
    })

    return {
        table
    }
}

export default function GamesPage(customTheme) {
    const [value, setValue] = React.useState(0);
    const [genres, setGenres] = React.useState([]);
    const [perspectives, setPerspectives] = React.useState([]);
    const [platforms, setPlatforms] = React.useState([]);

    const [genreList, setGenreList] = React.useState([]);
    const [perspectiveList, setPerspectiveList] = React.useState([]);
    const [platformList, setPlatformList] = React.useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tableState, setTableState] = React.useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
        const arr4 = []
        const api = new API();
        async function genTable(){
            const tableJSONStringType = await api.allGames()
            console.log(tableJSONStringType.data.length)
            for (let i = 0; i < tableJSONStringType.data.length /*500*/; i++){
                let arr = JSON.parse(tableJSONStringType.data[i].genres)
                let arr2 = JSON.parse(tableJSONStringType.data[i].player_perspectives)
                let arr3 = JSON.parse(tableJSONStringType.data[i].platforms)

                if (genreList.length > 0){
                    for (let j = 0; j < genreList.length; j++){
                        if(JSON.parse(tableJSONStringType.data[i].genres) !== null) {
                            for (let k = 0; k < arr.length; k++) {
                                if (genreList[j] === arr[k]){
                                    arr4.push(tableJSONStringType.data[i])
                                }
                            }
                        }
                    }
                }
                if (perspectiveList.length > 0){
                    for (let j = 0; j < perspectiveList.length; j++){
                        if(JSON.parse(tableJSONStringType.data[i].player_perspectives) !== null){
                            for (let k = 0; k < arr2.length; k++) {
                                if (perspectiveList[j] === arr2[k]){
                                    arr4.push(tableJSONStringType.data[i])
                                }
                            }
                        }
                    }
                }
                if (platformList.length > 0){
                    for (let j = 0; j < platformList; j++){
                        if(JSON.parse(tableJSONStringType.data[i].platforms) !== null){
                            for (let k = 0; k < arr3.length; k++){
                                if(platformList[j] === arr3[k]){
                                    arr4.push(tableJSONStringType.data[i])

                                }
                            }
                        }
                    }
                }
            }
            setTableState(arr4)
        }
        genTable()
    }

    return (
        <Fragment>
            <Box marginX={20}>
                <Box display="flex" justifyContent="left" alignItems="center" width="100%" m={4}>
                </Box>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 157, border: `1px solid white`}}
                >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    textColor={"inherit"}
                >
                    <Tab label="Genre" {...a11yProps(0)} >{}</Tab>
                    <Tab label="Player Perspective" {...a11yProps(1)} />
                    <Tab label="Console" {...a11yProps(2)} />
                </Tabs>
                    <div style={divStyle}>
                        <TabPanel value={value} index={0}>

                            {genres.map(item=>(
                                <Checkbox value={item.name} onClick={() => handleGenreChange(item.id)} animation="smooth">{item.name}</Checkbox>
                            ))}

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {perspectives.map((item) =>(
                                <Checkbox value={item.name} onClick={() => handlePerspectiveChange(item.id) } animation="smooth">{item.name}</Checkbox>
                            ))}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {platforms.map((item) =>(
                                <Checkbox value={item.name} onClick={() => handlePlatformChange(item.id)} animation="smooth">{item.name}</Checkbox>
                            ))}
                        </TabPanel>
                    </div>
                </Box>
                <p></p>
                <Button variant={"outlined"} color="inherit" onClick={() => genTable()}>Filter</Button>
            </Box>
            <p></p>
            <Box style={divStyle2}>
            <ImageList cols = {6}>
                {tableState.map((item) => (
                    <Card sx={{ minWidth: 200 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="400"
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
            </Box>
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

/*
                <Box alignItems="center" m={4}>
                    <Switch>Genre</Switch>
                    <Switch>Player Perspective</Switch>
                    <Switch>Platform</Switch>
                </Box>
                <label htmlFor="membership">Choose a membership plan:</label>
                <select name="membership" id="membership">
                    <option value="free">Free</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver" selected>Silver</option>
                    <option value="Gold">Gold</option>
                </select>
 */

/*<Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>*/
