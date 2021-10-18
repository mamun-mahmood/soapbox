import axios from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { FiSearch } from 'react-icons/fi'
import Picker from 'emoji-picker-react';
import './commentsPanel.css'
import { toast } from 'react-toastify';

const CommentsPanel = () => {
    const [totalHootsLength, setTotalHootsLength] = useState(null);
    const [findKeyword, setFindKeyword] = useState("");
    const [showHootInfo, setShowHootInfo] = useState(false);
    const findRef = useRef(null);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [commentBody, setCommentBody] = useState("");

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        findRef.current.focus();
        if (findKeyword === "") {
            setShowHootInfo(false);
        }
    }, [findKeyword])

    const findFromDb = async () => {
        await axios.get(`${BaseURL}/comments-panel/find?keyword=${findKeyword}`)
            .then((response) => {
                setTotalHootsLength(response.data.totalHootsLength);
                setShowHootInfo(true);
            });
    }

    const onEnterKey = (event) => {
        if (event.keyCode === 13) {
            findKeyword ? findFromDb() : toast.info(`Search field can not be empty.`);
        }

        findRef.current.focus();
    }

    const addCommentToHoots = async () => {

        await axios.post(`${BaseURL}/comments-panel/add`, {
            name: name,
            username: username,
            commentBody: commentBody,
            findKeyword: findKeyword
        }).then((response) => {
            toast.success(`Comment added to all ${totalHootsLength} hoots.`)
        });

        setUsername("");
        setName("");
        setCommentBody("");
    }

    const [emojiPicker, setEmojiPicker] = useState(false);

    const emojis = ["😍", "🦉", "😂", "👏🏻", "💖", "😜", "🤯", "🤓", "🥰", "😎", "😋"];
    const [defaultEmoji, setDefaultEmoji] = useState("😄");

    return (
        <Fragment>
            <div className="cp-head">
                MegaHoot Soapbox Comments Panel
            </div>

            <hr style={{ maxWidth: "100%" }} />

            <div className="cp-body">
                <div className="cp-search-bar">
                    <input
                        ref={findRef}
                        onChange={(event) => { setFindKeyword(event.target.value) }}
                        onKeyDown={(event) => { onEnterKey(event) }}
                        type="text"
                        placeholder="Find Hoots based on Keywords & hit enter to Comment"
                    />
                    <FiSearch className="cp-search-icon"
                        onClick={findFromDb}
                    />
                </div>

                {showHootInfo && (
                    <Fragment>
                        <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
                            Total <b>{totalHootsLength}</b> hoots found related to keyword <b>"{findKeyword}"</b>
                        </div>
                        {totalHootsLength > 0 && (
                            <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
                                Please fill below details to comment
                            </div>
                        )}
                        <hr className="cp-stylish-hr" />
                    </Fragment>
                )}

                <div className="edit-contents" style={{ paddingTop: "0" }}>
                    <div className="edit-item">
                        <div className="edit-parameter">Username</div>
                        <div className="edit-item-info">
                            <input
                                maxLength="50"
                                type="text"
                                placeholder="johnc77"
                                value={username}
                                disabled={!showHootInfo || !totalHootsLength}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setUsername(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="edit-parameter">Display Name</div>
                        <div className="edit-item-info">
                            <input
                                maxLength="50"
                                type="text"
                                placeholder="John Cena"
                                disabled={!showHootInfo || !totalHootsLength}
                                value={name}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setName(value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="edit-parameter">Comment</div>
                        <div className="edit-item-info">
                            <div style={{ position: "relative" }}>
                                <textarea
                                    maxLength="300"
                                    type="text"
                                    disabled={!showHootInfo || !totalHootsLength}
                                    placeholder="Write a comment..."
                                    value={commentBody}
                                    style={{ width: "100%" }}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        findKeyword && setCommentBody(value);
                                    }}
                                />
                                <div
                                    className="emoji-hover"
                                    style={{ position: "absolute", top: "-1.8rem", right: "-0.4rem" }}
                                    onClick={() => { setEmojiPicker(!emojiPicker) }}
                                >
                                    <span
                                        onMouseEnter={() => { emojiPicker || setDefaultEmoji(emojis[Math.floor(Math.random() * emojis.length)]) }}
                                    >
                                        {defaultEmoji}
                                    </span>
                                </div>

                                {emojiPicker && (
                                    <ClickAwayListener onClickAway={() => { setEmojiPicker(false) }}>
                                        <div>
                                            <Picker
                                                native
                                                onEmojiClick={(event, emojiObject) => {
                                                    findKeyword && setCommentBody(commentBody + emojiObject.emoji);
                                                }}
                                                pickerStyle={{ position: "absolute", top: "-1.8rem", right: "-18rem", zIndex: "1111" }}
                                            />
                                        </div>
                                    </ClickAwayListener>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="edit-item">
                        <div className="cp-add-comment-btn">
                            <button
                                disabled={!commentBody || !username || !name}
                                onClick={addCommentToHoots}
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CommentsPanel
