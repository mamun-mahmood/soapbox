
import LazyLoad from 'react-lazyload'
import LandingCarousel from './Carousel';
import React from 'react';
import { Box, Button, Divider, makeStyles, Typography, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    component: {
        backgroundColor: '#f8f9fa',
    },
    deal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 10,
    },
    dealText: {
        fontSize: "1rem",
        lineHeight: '32px',
        color: '#47566e',
        fontWeight: 600,
        padding: '0px 10px',
        [`@media (max-width: 768px)`]: {
            fontSize: 16,
        }
    },
    button: {
        marginLeft: 'auto',
        backgroundColor: '#2874f0',
        borderRadius: 2,
        fontSize: 12,
        padding: '8px 18px',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#2874f0',
        }
    },
}));

const DIgitalArt = ({ products }) => {
    const classes = useStyles();

    const CustomButton = withStyles((theme) => ({
        root: {
            color: '#FFF',
            backgroundColor: '#8249a0',
            borderRadius: 4,
            marginRight: 10,
            boxShadow: 'rgba(99, 99, 99, 0.12) 0px 2px 8px 0px;',
            '&:hover': {
                backgroundColor: '#8249a0',
                border: 'none',
                outline: 'none',
                boxShadow: 'rgba(99, 99, 99, 0.12) 0px 2px 8px 0px;',
            },
        },
    }))(Button);

    return (
        <Box className={classes.component} >
            <Box className={classes.deal}>
                <Typography className={classes.dealText}>Original Art Showcase</Typography>

                <a href='https://fortisab.com/category/Original Art Showcase'
                    target="_blank" rel="noopener noreferrer"
                    style={{
                        color: 'white',
                        // marginLeft: "auto",
                        textDecoration: "none"
                    }}
                >
                    <CustomButton
                        color="primary"
                        disableElevation
                        variant="contained"
                        className={classes.button}
                    >
                        View All
                    </CustomButton>
                </a>
            </Box>

            <div className="row center Marketplace">
                <LazyLoad>
                    <LandingCarousel
                        data={products.filter((data) =>
                            data.category == "Original Art Showcase"
                        )}
                    />
                </LazyLoad>
            </div>
        </Box>
    )
}

export default DIgitalArt
