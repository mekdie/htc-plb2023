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

const LinksUpdate = () => {
    const [passcode, setPasscode] = useState(null);
    const [passcodeFlag, setPasscodeFlag] = useState(false);
    const [passcodeValidation, setPasscodeValidation] = useState(true);

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

    const renderAdminPage = () => {
        return <h1>render admin page to edit links</h1>;
    };

    const renderElements = () => {
        if (passcodeFlag) {
            return <>{renderAdminPage()}</>;
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

export default LinksUpdate;
