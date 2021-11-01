import * as React from 'react';
import {Fragment} from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";

function getDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleDateString();
}

export default function GameSummary() {
    const location = useLocation();
    const {game} = location.state;
    const formattedDate = getDate(game.first_release_date);

    return (
        <Fragment>
            <Box display="flex" marginTop={10} alignItems="center" justifyContent="center">
                <Grid container width={1000} spacing={5}>
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
                                Genre:
                            </Typography>
                            <Typography variant="subtitle1">
                                Platforms:
                            </Typography>
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
                        <Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}
