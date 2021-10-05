import React, { Fragment, useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener';
import './myList.css'
import { RiPlayListAddFill } from 'react-icons/ri'
import { Button } from 'react-bootstrap';
import { IoCloseOutline } from 'react-icons/io5';
import { useParams } from 'react-router';
import { AiFillMinusCircle } from 'react-icons/ai';
import axios from 'axios';

const MyList = ({ username }) => {

    const [isCreateMyListModalOpen, setIsCreateMyListModalOpen] = useState(false);
    const [dLine, setDLine] = useState(true);
    const [formValues, setFormValues] = useState([{ name: "" }])
    const BaseURL = process.env.REACT_APP_API_URL;


    const [relatedHoots, setRelatedHoots] = useState([]);

    useEffect(() => {
        const getkeywordRelatedHoots = async () => {
            await axios.get(`${BaseURL}/mylist/related/${username}`)
                .then((response) => {
                    console.log("realted hoots: ", response.data);
                    setRelatedHoots(response.data);
                })
        }

        getkeywordRelatedHoots();
    }, [])

    console.log("realted hoots: ", relatedHoots);

    let handleChange = (i, e) => {
        // setDLine(false)
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

    let handleSubmit = (event) => {
        event.preventDefault();

        setDLine(false)
        setIsCreateMyListModalOpen(false)

        // converting array of object to normal array 
        const arrList = formValues.map((list) => {
            return (
                list.name
            )
        })

        const keywordsArrStringify = JSON.stringify(arrList);

        const sendKeywordsToDb = async () => {
            await axios.post(`${BaseURL}/mylist/add`, {
                username: username,
                keywordsArrStringify: keywordsArrStringify
            })
        }

        sendKeywordsToDb();

        // console.log("array: ", arrList);
        // console.log("array stringify: ", JSON.stringify(arrList));
        // console.log("array parse: ", JSON.parse(JSON.stringify(arrList)));
        // console.log("array of object stringify: ", (JSON.stringify(formValues)));
        // console.log("normal array of object: ", formValues);
    }

    return (
        <div className="myList">
            <div className="top-mylist-header">
                <h4>My List</h4>
                <RiPlayListAddFill
                    className="add-mylist"
                    onClick={() => { setIsCreateMyListModalOpen(true) }}
                />
            </div>
            <hr />
            {/* {relatedHoots.length > 0
                ? <div>got hoots</div>
                :
                <div className="default-mylist-line">You haven't created List. When you do, they'll show up here.</div>
            } */}
            {dLine &&
                <div className="default-mylist-line">You haven't created List. When you do, they'll show up here.</div>
            }

            <div className="keyword-wrapper">
                {formValues.map((link, index) => {
                    return (
                        <span key={index}>
                            {link.name === "" ||
                                <small className="badge-keyword outline-badge-keywords">
                                    {link.name}
                                </small>
                            }
                        </span>
                    )
                })}
            </div>

            {/* Create My List Modal */}
            {isCreateMyListModalOpen &&
                <Fragment>
                    <div className="modal-overlay"></div>
                    <ClickAwayListener onClickAway={() => { setIsCreateMyListModalOpen(false) }}>
                        <div className="myList-modal">
                            <h4>Create My List</h4>
                            <div className="myList-info">
                                <div className="myList-desc">Add keywords to create My List which will show Hoots only related to added keywords.</div>
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

                                <button className="btn-add-link" style={{ margin: "0", marginTop: "0.5rem" }} type="button" onClick={() => addFormFields()}>
                                    Add
                                </button>
                                <div className="btn-post mt-3" style={{ textAlign: "center", display: "flex", justifyContent: "flex-end" }}>
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
        </div>
    )
}

export default MyList
