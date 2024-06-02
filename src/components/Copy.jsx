import React, { useRef, useState } from 'react';
import { BsCopy } from 'react-icons/bs';

function Copy({ text }) {
    const [copy, setCopy] = useState(false);
    const timeOutRef = useRef(null)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopy(true);

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(() => {
            setCopy(false);
        }, 2000);


    }
    return (
        <div>{copy ? <p>Copied</p> : <BsCopy onClick={copyToClipboard} />}</div>
    )
}

export default Copy