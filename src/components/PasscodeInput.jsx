import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

function PasscodeInput({ onSubmit, wrongPasscode }) {
    const passcodeRef = useRef(undefined);

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <Row>
                <Col className="text-center">
                    {/* Your content goes here */}
                    <Form
                        className="passcode-input-box-container "
                        onSubmit={(e) => onSubmit(e, passcodeRef.current.value)}
                    >
                        <Stack
                            style={{ marginBottom: "0.5rem" }}
                            direction="horizontal"
                            gap={2}
                        >
                            <Form.Control
                                className="me-auto"
                                placeholder="Enter passcode to access this page..."
                                ref={passcodeRef}
                            />
                            <Button type="submit" variant="secondary">
                                Submit
                            </Button>
                            {/* <div className="vr" /> */}
                            {/* <Button variant="outline-danger">Reset</Button> */}
                        </Stack>
                        {!wrongPasscode && (
                            <Form.Text style={{ color: "red" }}>
                                Salah woii wkwk, dicoba lagi
                            </Form.Text>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PasscodeInput;
