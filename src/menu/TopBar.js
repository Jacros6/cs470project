import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {styled, alpha, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function TopBar({user, logoutAction}) {
    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Stack spacing={2} direction="row">
                                <Button variant="text" component={Link} to={'/'}>
                                    <Typography variant="h6" component="div">
                                        Home
                                    </Typography>
                                </Button>
                                <Button variant="text" component={Link} to={'/games'}>
                                    <Typography variant="h6" component="div">
                                        Games
                                    </Typography>
                                </Button>
                                { user === undefined ?
                                    <Button variant="text" component={Link} to={'/login'}>
                                        <Typography variant="h6" component="div">
                                            Lists
                                        </Typography>
                                    </Button> :
                                    <Button variant="text" component={Link} to={'/lists'}>
                                        <Typography variant="h6" component="div">
                                            Lists
                                        </Typography>
                                    </Button>
                                }
                            </Stack>
                        </Typography>


                        <Box margin={2} >
                            { user === undefined ?
                                <Button variant="text" component={Link} to={'/login'}>
                                    <Typography
                                        variant="h6"
                                        component="div">
                                        Login
                                    </Typography>
                                </Button> :
                                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                                    <Button variant="text">
                                        <Typography variant="h6" component="div">
                                            {user}
                                        </Typography>
                                    </Button>
                                    <Button variant="text" onClick={logoutAction}>
                                        <Typography variant="h6" component="div" >
                                            Logout
                                        </Typography>
                                    </Button>
                                </Stack>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}