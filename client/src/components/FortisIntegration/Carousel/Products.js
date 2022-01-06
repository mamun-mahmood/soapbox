import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import axios from "axios";
// import FacebookIcon from "../../node_modules/react-share/lib/FacebookIcon";
// import LinkedinIcon from "../../node_modules/react-share/lib/LinkedinIcon";
// import TelegramIcon from "../../node_modules/react-share/lib/TelegramIcon";
// import TwitterIcon from "../../node_modules/react-share/lib/TwitterIcon";
// import WhatsappIcon from "../../node_modules/react-share/lib/WhatsappIcon";
// import Rating from "./Rating";
// import diamond from "../Assets/imgs/diamond.svg";
// import gallaryImg from "../Assets/imgs/IMG.png";
import "./style.scss";
import "../fortisIntegration.css"
import Rating from "./Rating";
// import {
//   Tooltip,
//   OverlayTrigger,
//   Button,
// } from "../../node_modules/react-bootstrap/esm";

export default function Product(props) {
    const [isShareable, setIsShareble] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [biddingCount, setBiddingCount] = useState(0);
    const { product } = props;
    // const checkBidding = () => {
    //   axios.get("https://fortisab.com/api/users/bidding/").then((res) => {
    //     var i = 0;
    //     res.data.forEach((e) => {
    //       if (e.productId == product._id) {
    //         setBiddingCount(i + 1);
    //         i = i + 1;
    //       }
    //     });
    //   });
    // };
    const fetchBids = () => {
        axios.get(`https://fortisab.com/api/bidding/getBidByid/${product._id}`)
            .then((res) => {
                // setBiddingData(res.data.sort((a, b) => parseFloat(b.biddingPrice) - parseFloat(a.biddingPrice)))
                setBiddingCount(res.data.length)
            })
    }
    const getRandomNum = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        fetchBids();
    }, [product]);

    // const renderTooltip = (props) => (
    //   <Tooltip id="button-tooltip" {...props}>
    //     <div className="market-tootip">Bundles: 3 Iteam</div>
    //   </Tooltip>
    // );

    return (
        <div key={product._id} className="card" style={{ maxWidth: '220px' }} onContextMenu={(e) => { e.preventDefault(); }}>
            <a href={`https://fortisab.com/product/${product._id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div>
                    <div className="row">
                        {isShareable ? (
                            {/* <div
                                style={{ position: "absolute", top: "0" }}
                                onMouseLeave={() => {
                                    setIsShareble(false);
                                }}
                            >
                                <TwitterShareButton
                                    size={32}
                                    url={`https://fortisab.com/product/${product._id}`}
                                    title={product.name}
                                    children={<TwitterIcon size={32} round={true} />}
                                />
                                <WhatsappShareButton
                                    url={`https://fortisab.com/product/${product._id}`}
                                    title={product.name}
                                    children={<WhatsappIcon size={32} round={true} />}
                                />
                                <LinkedinShareButton
                                    url={`https://fortisab.com/product/${product._id}`}
                                    title={product.name}
                                    children={<LinkedinIcon size={32} round={true} />}
                                />

                                <TelegramShareButton
                                    url={`https://fortisab.com/product/${product._id}`}
                                    title={product.name}
                                    children={<TelegramIcon size={32} round={true} />}
                                />

                                <FacebookShareButton
                                    url={`https://fortisab.com/product/${product._id}`}
                                    title={product.name}
                                    size={24}
                                    children={<FacebookIcon size={32} round={true} />}
                                />
                            </div> */}



                        ) : null}
                    </div>

                    {isReport ? (
                        <div
                            style={{
                                margin: "10px",
                                cursor: "pointer",
                                color: "#808080",
                                backgroundColor: "white",
                                padding: "10px",
                                margin: "10px",
                                position: "absolute",
                                width: "80px",
                                borderRadius: "10px",
                                position: "absolute",
                                top: "0",
                                boxShadow: "4px 1px 4px 1px #f0c040",
                            }}
                            onMouseLeave={() => {
                                setIsReport(false);
                            }}
                        >
                            <a
                                href
                                style={{ listStyle: "none", cursor: "pointer" }}
                                onClick={() => {
                                    setIsShareble(!isShareable);
                                    setIsReport(!isReport);
                                }}
                            >
                                Share
                            </a>{" "}
                            <a href style={{ listStyle: "none" }}>Report</a>
                        </div>
                    ) : null}
                </div>

                {/* <i
          style={{
            float: "right",
            margin: "10px",
            cursor: "pointer",
            color: "#808080",
          }}
          className="fa fa-ellipsis-h"
          aria-hidden="true"
          onClick={() => {
            setIsReport(!isReport);
          }}
          onMouseOver={() => {
            setIsReport(true);
          }}
        ></i> */}
                {/* <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}> */}
                <div className="card-images"  >
                    {/* <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}> */}
                    {/* <img
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              className="medium"
              src={product.image}
              alt={product.name}
            
            /> */}
                    {["jpg", "png", "gif", "jpeg"].includes(product.image.substr(23)) == true
                        ? (<img
                            onContextMenu={(e) => { e.preventDefault(); }}
                            className="medium"
                            style={{
                                borderRadius: "0.5rem",
                                maxWidth: '200px',
                                maxHeight: '200px',
                                objectFit: "cover"
                            }}
                            src={`https://fortisab.com/${product.image}`}
                            alt=""
                        />
                        ) : (<video
                            onContextMenu={(e) => { e.preventDefault(); }}
                            width="100%"
                            src={`https://fortisab.com/${product.image}`}
                            loop
                            autoPlay={true}
                            style={{
                                borderRadius: "0.5rem",
                                maxWidth: 200,
                                maxHeight: 200,
                                objectFit: "cover"
                            }}
                            muted
                        />
                        )}
                    {/* </Link> */}
                </div>
                <div className="card-detail">
                    <div className="card-title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h2
                            style={{
                                width: "185px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textAlign: 'center',
                                wordBreak: "break-all",
                                color: "#1F2937",
                                paddingTop: 0,
                                margin: "0.5rem 0",
                                fontWeight: 500,
                                fontSize: "initial",
                                textDecoration: "none",
                            }}
                        >
                            {product.name}
                        </h2>

                        <div className="card-body" style={{ padding: "0.5rem" }}>
                            {product.category == "Original Art Showcase" || product.category == "SoapBox Clubs" ? null : <div
                                className="price"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                }}
                            >
                                <p style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    color: "mediumpurple",
                                    marginBottom: "0"
                                }}>
                                    ${product.price} {product.currency ? "USD" : 'USD'}</p>
                                {product.publicToken && product.privateToken ? (
                                    <div>
                                        {" "}
                                        <p style={{ fontSize: "13px" }}>{biddingCount} Bids</p>
                                        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
                                            {" "}
                                            <p style={{ fontSize: "13px" }}>Place Bid</p>
                                        </Link>
                                    </div>
                                ) : null}
                            </div>}


                            <Rating
                                likes={product.rating}
                                views={product.numReviews}
                            ></Rating>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row"></div>
                </div>
                {/* <Link to={`/product/${product._id}`}> 
          <img
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            className="medium"
            src={product.image}
            alt={product.name}
          />
        </Link> */}
                {/* </Link> */}
            </a>
        </div>
    );
}
