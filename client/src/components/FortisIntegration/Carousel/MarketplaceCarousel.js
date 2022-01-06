import LazyLoad from 'react-lazyload'
import { Box, Button, Divider, makeStyles, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LandingCarousel from './Carousel';
import React from 'react';
import './style.scss'

const useStyles = makeStyles(theme => ({
    component: {
        backgroundColor: '#f8f9fa',
    },
    deal: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
    },
    dealText: {
        fontSize: "1rem",
        lineHeight: '32px',
        color: '#374151',
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


const MarketplaceCarousel = ({ products }) => {
    const classes = useStyles();

    const CustomButton = withStyles((theme) => ({
        root: {
            color: '#FFF',
            backgroundColor: '#8249a0',
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
                <Typography className={classes.dealText}>
                    VeroHive Backgrounds
                </Typography>

                <a href="https://fortisab.com/category/VeroHive%20Backgrounds"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                        color: 'white',
                        //  marginLeft: "auto",
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
                            data.category == "VeroHive Backgrounds"
                        )}
                    />
                </LazyLoad>
            </div>
        </Box>
    )
}

export default MarketplaceCarousel
