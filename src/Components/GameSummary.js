import * as React from 'react';
import {Fragment} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";

export default function GameSummary() {
    const location = useLocation();
    const {game} = location.state;

    return (
        <Fragment>
            <Grid marginX={20}>

            </Grid>
        </Fragment>
    )
}
