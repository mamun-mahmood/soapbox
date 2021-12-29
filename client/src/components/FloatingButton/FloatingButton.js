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
        <div className="float" style={{ width: "100%" }}>
            <Link to={showFloatingCreatePublicHoot ? "#" : "#create-hoot"}>
                <SoapboxTooltip title="Create Hoot" placement="left" TransitionComponent={Fade}>
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
                                    // document.getElementById("slideH").style.left = "-65vw";
                                    document.getElementById("slideH").style.left = "51%";
                                    document.getElementById("slideH").style.top = `${window.innerHeight > 740 ? "-27" : window.innerHeight < 640 ? "-18" : "-20"}rem`;
                                    document.getElementById("slideH").style.transform = "translate(-50%, -50%)";
                                }
                            }, 1);
                        }
                    }} />
                </SoapboxTooltip>
            </Link>

            {showFloatingCreatePublicHoot ? (
                <div className="slide-container">
                    <div id="slideH" className='sHb-responsive' style={{ top: "-35rem", left: "-200vw", boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;" }}>
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
