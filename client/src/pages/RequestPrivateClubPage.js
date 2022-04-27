import React, { Fragment, useState, useEffect, useContext } from 'react'
// import User from '../context/UserContext'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar/NavBar'
import Profile from '../components/Profile'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import BeatLoader from "react-spinners/BeatLoader";
import { MyLists } from '../context/MyListContext'
import { MyStream } from '../context/MyStreamContext'
import { Button, Form } from 'react-bootstrap'
import { toast } from "react-toastify";
const RequestPrivateClubPage = () => {
    const history = useHistory();
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [purpose, setPurpose] = useState('');
    const [fullname, setFullname] = useState('')

    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
    const BaseURL = process.env.REACT_APP_API_URL;

    const { myStream, hookStream } = useContext(MyStream);
    const categoryForClub = [{ name: "Olympics (Olympics)", username: "Olympics" },
    { name: "World of Fitness (Fitness)", username: "Fitness" },
    { name: "World of Bodybuilding (bodybuilding)", username: "bodybuilding" },
    { name: "Books & Authors (Bookclub)", username: "Bookclub" },
    { name: "Entrepreneurs & Startups (entrepreneur)", username: "entrepreneur" },
    { name: "Cannabis & CBD (Cannabis)", username: "Cannabis" },
    { name: "NFTs & Digital Art (nft)", username: "nft" },
    { name: "Commercial Real Estate (CRE)", username: "CRE" },
    { name: "Music & Artist (Music)", username: "Music" },
    { name: "Dating & Relationships (dating)", username: "dating" },
    { name: "Indie Movies (indiemovies)", username: "indiemovies" },
    { name: "Real Estate (realestate)", username: "realestate" },
    { name: "Religion (push)", username: "push" },
    { name: "Cosplay & Creations (cosplay)", username: "cosplay" },
    { name: "MMA & Kickboxing (MMA)", username: "MMA" },
    { name: "Martial Arts & Training (martialarts)", username: "martialarts" },
    { name: "Food & Cooking (foodies)", username: "foodies" },
    { name: "Fashion & Events (fashion)", username: "fashion" },
    { name: "DIY & Interior Design (diy)", username: "diy" },
    { name: "Crypto & Trading (crypto)", username: "crypto" },
    { name: "All Things Gothic (gothic)", username: "gothic" },
    { name: "Beauty & Health (beauty)", username: "beauty" },
    { name: "World of Crossfit (crossfit)", username: "crossfit" },
    { name: "Mental Health (mentalhealth)", username: "mentalhealth" },
    { name: "Wine & Events (wineclub)", username: "wineclub" },
    { name: "Keto & Diets (keto)", username: "keto" },
    { name: "Political Campaigns (elections)", username: "elections" },
    { name: "Boxing & Training (boxing)", username: "boxing" },
    { name: "American Muscle Cars (americanmuscle)", username: "americanmuscle" },
    { name: "Blockchain (Blockchain)", username: "Blockchain" },
    { name: "Ballet & Events (ballet)", username: "ballet" },
    { name: "Bitcoin (bitcoin)", username: "bitcoin" },
    { name: "Sports (sportstalk)", username: "sportstalk" },
    { name: "Stocks & Trading (stockwatch)", username: "stockwatch" },
    ]
    const privateClubCategory = [
        { name: "Deal Making & Investments (investmentclub)", username: "investmentclub" },
        { name: "Models & Adult Entertainers (playersclub)", username: "playersclub" },
        { name: "Gaming & Gamers (gamergirl)", username: "gamergirl" },
        { name: "Alternative Lifestyle & Events (altlife)", username: "altlife" },
        { name: "True Crime History & Events (truecrime)", username: "truecrime" },
        { name: "College Sports (collegespotlight)", username: "collegespotlight" },
    ]

    useEffect(() => {
        if (myStream) {
            const tracks = myStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }

        if (hookStream) {
            const tracks = hookStream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        }

        if (username !== userInformation.username) {
            const profilePath = `/user/${username}`;
            history.push(profilePath);
        }
        const getUserData = async () => {
            await axios.get(`${BaseURL}/user/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                });
            setLoading(false);
        }
        getUserData();
    }, [username])

    const submitRequestHandler = () => {
        if (category) {
            axios.post(`${BaseURL}/upload/RequestPrivateClub`, {
                username: username, category: category, purpose: purpose, toc: 1, fullname: fullname,verified:userInfo[0].verified
            }).then((res) => {

                toast.success(res.data)
                setTimeout(() => {
                    history.push("/");
                }, 500);
            })
        } else {
            toast.error('Please Choose any Club category to proceed')
        }


    }
    return (
        <Fragment >
            <NavBar />
            <div className="main-body" onContextMenu={(e) => e.preventDefault()} onDrag={(e) => e.preventDefault()}>
                <SideBar />
                {!loading && userInfo[0]&& !userInfo[0].verified && <div style={{ width: "100%", marginTop: '80px', padding: '1rem' }}>

                    <Form onSubmit={(e) => { e.preventDefault(); submitRequestHandler() }} style={{ marginBottom: '2rem' }}>
                        <div className="contract-viewer">
                            <h5>PRIVATE CLUB OWNER AGREEMENT</h5>
                            <p >
                                For the purpose of clarity, MegaHoot Soapbox is referred to as "Soapbox",
                                Soapbox Private Club Owner is referred to as "Club Owner", XMG Coins are
                                referred to as "XMG" and FortisAB Marketplace is referred to as "FortisAB"
                                in this agreement.</p>
                            <p>
                                It is understood and agreed upon that you as a Soapbox Private Club Owner will abide by the terms of service on https://megahoot.net/TOS as well as the additional terms of service below.
                            </p>
                            <p>
                                1) All Soapbox Private Club Owners understand that they are building an actual business on Soapbox. They will have various monetization tools at their disposal to build their business at no cost to the Club Owner.
                            </p>
                            <p>
                                2) Club Owner understands that they are in a revenue generation partnership with MegaHoot Soapbox, the Club Owners receive 80% of all net revenues of their club and Soapbox receives 20%. This is after any transaction fees that may be imposed on Soapbox from a credit card processor. All memberships, virtual experiences or tips that occur using the XMG Coin carry no additional fees.
                            </p>
                            <p>
                                3) Club Owner is solely responsible for building their business, Soapbox provides the platform and tools  for them to do so. The Club Owner agrees to put in the effort to build their business using  the tools provided. Soapbox will feature each Private Club in the Private Club area as well as provide them with a public social media platform to market their business and share it to various other social media platforms that they may have accounts with.
                            </p>
                            <p>
                                4) Club Owner understands that Soapbox is a Club Community where members come to connect and be a part of the topics and communities that mean something to them. It is the sole responsibility of the Club Owner to build their membership base and provide the content to their members.
                            </p>
                            <p>
                                5) Public Content: Club Owners understand that hate speech, misleading others, revealing someone's personal information, sharing sexually explicit media of someone or threatening them with it, sharing sexual or suggestive content involving minors, offensive content, inciting violence and bullying is a violation of the terms of service and could be a cause for immediate revocation of not only club ownership but also being a part of the entire MegaHoot Soapbox system.
                            </p>
                            <p>
                                Private Clubs: Club Owners understand that this is their business and they can build it as they see fit as long as they abide by Soapbox's Terms of Service. Private Clubs are just that private, so the conversation and content is at the discretion of the club owner and it's members. However if a Club Owner shall post or allow for a member to post any content whatsoever as it relates to sexual or suggestive content involving minors, animal abuse or inciting violence, this can cause an immediate repossession of the Private Club after it is investigated by the Soapbox legal team.
                            </p>
                            <p>
                                6) Club Owner agrees that their Private Club is not violating any copyright or trademark laws as it relates to their content or brand name.
                            </p>
                            <p>
                                7) Club Owner understands that they will have the ability to create a Fortis Auction Blockmarket account in order to market their products and services to their members and the general public.
                            </p>
                            <p>
                                8) In order to protect our Club Owners and their members, Club Owner agrees that Any and All products or services marketed to sell to the Soapbox community or to their members on Soapbox MUST come from FortisAB Marketplace, they must be listed there for sale. Adding outside links to other e-commerce websites is a violation of Soapbox's terms of service and can cause an immediate suspension of services to the Club Owner.
                            </p>
                            <p>
                                9) Club Owner will have the option to add proprietary Non-Fungible Tokens "NFTs" to FortisAB Marketplace on an auction basis or just as a Showcase Item, this can only be done via the MegaHoot staff and will be added on the backbone of the Pecu Novus Network. All NFT's can only be purchased with Pecu Novus Coins as NFT sales are irreversible; this is a protective measure for our NFT creators, they can be  marketed to the general public. This is a partnership where the Club Owner and Soapbox are 60/40 partners in this transaction and Club Owner will incur no gas fees or other fees from completed NFT transactions and will retain 60% of all net revenue for their NFT sales. Soapbox will feature such NFT's on FortisAB's main page for maximum impact and using the FortisAB Marketplace system to complete all transactions once an auction is completed or sale is initiated.
                            </p>
                            <p>
                                10) Club Owner will have the option in the future to have their video content included in the Soapbox video streaming application that will be added to platforms such as FireTV and Roku. This would become an advertising partnership between the Club Owner and Soapbox in which content creators would be able to further monetize their content.
                            </p>
                            <p>
                                11) Club Owner owns their content unless otherwise specified. Soapbox allows a Club Owner to monetize their original content on Soapbox. Club Owner agrees that all content in the Private Club On-Demand Media areas that they are monetizing is their content and they own full rights to this content. Hoots on the private timeline are excluded.
                            </p>
                            <p>
                                12) Club Owner, at their sole discretion, can create Pay Per View events and sell tickets to these events on FortisAB Marketplace and directly on Soapbox. It is their sole responsibility to provide the equipment and content, Soapbox will provide the platform to stream and sell tickets.
                            </p>
                            <p>
                                13) Club Owner understands that Soapbox encourages the use of the XMG Coin for all transactions as it protects both members and Club Owners alike. These are digital products and services which are irreversible so in the event of a credit card being used by a member for a purchase, Soapbox will do all they can to protect both Club Owners and members from illegal chargebacks and fraud but we do rely on our credit card processing partner Stripe to provide as much protection as possible.
                            </p>
                            <p>
                                14) Club Owner understands that all partnership payouts occur once per month and always on the first Monday of any month. Each payment is the total of the last week of the previous month and the first 3 weeks of the current month. So a payment made the first Monday of May would be for the last week of March and first 3 weeks of April. The last week of every month is for reconciling all transactions.
                            </p>
                            <p>
                                A) At the beginning of the last week of any given month the Club Owner will be notified of the amount they should expect. This is 80% of the net sales from their Soapbox sales such as memberships and digital products and services via their Private Club, 95% of the net sales of all their digital sales on FortisAB Marketplace and 60% of the net sales for any of their NFT auctions or sales on FortisAB Marketplace.
                            </p>
                            <p>
                                B) At the Club Owner's discretion they can select to receive a cash transfer to their bank or receive all or a portion of their due payment in XMG Coins that can be used to purchase other products and services on FortisAB Marketplace and within the MegaHoot Ecosystem with no fees.
                            </p>
                            <p>
                                By digital signing below, the undersigned Soapbox Private Club Owner understands and agrees to all of the terms of this agreement.
                            </p>
                        </div>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                            <Form.Check type="checkbox" required label="I have read the PRIVATE CLUB OWNER AGREEMENT and i agree to abide the rules" />
                            <Form.Control type="text" value={fullname} onChange={(e) => { setFullname(e.target.value) }} required placeholder="Full Name" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>What is the purpose of your private club?</Form.Label>

                            <Form.Control as="textarea" rows={3} required value={purpose} onChange={(e) => { setPurpose(e.target.value) }} type="text" placeholder="Type your answer in brief" />
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Private Club Category</Form.Label>

                            <Form.Control as="select" value={category} required aria-label="Default select example" onChange={(e) => { setCategory(e.target.value) }}>
                                {/* <option>Select Category</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option> */}
                                <option>Select Category</option>
                                {categoryForClub.map((e) => <option value={e.username}>{e.name}</option>)}
                                {privateClubCategory.map((e) => <option value={e.username}>{e.name}</option>)}

                            </Form.Control>
                        </Form.Group>


                        <Button variant="primary" type="submit" >
                            Request Club
                        </Button>
                    </Form>
                </div>}
                {!loading && userInfo[0]&& userInfo[0].verified && <div style={{ width: "100%", marginTop: '80px', padding: '1rem' }}>

<Form onSubmit={(e) => { e.preventDefault(); submitRequestHandler() }} style={{ marginBottom: '2rem' }}>
    <div className="contract-viewer">
        <h5>PRIVATE CLUB OWNER AGREEMENT</h5>
        <p >
            For the purpose of clarity, MegaHoot Soapbox is referred to as "Soapbox",
            Soapbox Private Club Owner is referred to as "Club Owner", XMG Coins are
            referred to as "XMG" and FortisAB Marketplace is referred to as "FortisAB"
            in this agreement.</p>
        <p>
            It is understood and agreed upon that you as a Soapbox Private Club Owner will abide by the terms of service on https://megahoot.net/TOS as well as the additional terms of service below.
        </p>
        <p>
            1) All Soapbox Private Club Owners understand that they are building an actual business on Soapbox. They will have various monetization tools at their disposal to build their business at no cost to the Club Owner.
        </p>
        <p>
            2) Club Owner understands that they are in a revenue generation partnership with MegaHoot Soapbox, the Club Owners receive 80% of all net revenues of their club and Soapbox receives 20%. This is after any transaction fees that may be imposed on Soapbox from a credit card processor. All memberships, virtual experiences or tips that occur using the XMG Coin carry no additional fees.
        </p>
        <p>
            3) Club Owner is solely responsible for building their business, Soapbox provides the platform and tools  for them to do so. The Club Owner agrees to put in the effort to build their business using  the tools provided. Soapbox will feature each Private Club in the Private Club area as well as provide them with a public social media platform to market their business and share it to various other social media platforms that they may have accounts with.
        </p>
        <p>
            4) Club Owner understands that Soapbox is a Club Community where members come to connect and be a part of the topics and communities that mean something to them. It is the sole responsibility of the Club Owner to build their membership base and provide the content to their members.
        </p>
        <p>
            5) Public Content: Club Owners understand that hate speech, misleading others, revealing someone's personal information, sharing sexually explicit media of someone or threatening them with it, sharing sexual or suggestive content involving minors, offensive content, inciting violence and bullying is a violation of the terms of service and could be a cause for immediate revocation of not only club ownership but also being a part of the entire MegaHoot Soapbox system.
        </p>
        <p>
            Private Clubs: Club Owners understand that this is their business and they can build it as they see fit as long as they abide by Soapbox's Terms of Service. Private Clubs are just that private, so the conversation and content is at the discretion of the club owner and it's members. However if a Club Owner shall post or allow for a member to post any content whatsoever as it relates to sexual or suggestive content involving minors, animal abuse or inciting violence, this can cause an immediate repossession of the Private Club after it is investigated by the Soapbox legal team.
        </p>
        <p>
            6) Club Owner agrees that their Private Club is not violating any copyright or trademark laws as it relates to their content or brand name.
        </p>
        <p>
            7) Club Owner understands that they will have the ability to create a Fortis Auction Blockmarket account in order to market their products and services to their members and the general public.
        </p>
        <p>
            8) In order to protect our Club Owners and their members, Club Owner agrees that Any and All products or services marketed to sell to the Soapbox community or to their members on Soapbox MUST come from FortisAB Marketplace, they must be listed there for sale. Adding outside links to other e-commerce websites is a violation of Soapbox's terms of service and can cause an immediate suspension of services to the Club Owner.
        </p>
        <p>
            9) Club Owner will have the option to add proprietary Non-Fungible Tokens "NFTs" to FortisAB Marketplace on an auction basis or just as a Showcase Item, this can only be done via the MegaHoot staff and will be added on the backbone of the Pecu Novus Network. All NFT's can only be purchased with Pecu Novus Coins as NFT sales are irreversible; this is a protective measure for our NFT creators, they can be  marketed to the general public. This is a partnership where the Club Owner and Soapbox are 60/40 partners in this transaction and Club Owner will incur no gas fees or other fees from completed NFT transactions and will retain 60% of all net revenue for their NFT sales. Soapbox will feature such NFT's on FortisAB's main page for maximum impact and using the FortisAB Marketplace system to complete all transactions once an auction is completed or sale is initiated.
        </p>
        <p>
            10) Club Owner will have the option in the future to have their video content included in the Soapbox video streaming application that will be added to platforms such as FireTV and Roku. This would become an advertising partnership between the Club Owner and Soapbox in which content creators would be able to further monetize their content.
        </p>
        <p>
            11) Club Owner owns their content unless otherwise specified. Soapbox allows a Club Owner to monetize their original content on Soapbox. Club Owner agrees that all content in the Private Club On-Demand Media areas that they are monetizing is their content and they own full rights to this content. Hoots on the private timeline are excluded.
        </p>
        <p>
            12) Club Owner, at their sole discretion, can create Pay Per View events and sell tickets to these events on FortisAB Marketplace and directly on Soapbox. It is their sole responsibility to provide the equipment and content, Soapbox will provide the platform to stream and sell tickets.
        </p>
        <p>
            13) Club Owner understands that Soapbox encourages the use of the XMG Coin for all transactions as it protects both members and Club Owners alike. These are digital products and services which are irreversible so in the event of a credit card being used by a member for a purchase, Soapbox will do all they can to protect both Club Owners and members from illegal chargebacks and fraud but we do rely on our credit card processing partner Stripe to provide as much protection as possible.
        </p>
        <p>
            14) Club Owner understands that all partnership payouts occur once per month and always on the first Monday of any month. Each payment is the total of the last week of the previous month and the first 3 weeks of the current month. So a payment made the first Monday of May would be for the last week of March and first 3 weeks of April. The last week of every month is for reconciling all transactions.
        </p>
        <p>
            A) At the beginning of the last week of any given month the Club Owner will be notified of the amount they should expect. This is 80% of the net sales from their Soapbox sales such as memberships and digital products and services via their Private Club, 95% of the net sales of all their digital sales on FortisAB Marketplace and 60% of the net sales for any of their NFT auctions or sales on FortisAB Marketplace.
        </p>
        <p>
            B) At the Club Owner's discretion they can select to receive a cash transfer to their bank or receive all or a portion of their due payment in XMG Coins that can be used to purchase other products and services on FortisAB Marketplace and within the MegaHoot Ecosystem with no fees.
        </p>
        <p>
            By digital signing below, the undersigned Soapbox Private Club Owner understands and agrees to all of the terms of this agreement.
        </p>
    </div>


    <Form.Group className="mb-3" controlId="formBasicCheckbox" >
        <Form.Check type="checkbox" required label="I have read the PRIVATE CLUB OWNER AGREEMENT and i agree to abide the rules" />
        <Form.Control type="text" value={fullname} onChange={(e) => { setFullname(e.target.value) }} required placeholder="Full Name" />

    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>What is the purpose of your private club?</Form.Label>

        <Form.Control as="textarea" rows={3} required value={purpose} onChange={(e) => { setPurpose(e.target.value) }} type="text" placeholder="Type your answer in brief" />
        <Form.Text className="text-muted">
            We'll never share your information with anyone else.
        </Form.Text>

    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Private Club Category</Form.Label>

        <Form.Control as="select" value={category} required aria-label="Default select example" onChange={(e) => { setCategory(e.target.value) }}>
            {/* <option>Select Category</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>  <option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option> */}
            <option>Select Category</option>
            {categoryForClub.map((e) => <option value={e.username}>{e.name}</option>)}
            {privateClubCategory.map((e) => <option value={e.username}>{e.name}</option>)}

        </Form.Control>
    </Form.Group>


    <Button variant="primary" type="submit" >
        Create Club
    </Button>
</Form>
</div>}

                {loading &&
                    <div className="loading">
                        <BeatLoader color={"#8249A0"} loading={loading} size={20} />
                    </div>
                }

                {!loading && userInfo[0].verified &&
                    <div className="loading">
                        {/* <BeatLoader color={"#8249A0"} loading={loading} size={20} /> */}
                        <h5>You currently have a private club</h5>
                    </div>
                }
                {/* {!loading &&
                    userInfo.map((user) => {
                        return (<div style={{ width: "100%" }} key={user.id}>
                            <Profile
                                userId={user.id}
                                verified={user.verified}
                                privateChannel={user.privateChannel}
                                followers={user.followers}
                                name={user.name}
                                userName={user.username}
                                profilePic={user.profilePic}
                                website={user.website}
                                bio={user.bio}
                                twitter={user.twitter}
                                instagram={user.instagram}
                                linkedIn={user.linkedIn}
                                facebook={user.facebook}
                                tiktok={user.tiktok}
                                snapchat={user.snapchat}
                                reddit={user.reddit}
                                pinterest={user.pinterest}
                                medium={user.medium}
                                tumblr={user.tumblr}
                            />
                            <Helmet>
                                <title>{user.name} (@{username}) on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
                                <meta name="description" content="MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build." />
                            </Helmet>
                        </div>)
                    })
                } */}

            </div>
        </Fragment>
    )
}

export default RequestPrivateClubPage
