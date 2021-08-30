import React from 'react'

const Highlighter = ({
    text,
    highlight
}) => {
    // Split on highlight term and include term into parts, ignore case

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                <span>
                    {parts.map(part => part === highlight ? <b>{part}</b> : part)}
                </span>
            )}
        </span>
    )
}

export default Highlighter
