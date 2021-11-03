import React from 'react'
import { Link } from 'react-router-dom'

const CaptionComp = ({ caption, username, isReadMore }) => {
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));

    return (
        (caption.length > 300
            ? isReadMore
                ? caption.slice(0, 320)
                : caption
            : caption).split(' ').map((item, index) => {
                if (item.startsWith('@')) {
                    return (
                        <span key={index} className="hoot-comment">
                            <Link to={userInfo
                                ? ((userInfo.username === item.replace('@', '').replace(',', '').replace('.', '')
                                    ? `/profile/${item.replace('@', '').replace(',', '').replace('.', '')}`
                                    : `/user/${item.replace('@', '').replace(',', '').replace('.', '')}`))
                                : `/user/${item.replace('@', '').replace(',', '').replace('.', '')}`
                            } className="mention-highlighter"
                            >{item}</Link>{" "}
                        </span>
                    )
                }

                if (item.startsWith('#')) {
                    return (
                        <span key={index} className="hoot-comment">
                            <span className="mention-highlighter">{item}</span>{" "}
                        </span>
                    )
                }

                if (item.startsWith('$')) {
                    return (
                        <span key={index} className="hoot-comment">
                            <span className="mention-highlighter">{item}</span>{" "}
                        </span>
                    )
                }

                return <span key={index} className="hoot-comment">{item}{" "}
                </span>
            })
    )
}

export default CaptionComp
