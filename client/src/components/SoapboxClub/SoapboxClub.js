import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './soapboxClub.css'
import CreatorPrivateClub from './CreatorPrivateClub'

const SoapboxClub = () => {
    const [privateClubs, setPrivateClubs] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getPrivateClubs = async () => {
            axios.get(`${BaseURL}/private-clubs`)
                .then(res => {
                    setPrivateClubs(res.data);
                    console.log(res.data);
                })
        }

        getPrivateClubs();
    }, [])

    return (
        <div className="s-club">
            {privateClubs.map(creator =>
                <CreatorPrivateClub key={creator.id} creator={creator} />
            )}
        </div>
    )
}

export default SoapboxClub
