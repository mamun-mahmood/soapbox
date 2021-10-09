import React, { Fragment, useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener';
import './myList.css'
import { RiPlayListAddFill } from 'react-icons/ri'
import { IoCloseOutline } from 'react-icons/io5';
import { AiFillMinusCircle, AiOutlineSync } from 'react-icons/ai';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post';
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import EndMsg from '../Feed/EndMsg';
import UserFollowHoots from './UserFollowHoots';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdSync } from 'react-icons/md';
import toast from 'react-hot-toast';

const MyList = ({ username }) => {
    const [isCreateMyListModalOpen, setIsCreateMyListModalOpen] = useState(false);
    const [dLine, setDLine] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [formValues, setFormValues] = useState([{ name: "" }]);
    const [isOpenMyListMoreModal, setIsOpenMyListMoreModal] = useState(false);
    const BaseURL = process.env.REACT_APP_API_URL;

    const [keywordsFromDb, setKeywordsFromDb] = useState([]);
    const [relatedHoots, setRelatedHoots] = useState([]);

    const [userFollows, setUserFollows] = useState([]);

    // const [allUserFollows, setAllUserFollows] = useState([]);
    // const sendUserFollows = async () => {
    //     const followArr = userFollows.map((user) => {
    //         return (
    //             user.username
    //         )
    //     })

    //     // await axios.get(`${BaseURL}/mylist/follows`, {
    //     //     users: followArr
    //     // }).then((response) => {
    //     //     setAllUserFollows(response.data);
    //     // })
    // }

    // list of users to whom loggedIn user follows 
    useEffect(() => {
        const getAllUserFollows = async () => {
            await axios.get(`${BaseURL}/user/follows/${username}`)
                .then((response) => {
                    setUserFollows(response.data);
                })
        }

        getAllUserFollows();
    }, [])

    // if (userFollows.length > 0) {
    //     sendUserFollows();
    // }

    useEffect(() => {
        const getAllKeywords = async () => {
            axios.get(`${BaseURL}/mylist/${username}`)
                .then((response) => {
                    if (response.data.length == 0) {
                        null
                    } else {
                        setKeywordsFromDb(JSON.parse(response.data[0].keywords));
                    }
                })
        }

        getAllKeywords();
    }, [username])

    const LIMIT = 10;

    // getting related hoots
    useEffect(() => {
        const getkeywordRelatedHoots = async () => {
            await axios.get(`${BaseURL}/mylist/related/${username}/p?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setRelatedHoots(response.data.results);
                })
        }

        getkeywordRelatedHoots();
    }, [])

    const fetchMoreRelatedHoots = async () => {
        await axios.get(`${BaseURL}/mylist/related/${username}/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const relatedHootsFromServer = response.data.results;

                setRelatedHoots([...relatedHoots, ...relatedHootsFromServer]);

                if (relatedHootsFromServer === 0 || relatedHootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setDLine(false)
        setFormValues([...formValues, { name: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // converting array of object to normal array
    const arrList = formValues.map((list) => {
        return (
            list.name
        )
    })

    let handleSubmit = (event) => {
        event.preventDefault();

        setDLine(false)
        setIsCreateMyListModalOpen(false)

        // appending new keywords to existing keywords from db and removing empty elements by filtering 
        const finalArr = [...keywordsFromDb, ...arrList.filter(n => n)];

        const sendKeywordsToDb = async () => {
            await axios.post(`${BaseURL}/mylist/add`, {
                username: username,
                keywordsArrStringify: JSON.stringify(finalArr)
            })
        }

        sendKeywordsToDb();

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    const removeAllKeywords = async () => {
        await axios.delete(`${BaseURL}/mylist/delete/${username}`)
            .then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
    }

    const copyKeywords = () => {
        // converting array of object to normal array
        const arrList = formValues.map((list) => {
            return (
                list.name
            )
        })

        // appending new keywords to existing keywords from db 
        const finalArr = [...keywordsFromDb, ...arrList.filter(n => n)];
        navigator.clipboard.writeText(finalArr.join(', '));

        toast.success("My Keywords Copied to Clipboard", {
            style: {
                border: '2px solid #8249A0',
                color: '#8249A0',
            },
            iconTheme: {
                primary: '#8249A0',
                secondary: '#FFFAEE',
            },
        });
    }

    const updateKeywords = (finalArr) => {
        const sendKeywordsToDb = async () => {
            await axios.post(`${BaseURL}/mylist/add`, {
                username: username,
                keywordsArrStringify: JSON.stringify(finalArr)
            })
        }

        sendKeywordsToDb();

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    const handleRemoveForm = (word) => {
        const newFormValues = formValues.filter((value) => value.name !== word);
        setFormValues(newFormValues);

        const newArrList = newFormValues.map((list) => {
            return (
                list.name
            )
        })

        const finalArr = [...keywordsFromDb, ...newArrList.filter(n => n)];
        updateKeywords(finalArr);
    }

    const handleRemoveDb = (word) => {
        const newKeywordsFromDb = keywordsFromDb.filter((keyword) => keyword !== word);
        setKeywordsFromDb(newKeywordsFromDb);

        const finalArr = [...newKeywordsFromDb, ...arrList.filter(n => n)];
        updateKeywords(finalArr);
    }

    return (
        <div className="mylist">
            <div className="top-mylist-header">
                <h4>My List</h4>
                <div className="mylist-icons">
                    {keywordsFromDb.length > 0 &&
                        <FiMoreHorizontal
                            className="add-mylist"
                            onMouseEnter={() => setIsOpenMyListMoreModal(true)}
                        />
                    }
                    <MdSync
                        className="add-mylist"
                        onClick={handleSubmit}
                    />
                    <RiPlayListAddFill
                        className="add-mylist"
                        onClick={() => { setIsCreateMyListModalOpen(true) }}
                    />
                </div>

                {isOpenMyListMoreModal &&
                    <Fragment>
                        <ClickAwayListener onClickAway={() => { setIsOpenMyListMoreModal(false) }}>
                            <div
                                className="mylist-more-modal"
                                onMouseEnter={() => setIsOpenMyListMoreModal(true)}
                                onMouseLeave={() => setIsOpenMyListMoreModal(false)}
                            >
                                <div className="more-options">
                                    <span onClick={removeAllKeywords}>Remove All Keywords</span>
                                    <span onClick={copyKeywords}>Copy My Keywords</span>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </Fragment>
                }
            </div>
            <hr />

            {/* Create My List Modal */}
            {isCreateMyListModalOpen &&
                <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener onClickAway={() => { setIsCreateMyListModalOpen(false) }}>
                        <div className="myList-modal">
                            <h4>{keywordsFromDb.length > 0 ? "Update" : "Create"} My List</h4>
                            <div className="myList-info">
                                <div className="myList-desc">
                                    {keywordsFromDb.length > 0
                                        ?
                                        "Add new keywords to your existing keywords in My List which will show Hoots only related to added keywords."
                                        :
                                        "Add keywords to Create My List which will show Hoots only related to added keywords."
                                    }
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ paddingTop: "1rem" }}>
                                        {formValues.map((element, index) => (
                                            <div className="add-myList-input" key={index}>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={element.name || ""}
                                                    onChange={e => handleChange(index, e)}
                                                    onKeyDown={(event) => { event.keyCode === 13 && addFormFields() }}
                                                    placeholder="type keyword"
                                                    autoFocus
                                                />
                                                {index ?
                                                    <AiFillMinusCircle className="btn-minus-link" onClick={() => removeFormFields(index)} />
                                                    : null
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </form>

                                <button
                                    className="btn-add-link"
                                    style={{ margin: "0", marginTop: "0.5rem" }}
                                    type="button"
                                    onClick={() => addFormFields()}
                                >
                                    Add
                                </button>
                                <div
                                    className="btn-post mt-3"
                                    style={{ textAlign: "center", display: "flex", justifyContent: "flex-end" }}
                                >
                                    <button
                                        className="btn-mylist"
                                        onClick={handleSubmit}
                                    >
                                        Add to My List
                                    </button>{' '}
                                </div>
                            </div>
                            <IoCloseOutline className="close-modal" onClick={() => setIsCreateMyListModalOpen(false)} />
                        </div>
                    </ClickAwayListener>
                </Fragment>
            }

            {relatedHoots.length == 0 && userFollows.length === 0 &&
                <div className="default-mylist-line">You haven't created List. When you do, they'll show up here.</div>
            }

            <div className="keyword-wrapper">
                {keywordsFromDb.map((keyword, index) => {
                    return (
                        <span key={index}>
                            {keyword === "" ||
                                <small className="badge-keyword outline-badge-keywords">
                                    {keyword}{" "}
                                    <IoCloseCircle
                                        style={{ marginBottom: "0.2rem", cursor: "pointer" }}
                                        onClick={() => handleRemoveDb(keyword)}
                                    />
                                </small>
                            }
                        </span>
                    )
                })}

                {formValues.map((keyword, index) => {
                    return (
                        <span key={index}>
                            {keyword.name === "" ||
                                <small className="badge-keyword outline-badge-keywords">
                                    {keyword.name}{" "}
                                    <IoCloseCircle
                                        style={{ marginBottom: "0.2rem", cursor: "pointer" }}
                                        onClick={() => handleRemoveForm(keyword.name)}
                                    />
                                </small>
                            }
                        </span>
                    )
                })}
            </div>

            {/* related hoots based on keywords  */}
            {relatedHoots &&
                <InfiniteScroll
                    dataLength={relatedHoots.length}
                    next={fetchMoreRelatedHoots}
                    hasMore={hasMore}
                >
                    {relatedHoots.map((upload) => {
                        return (
                            <div key={upload.id}>
                                <Post
                                    hootId={upload.id}
                                    username={upload.authorUsername}
                                    mimeType={upload.mimeType}
                                    hootImgId={upload.image}
                                    likes={upload.likes}
                                    views={upload.views}
                                    followers={upload.followers}
                                    caption={upload.caption}
                                    link={upload.link}
                                    ephemeral={upload.ephemeral}
                                    privateHoot={upload.private}
                                    expiryDate={upload.expiryDate}
                                    timeStamp={upload.timeStamp}
                                    edited={upload.edited}
                                    editedTimeStamp={upload.editedTimeStamp}
                                />
                            </div>
                        )
                    })}
                </InfiniteScroll>
            }

            {/* users hoots of which loggedIn user follows  */}
            {userFollows.map((user) => {
                return (
                    <div key={user.id}>
                        <UserFollowHoots user={user.username} />
                    </div>
                )
            })}
        </div>
    )
}

export default MyList
