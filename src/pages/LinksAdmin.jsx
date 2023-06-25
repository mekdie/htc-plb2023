import React from "react";
import { useState, useEffect } from "react";
import PasscodeInput from "../components/PasscodeInput";
import {
    collection,
    getDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, deleteObject } from "firebase/storage";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { scale } from "../Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

const LinksAdmin = () => {
    const [passcode, setPasscode] = useState(null);
    const [passcodeFlag, setPasscodeFlag] = useState(false);
    const [passcodeValidation, setPasscodeValidation] = useState(true);

    //links state
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

    const [loadingProgress, setLoadingProgress] = useState(0);

    const getPagePasscode = async () => {
        const passcodeDoc = doc(
            db,
            "passcode",
            process.env.REACT_APP_PASSCODE_ID
        );
        const docSnap = await getDoc(passcodeDoc);
        setPasscode(docSnap.data().passcode);
    };

    const handlePasscodeSubmit = (e, inputValue) => {
        e.preventDefault();
        if (inputValue === passcode) {
            setPasscodeFlag(true);
            //set an artificial loading
            var i = 1;
            function artificialLoading() {
                //run every 1ms to 50 times
                setTimeout(function () {
                    if (i < 50) {
                        setLoadingProgress(scale(i, 0, 50, 0, 50).toFixed(0));
                        i++;
                        artificialLoading();
                    } else {
                        //100% flick
                        setLoadingProgress(100);
                        // setTimeout(() => setLoading(false), 100);
                    }
                }, 1);
            }
            artificialLoading();
        } else {
            setPasscodeValidation(false);
        }
    };
    const renderLinks = () => {
        let counter = 1;
        if (links.length > 0) {
            return links.map((link) => {
                return (
                    <tr className="align-middle" key={link.id}>
                        <td>{counter++}</td>
                        <td>{link.name}</td>
                        <td>{link.url}</td>
                        <td>{link.icon}</td>
                        <td className="text-center">
                            <span title="Edit">
                                <FontAwesomeIcon
                                    style={{
                                        marginRight: "0.25rem",
                                        cursor: "pointer",
                                    }}
                                    icon={faPencil}
                                    color="black"
                                    onClick={() => {
                                        alert(
                                            "belom bisa sabar ya in development :)"
                                        );
                                    }}
                                />
                            </span>
                            <span title="Delete">
                                <FontAwesomeIcon
                                    style={{
                                        marginLeft: "0.25rem",
                                        cursor: "pointer",
                                    }}
                                    icon={faTrash}
                                    color="black"
                                    onClick={() => {
                                        alert(
                                            "belom bisa sabar ya in development :)"
                                        );
                                    }}
                                />
                            </span>
                        </td>
                    </tr>
                );
            });
        } else {
            return (
                <tr className="align-middle text-center">
                    <td colSpan={10}>No participants found</td>
                </tr>
            );
        }
    };

    const renderAdminPage = () => {
        return (
            <div className="links-container">
                <h2>Links</h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Icons</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingProgress !== 100 ? (
                            <tr className="align-middle text-center">
                                <td colSpan={10}>
                                    <ReactLoading
                                        id="loadingParticipants"
                                        type="bars"
                                        color="grey"
                                    />{" "}
                                </td>
                            </tr>
                        ) : (
                            renderLinks()
                        )}
                    </tbody>
                    {/* {users.length > 0 && (
                        <caption>
                            <Button
                                variant="danger"
                                onClick={() => deleteModal({ type: 2 })}
                            >
                                Delete all records
                            </Button>
                        </caption>
                    )} */}
                </Table>
            </div>
        );
    };

    const renderElements = () => {
        if (passcodeFlag) {
            return (
                <Container style={{ marginTop: "25px" }}>
                    {renderAdminPage()}
                </Container>
            );
        } else {
            return (
                <PasscodeInput
                    onSubmit={handlePasscodeSubmit}
                    wrongPasscode={passcodeValidation}
                />
            );
        }
    };

    useEffect(() => {
        // reference:
        // https://firebase.google.com/docs/firestore/query-data/get-data

        getPagePasscode();
    }, []);

    return <div>{renderElements()}</div>;
};

export default LinksAdmin;
