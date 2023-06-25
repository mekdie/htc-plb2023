import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Links = () => {
    //db references
    const linksCollectionRef = collection(db, "links");

    // //states
    const [links, setLinks] = useState([]);

    const getLinks = async () => {
        const data = await getDocs(linksCollectionRef);
        setLinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        // reference:
        // https://firebase.google.com/docs/firestore/query-data/get-data

        getLinks();
    }, []);
    return (
        <>
            <section className="animated-background">
                {/* <div id="stars1"></div>
                <div id="stars2"></div>
                <div id="stars3"></div> */}
            </section>

            <div id="profilePicture">
                <img
                    src="https://raw.githubusercontent.com/mekdie/htc-plb2023/main/public/logoHTC.png"
                    alt="logo HTC"
                />
            </div>

            {/* <div className="overlay" id="popup">
                <div className="popup">
                    <div className="popup-photo">
                        <a href="" target="_blank">
                            <img src="" alt="" />
                        </a>
                    </div>
                    <div className="popup-quote">HTC Melbourne picture</div>
                    <a href="" lassName="popup-close" onClick="history.back()">
                        &times;
                    </a>
                </div>
            </div> */}

            <div id="userName">
                <h2>@htc_healingforgiving</h2>
                <p>
                    Retreat Penyembuhan Luka Batin{" "}
                    <span className="nowrap">HTC Melbourne 2023</span>
                </p>
            </div>
            {/* List all the available links */}
            <div id="links">
                {links.map((link) => (
                    <a
                        key={link.id}
                        className="link"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className={link.icon}>&nbsp;</i>
                        {link.name}
                    </a>
                ))}
            </div>

            <div id="hashtag">
                #HealingForgiving<i class="fas fa-heart"></i>
            </div>
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <p>
                                &copy; Designed and built by{" "}
                                <a
                                    href="https://github.com/mekdie/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mekdie
                                </a>
                                {/* &nbsp;for Holy Trinity Community Melbourne 2023:
                                Retreat PLB "Healing Forgiving" */}
                            </p>
                            <p>
                                <a
                                    href="https://github.com/mekdie/htc-plb2023"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-github">&nbsp;</i>
                                    GitHub
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Links;
