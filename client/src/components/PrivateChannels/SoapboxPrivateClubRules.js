import React from 'react'
import { FaWindowClose } from 'react-icons/fa';

const SoapboxPrivateClubRules = ({ setShowClubRules }) => {
    return (
        <div className="slide-container clubRulesText">
            <div
                id="slideCR"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DCD5FA",
                    padding: "1rem",
                    margin: "1rem",
                }}
            >
                <div style={{
                    maxHeight: "450px",
                    overflowY: "scroll",
                    position: "relative",
                }}
                >
                    <FaWindowClose
                        className="FaWindowClose"
                        style={{
                            cursor: "pointer",
                            color: "red",
                            position: "absolute",
                            right: "0px",
                        }}
                        onClick={() => {
                            document.getElementById("slideCR").style.transition = "2sec";
                            document.getElementById("slideCR").style.right = "-100vw";

                            setTimeout(() => {
                                setShowClubRules(false);
                            }, 1000);
                        }}
                    />

                    <h4> RULES OF THE ROAD</h4>
                    <p>
                        Soapbox is a Club Community where members can not only
                        connect but Club Owners can build real businesses as
                        Private Club Owners.. All Community Clubs are here for
                        you, our members, that allow you to create discussions,
                        share ideas, support each other, create events, connect
                        with likeminded people and we encourage you to find the
                        right community club for you. Even create build your own
                        virtual business as a Private Club Owner, a real
                        business.
                    </p>
                    <p>
                        So with that said these are some general Club rules that
                        all members have to adhere to:
                    </p>

                    <h5>RULE 1</h5>

                    <p>
                        Be mindful of others and don't join a community club to
                        cause disruption. Community Clubs are topic specific
                        with Break-Off Chats that are created by members to
                        create conversation, find the club that is right for
                        you. Members that create disruption by adding offensive
                        content, hate speech, attacking others, inciting
                        violence, well they run the risk of not only being
                        banned from that Club Community but also run the risk of
                        being banned from Soapbox in general. We take this very
                        seriously and bans are not temporary, they are
                        permanent.
                    </p>

                    <h5>RULE 2</h5>
                    <p>
                        Privacy and Security, All club members must adhere to
                        privacy policies and in simple terms respect other
                        members' privacy and keep the community safe. Don't
                        harass other members with repeated private chat requests
                        or messages, Do not instigate harassment by revealing
                        someone's personal information, sharing sexually
                        explicit media of someone or threatening them. Violators
                        run the risk of not only being banned from that Club but
                        also being banned from Soapbox in general.

                        <h5> RULE 3</h5>
                        Impersonating someone to mislead others, sharing sexual
                        or suggestive content involving minors, threatening
                        other members will be cause for an immediate ban.
                        Soapbox members don't have to use their real names but
                        impersonating a celebrity or business to trick people is
                        a NO NO, we protect our members and have a zero
                        tolerance policy as it relates to these three issues.

                        <h5> RULE 4</h5>
                        Don't be a bully, no one likes a bully, so remember to
                        help build the Club Communities for the better of the
                        community. Sharing opinions is encouraged, creating
                        conversations with opposing views is fine, trying to
                        bully someone into sharing your opinion as it relates to
                        political views, parenting or other is a violation.
                        Everyone is entitled to their own views so respect that,
                        if you don't like their views then create your OWN
                        Break-Off Chat for a topic that you want or better yet
                        Request to be a Private Club Owner and control your own
                        little world.

                        <h5>RULE 5 </h5>
                        Spamming, just don't do it, keep the community clean ,
                        robust and enjoyable. Spammers will be banned.

                        <h5>RULE 6 </h5>
                        Sharing illegal content, soliciting or facilitating
                        illegal transactions or prohibited transactions will
                        result in an immediate ban.

                        <h5>RULE 7 </h5>
                        Safety first, Soapbox uses the XMG Coin as an internal
                        cryptocurrency for ALL transactions on Soapbox. This
                        protects our members from credit card fraud, illegal
                        chargebacks and fraud in general. Soapbox can guarantee
                        against fraud this way, so all transactions for products
                        or services MUST be kept on Soapbox for your protection,
                        Transactions done away from Soapbox are a violation of
                        our security measures and prevent us from protecting
                        members. All products, services and other listings that
                        are in the Marketplace are directly posted on Fortis
                        Auction Blockmarket, this is Soapbox's ONLY Marketplace.
                        Members must adhere to using Fortis for their sales of
                        products, services and other transactions. Avoid fraud
                        and adhere to our security measures for your protection.

                        <h5>RULE 8 </h5>
                        Virtual Experiences are a great tool for members to
                        connect with Private Club Owners that may be
                        celebrities, pro athletes, authors and more.
                        Transactions away from Soapbox are a violation and can
                        cause the Private Club Owner and Member to receive a
                        first warning, if it happens a second time then the
                        Member can be banned and the Private Club Owner will
                        lose their club ownership rights.
                    </p>

                    <h5>RULE 9</h5>
                    <p>
                        Virtual and In Person Events can be set up on Soapbox
                        for the better of the community, don't abuse that and if
                        in person events are being arranged please put safety
                        first. We want our members to always be safe and sound.
                    </p>
                    <p>
                        The rules are simple and enforcement of these rules come
                        from our members HOWEVER falsely reporting a member for
                        a violation can result in a first warning to the member
                        that falsely reported . We needed to make that crystal
                        clear to avoid false reports.
                    </p>
                    <p>
                        Above all please protect your communities, help to grow
                        them, help and support others, make it your own. For
                        Private Club Owners, this is your business, so treat it
                        as such and build it strong for the better of your Club
                        and the Soapbox Community in general.
                    </p>

                    <h5>ENFORCEMENT OF RULES</h5>
                    <p>
                        Well we have a number of ways that rules are enforced
                        and we take it seriously. We will ask you nicely to cut
                        it out the first time, the next step won't be that
                        friendly and the last step is not only a permanent ban
                        from that Community or Private Club but from the entire
                        MegaHoot ecosystem. Trust me you don't want that as you
                        will not be able to use Soapbox, VeroHive, DocuMega, XMG
                        Fintech, MegaHoot Vault, ZecureHive, gaming or any
                        platforms that will be added in the future. So play by
                        the rules and make Soapbox as great as it can be!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SoapboxPrivateClubRules
