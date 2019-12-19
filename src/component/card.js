import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: "80%",
        borderColor:"black"
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    span: {
        paddingRight: "100px",
        fontWeight: 600
    }
}));

export default function Card({ item }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img
                                className={classes.img}
                                alt="complex"
                                src={item.ThumbnailImage}
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <span className={classes.span}> Abilities </span>
                                    {item.abilities.count === 1 ? item.abilities.map(el => `${el}`) : item.weakness.map(el => `${el},`)
                                    }
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <span className={classes.span}> Weakness </span>
                                    {
                                        item.weakness.count === 1 ? item.abilities.map(el => `${el}`) : item.weakness.map(el => `${el},`)
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
