import React from "react";
import { useState, useEffect } from "react";
import PasscodeInput from "../components/PasscodeInput";
import {
    collection,
    getDoc,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { scale } from "../Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

const LinksAdmin = () => {
    const [passcode, setPasscode] = useState(null);
    const [passcodeFlag, setPasscodeFlag] = useState(false);
    const [passcodeValidation, setPasscodeValidation] = useState(true);

    //db references
    const linksCollectionRef = collection(db, "links");

    // //states
    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState(null);
    const [editableData, setEditableData] = useState({});

    //modal state
    const [showModal, setShowModal] = useState(false);
    //=======

    //get single link

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
                                        if (showModal) {
                                            setShowModal(false);
                                        } else {
                                            setShowModal(true);
                                        }
                                        setEditableData(link);
                                        setCurrentLink(link);
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

    const handleChange = (e) => {
        setEditableData({
            ...editableData,
            [e.target.name]: e.target.value,
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("updateBtn").click();
        }
    };

    const updateModal = () => {
        if (currentLink) {
            return (
                <>
                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update this link</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editableData.name}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="text"
                                    value={editableData.url}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="default"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                id="updateBtn"
                                onClick={() => updateLink()}
                                variant="danger"
                                type="submit"
                            >
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
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
                </Table>
            </div>
        );
    };

    const updateLink = async () => {
        setShowModal(false);
        //update link here
        const userDoc = doc(db, "links", editableData.id);

        await updateDoc(userDoc, editableData);
        getLinks();
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

    return (
        <div>
            {renderElements()}
            {updateModal()}
        </div>
    );
};

export default LinksAdmin;
