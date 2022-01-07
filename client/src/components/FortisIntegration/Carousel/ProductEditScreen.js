import React, { useEffect, useState, Fragment } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { detailsProduct, updateProduct } from '../actions/productActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
// import { deleteProduct } from "../actions/productActions";
import NewLoadingBox from '../NewLoadingBox';

export default function ProductEditScreen(props) {
    // const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [IsAdmin, setIsAdmin] = useState(false);
    const [AuctionPrice, setAuctionPrice] = useState(0);

    // const userSignin = useSelector((state) => state.userSignin);
    // const { userInfo } = userSignin;

    const [isAuction, setIsAuction] = useState(false);
    const [publicToken, setPublicToken] = useState()
    const [TokenIncreaser, setTokenIncrease] = useState(0)
    const [inputList, setInputList] = useState([{ publicToken: " ", privateToken: " " }]);
    const [AllPublicToken, setAllPublicToken] = useState([])
    const [privateToken, setPrivateToken] = useState()
    const [AllPrivateToken, setAllPrivateToken] = useState()
    const [AuctionEndTime, setAuctionEndTime] = useState();
    const [currency, setCurrency] = useState('');
    const [category, setCategory] = useState('');
    const [SubCategory, setSubCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [showPublicPrivateKeyBox, setShowPublicPrivateKeyBox] = useState(false)

    // const productDetails = useSelector((state) => state.productDetails);
    // const { loading, error, product } = productDetails;
    // const productUpdate = useSelector((state) => state.productUpdate);
    var [categoryList, setCategoryList] = useState(["General"]);
    const [ownerName, setOwnerName] = useState("");
    // const [ownerName, setOwnerName] = useState(userInfo.name);

    const fetchAlldata = () => {
        axios.get(`https://fortisab.com/api/users/getAllProductCategory/`)
            .then((res) => {

                res.data.forEach(element => {
                    if (element.categoryItem && !category.includes(element.categoryItem)) {

                        setCategoryList(oldArray => [...oldArray, element]);
                        categoryList = categoryList.filter(function (value, index, array) {
                            return array.indexOf(value) == index;
                        });
                    }

                });
            })
    }

    // useEffect(() => {
    //     setIsAdmin(userInfo.isAdmin);
    // }, [userInfo])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { publicToken: "", privateToken: "" }]);
    };

    // const {
    //     loading: loadingUpdate,
    //     error: errorUpdate,
    //     success: successUpdate,
    // } = productUpdate;

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (successUpdate) {
    //         props.history.push('/productlist');
    //     }
    //     if (!product || product._id !== productId || successUpdate) {
    //         // dispatch({ type: PRODUCT_UPDATE_RESET });
    //         // dispatch(detailsProduct(productId));
    //     } else {
    //         setName(product.name);
    //         setPrice(product.price);
    //         setImage(product.image);
    //         setCategory(product.category);
    //         setCountInStock(product.countInStock);
    //         setBrand(product.brand);
    //         setDescription(product.description);
    //         setPublicToken(product.publicToken);
    //         setPrivateToken(product.privateToken);
    //         setAuctionEndTime(product.AuctionEndTime);
    //         setCurrency(product.currency)
    //         setSubCategory(product.subCategory)
    //         setShowPublicPrivateKeyBox((product.TokenArray.length) ? true : false)
    //         setInputList(product.TokenArray.length ? product.TokenArray : [{ publicToken: "", privateToken: "" }])

    //     }
    // }, [product, productId, successUpdate, props.history]);

    // }, [product, dispatch, productId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
        // dispatch(
        //     updateProduct({
        //         _id: productId,
        //         name,
        //         price,
        //         image,
        //         category,
        //         brand,
        //         countInStock,
        //         description,
        //         currency: currency,
        //         AuctionPrice: price,
        //         AuctionEndTime: AuctionEndTime,
        //         publicToken: publicToken,
        //         privateToken: privateToken,
        //         ownerName: ownerName,
        //         isAuctionLive: isAuction,
        //         subCategory: SubCategory,
        //         TokenArray: inputList
        //     })
        // );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const [fileType, setFileType] = useState("");
    const [previewSrc, setPreviewSrc] = useState(null);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        setFileType(file.type);
        setPreviewSrc(URL.createObjectURL(file));

        if (file.type.substring(0, 5) == "image") {
            const bodyFormData = new FormData();
            bodyFormData.append('image', file);
            setLoadingUpload(true);
            try {
                const { data } = await axios.post('/api/uploads', bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setImage(data);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }
        } else {
            const bodyFormData = new FormData();
            bodyFormData.append('video', file);
            setLoadingUpload(true);
            try {
                const { data } = await axios.post('/api/uploads/uploadVideo', bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setImage(data);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }
        }
    };

    useEffect(() => {
        fetchAlldata()
    }, [])

    // const deleteHandler = (productId) => {
    //     if (window.confirm("Are you sure to Cancel?")) {
    //         dispatch(deleteProduct(productId));
    //     }
    // };



    return (
        <div >
            {/* <button className="primary" style={{backgroundColor:'red',color:'white',float:'left',minWidth:'200px'}} 
            onClick={()=>{
              deleteHandler(productId)
            }}>
          >
            Cancel 
      </button> */}

            {/* {console.log(product)} */}
            <form className="form" onSubmit={submitHandler}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseLine",
                    justifyContent: "flex-start",
                    gap: "1rem",
                    flexWrap: "wrap",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#374151",
                }}
                >
                    <div>Create New Product</div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                        {/* {productId} */}
                    </span>
                </div>

                <hr style={{ margin: "0.5rem 0", marginBottom: "1rem" }} />

                {/* {loadingUpdate && <LoadingBox></LoadingBox>} */}

                {/* {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>} */}
                {/* <LoadingBox/> */}

                {/* {loading ? (
                    <NewLoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : ( */}
                <Fragment>
                    <div>
                        <label htmlFor="name" className="label-new-style">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            className='input-new-style'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="price" className="label-new-style">Price</label>
                        <div style={{ display: 'flex', gap: "1rem" }}>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price"
                                value={price}
                                className='input-new-style'
                                onChange={(e) => setPrice(e.target.value)}
                                style={{ flex: 3 }}
                            ></input>

                            <select style={{ flex: 1 }}
                                className='input-new-style'
                                onChange={(event) => setCurrency(event.target.value)}
                                value={currency}
                            >
                                <option value={"USD"} >{"USD"}</option>
                                <option value={"Pecu Novus"} >{"Pecu Novus"}</option>
                                <option value={"XMG"} >{"XMG"}</option>
                            </select>
                        </div>

                        <label htmlFor="price" style={{
                            fontWeight: 500,
                            fontSize: 13.5,
                            color: "rgb(112, 122, 131)",
                            marginTop: "0.5rem"
                        }}>Select Pecu Novus for NFT's ONLY</label>
                    </div>

                    {/* <div>
              <label htmlFor="image" className="label-new-style">Image/Video</label>
              <input
                className='input-new-style'
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div> */}


                    <div>
                        <label htmlFor="imageFile" className="label-new-style">Image/Video File</label>
                        <input
                            type="file"
                            id="imageFile"
                            className='input-new-style'
                            label="Choose File"
                            onChange={uploadFileHandler}
                        ></input>
                        {/* <LoadingBox/> */}
                        {loadingUpload &&
                            <NewLoadingBox />
                        }
                        {/* {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                        )} */}
                    </div>

                    {image !== '/images/p1.jpg'
                        ? <div className="media-preview" style={{ margin: "1rem 0", borderRadius: "0.5rem" }}>
                            {image !== '' &&
                                ["jpg", "png", "gif", "jpeg", "webp"].includes(
                                    image.substr(23),
                                ) === true ? (
                                <img onContextMenu={(e) => {
                                    e.preventDefault();
                                }} className='preview-img from-image' src={previewSrc ? previewSrc : image} alt="" />
                            ) : (
                                <video
                                    className='preview-vdo from-image'
                                    src={previewSrc ? previewSrc : image}
                                    loop muted autoPlay
                                    disablePictureInPicture
                                    controlsList="nodownload"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                ></video>
                            )}
                        </div>
                        : <div className="media-preview" style={{ margin: "1rem 0", borderRadius: "0.5rem" }}>
                            {fileType === "" && <p style={{ fontSize: "3rem" }}>Upload Preview</p>}
                        </div>
                    }

                    {/* {fileType !== "" &&
                  <IoCloseOutline className="close-preview" style={{ color: "#fff", fontWeight: 900 }} onClick={() => {
                    setFileType("");
                    setPreviewSrc(null);
                  }} />
                } */}

                    {/* {fileType?.match(/image/gi) === "image" &&
                  <img src={previewSrc} alt="" className='preview-img from-upload-preview' />
                }

                {fileType?.match(/video/gi) === "video" &&
                  <video
                    className='preview-vdo from-upload-preview'
                    loop muted autoPlay
                    disablePictureInPicture
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <source src={previewSrc} />
                    Your browser does not support HTML video.
                  </video>
                } */}

                    <div>
                        <label htmlFor="category" className="label-new-style">Category <br /><span style={{
                            fontWeight: 500,
                            fontSize: 13.5,
                            color: "rgb(112, 122, 131)",
                            marginTop: "0.5rem"
                        }}>This is the Category where your product will appear.</span>
                        </label>

                        {/* <input
                id="category"
                type="text"
                placeholder={category}
                value={category}
                  
                ></input> */}

                        {/* <select onChange={(e) => setCategory(e.target.value),console.log(category,"sky")} > { categoryList.map((item) => (
                    <option value={item} >{item}</option>
              ))}</select> */}

                        <select
                            onChange={(event) => setCategory(event.target.value)}
                            value={category}
                            className='input-new-style'
                        >
                            {categoryList.map((item) => (
                                item.isSubCategory ? null : <option value={item.categoryItem} >{item.categoryItem}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="brand" className="label-new-style">Brand</label>
                        <input
                            className='input-new-style'
                            id="brand"
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <label htmlFor="countInStock" className="label-new-style">Count In Stock</label>
                        <input
                            id="countInStock"
                            type="text"
                            placeholder="Enter countInStock"
                            value={countInStock}
                            className='input-new-style'
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <label htmlFor="description" className="label-new-style">Description <br /> <span style={{
                            fontWeight: 500,
                            fontSize: 13.5,
                            color: "rgb(112, 122, 131)",
                            marginTop: "0.5rem"
                        }}>The description will be included on the product's detail page.</span>
                        </label>

                        <textarea
                            id="description"
                            className='input-new-style'
                            rows="3"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            style={{ whiteSpace: 'pre-wrap !important' }}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {IsAdmin
                        ? <div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                                <input className='input-new-style' type="checkbox" onChange={() => { setShowPublicPrivateKeyBox(!showPublicPrivateKeyBox) }} />
                                <label htmlFor="description" className="label-new-style" style={{ margin: "0.5rem" }}>{`Check to list ${name} as an NFT`}</label>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                                <input className='input-new-style' type="checkbox" onChange={() => { setIsAuction(!isAuction) }} />
                                <label htmlFor="description" className="label-new-style" style={{ margin: "0.5rem" }}>{`Check to list ${name} as an Auction`}</label>
                            </div>
                        </div>
                        : null}

                    <div style={{ marginTop: "2rem" }}>
                        {showPublicPrivateKeyBox ? <Fragment>
                            <div style={{ marginBottom: "2rem" }}>
                                <label htmlFor="name" className="label-new-style" style={{ marginBottom: "0.5rem !important" }}>Auction Price</label>
                                <div style={{ display: 'flex', gap: "1rem" }}>
                                    <input
                                        style={{ flex: 3 }}
                                        id="name"
                                        type="text"
                                        placeholder="Price"
                                        value={price}
                                        className='input-new-style'
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></input>

                                    <select style={{ flex: 1 }}
                                        className='input-new-style'
                                        onChange={(event) => setCurrency(event.target.value)}
                                        value={currency}
                                    >
                                        <option value={"USD"} >{"USD"}</option>
                                        <option value={"Pecu Novus"} >{"Pecu Novus"}</option>
                                        <option value={"XMG"} >{"XMG"}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', marginBottom: "2rem" }}>
                                    <label className="label-new-style" style={{ flex: 1 }} htmlFor="name">Auction End Time</label>

                                    <select style={{ flex: 1 }}
                                        className='input-new-style'
                                        onChange={(event) => setAuctionEndTime(event.target.value)}
                                        value={AuctionEndTime}
                                    > <option value={0} >{"Select"}</option>
                                        <option value={1} >{"1 Hour"}</option>
                                        <option value={2} >{"2 Hour"}</option>
                                        <option value={3} >{"3 Hour"}</option>
                                        <option value={4} >{"4 Hour"}</option>
                                        <option value={5} >{"5 Hour"}</option>
                                        <option value={24} >{"24 Hour"}</option>
                                        <option value={48} >{"48 Hour"}</option>
                                        <option value={168} >{"7 days"}</option>
                                        <option value={720} >{"30 days"}</option>
                                        <option value={1440} >{"60 days"}</option>
                                        <option value={2160} >{"90 days"}</option>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', marginBottom: "2rem" }}>
                                    <label htmlFor="category" style={{ flex: 1 }} className="label-new-style">Sub Category</label>
                                    <select
                                        style={{ flex: 1 }}
                                        className='input-new-style'
                                        onChange={(event) => setSubCategory(event.target.value)}
                                        value={SubCategory}
                                    >
                                        <option value={"General"} >{'General'}</option>
                                        {categoryList.filter((e) => e.isSubCategory).map((item) => (
                                            <option value={item.categoryItem} >{item.categoryItem}</option>
                                        ))}
                                    </select>
                                </div>

                                {inputList.map((x, i) => {
                                    return (
                                        <div style={{
                                            backgroundColor: '#f1f5f9',
                                            marginBottom: "2rem",
                                            padding: '1rem 2rem',
                                            borderRadius: '5px',
                                            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px;"
                                        }}
                                        >
                                            <div>
                                                <label className="label-new-style">Public Key</label>
                                                <input className='input-new-style' name="publicToken" type="text" placeholder="Public Key" value={x.publicToken}
                                                    onChange={e => handleInputChange(e, i)} style={{ margin: '0.5rem 0', minWidth: '100%' }} />
                                            </div>

                                            <div style={{ marginTop: "2rem" }}>   <label className="label-new-style">Private Key</label>
                                                <input className='input-new-style' name="privateToken" type="text" placeholder="Private Key" value={x.privateToken}
                                                    onChange={e => handleInputChange(e, i)} style={{ margin: '0.5rem 0', minWidth: '100%' }} />
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end" }}>
                                                {inputList.length !== 1 && <button className="mr10" style={{ padding: "0.3rem 1rem", marginTop: "0.5rem" }} onClick={() => { handleRemoveClick() }}>Remove</button>}
                                                {inputList.length - 1 === i && <button style={{ padding: "0.3rem 1rem", marginTop: "0.5rem" }} onClick={() => { handleAddClick() }}>Add</button>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Fragment> : null}

                        <button className="create-product-button" style={{ margin: 0, fontSize: "2rem" }} type="submit">
                            Update
                        </button>
                    </div>
                </Fragment>
                {/* )} */}
            </form>
        </div>
    );
}