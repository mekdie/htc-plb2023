import React from "react";
import "./App.css";

const links = [
    {
        id: 1,
        name: "Pre-order Food",
        url: "https://forms.gle/2tWgtvCWiiE6EpWQ9",
        color: "#FF6384",
        icon: "fas fa-utensils",
    },
    {
        id: 2,
        name: "Expression of Interest Retreat",
        url: "https://forms.gle/xVHvYCAi9fFSR3fCA",
        color: "#36A2EB",
        icon: "fas fa-pencil-alt",
    },
    {
        id: 3,
        name: "Instagram",
        url: "https://www.instagram.com/htc_healingforgiving",
        color: "#36A2EB",
        icon: "fab fa-instagram",
    },
];

const App = () => {
    return (
        <>
            <section className="animated-background">
                <div id="stars1"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </section>

            <div id="profilePicture">
                <img src="build/logoHTC.png" alt="logo HTC" />
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

            <div id="userName">@htc_healingforgiving</div>

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

            <div id="hashtag">#HealingForgiving❤</div>
        </>
    );
};

export default App;
