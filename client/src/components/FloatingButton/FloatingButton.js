import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { SoapboxTooltip } from '../SoapboxTooltip'
import hooticon from '../../assets/new-hoot-public.png'
import './floatingButton.css'
import Fade from '@material-ui/core/Fade';
import CreatePublicHoot from '../../pages/CreatePublicHoot';
import '../NavBar/navbar.css'
import { MyPublicHootBox } from '../../context/MyPublicHootBoxContext'

const FloatingButton = () => {
    const {
        setShowNavCreatePublicHoot,
        showFloatingCreatePublicHoot,
        setShowFloatingCreatePublicHoot
    } = useContext(MyPublicHootBox);

    useEffect(() => {
        if (showFloatingCreatePublicHoot) {
            setShowNavCreatePublicHoot(false);
        }
    }, [showFloatingCreatePublicHoot]);

    return (
        <div className="float">
            <SoapboxTooltip title="Create Hoot" placement="left" TransitionComponent={Fade}>
                <Link to="#create-hoot">
                    <img src={hooticon} className="hooticon" width="40px" onClick={() => {
                        if (showFloatingCreatePublicHoot) {
                            document.getElementById("slideH").style.transition = "2sec";
                            document.getElementById("slideH").style.left = "-200vw";

                            setTimeout(() => {
                                setShowFloatingCreatePublicHoot(false);
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                setShowFloatingCreatePublicHoot(true);

                                if (document.getElementById("slideH")) {
                                    document.getElementById("slideH").style.transition = "2sec";
                                    document.getElementById("slideH").style.left = "-65vw";
                                }
                            }, 1);
                        }
                    }} />
                </Link>
            </SoapboxTooltip>

            {showFloatingCreatePublicHoot ? (
                <div className="slide-container">
                    <div id="slideH" style={{ top: "-35rem", left: "-200vw", boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;" }}>
                        <CreatePublicHoot
                            closeHoot={() => {
                                document.getElementById("slideH").style.transition = "1sec";
                                document.getElementById("slideH").style.right = "-200vw";

                                setTimeout(() => {
                                    setShowFloatingCreatePublicHoot(false);
                                    window.location.reload(false);
                                }, 1000);
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default FloatingButton
