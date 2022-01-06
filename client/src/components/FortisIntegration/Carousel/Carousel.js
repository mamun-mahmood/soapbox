import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Product from "./Products";
import "./Carousel.scss";
import "./style.scss";
import { useHistory } from "react-router";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function LandingCarousel(props) {

    let history = useHistory();
    console.log(history.location.pathname.replace("/", ""));
    var products = props.data;

    if (products.length > 7) {
        products = products.slice(0, 10)
    }

    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 40,
        height: 40,
        cursor: 'pointer',
        borderRadius: '50%',
        padding: 10,

        color: "white",
        backgroundColor: '#1F2937',
        opacity: 0.9,
    };

    return (
        <div className="liveauction-secrion" style={{ maxWidth: "98vw" }}>
            <Carousel
                interval={2000}
                centerMode={true}
                showArrows={true}
                selectedItem={2}
                centerSlidePercentage={20}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                showIndicators={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <FaAngleLeft onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 10 }} />
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <FaAngleRight onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }} />
                    )
                }
            >
                {products.map((product, index) => (
                    <Product key={product._id} product={product}></Product>
                ))}
            </Carousel>
        </div>
    );
}
