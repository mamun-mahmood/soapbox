import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Product from "./Products";
import "./style.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function AuctionCarousel(props) {
    var products = props.data.filter((data) => data.category == "NFT");

    products = products.slice(0, 10)

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
        <div className="liveauction-secrion">
            <Carousel
                width="100%"
                interval={2000}
                centerMode={true}
                selectedItem={2}
                transitionTime={500}
                showArrows={true}
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
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </Carousel>
        </div>
    );
}
