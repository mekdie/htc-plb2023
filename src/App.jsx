import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./App.css";

const links = [
    {
        id: 1,
        name: "Link PO Rawon",
        url: "https://forms.gle/2tWgtvCWiiE6EpWQ9",
    },
    {
        id: 2,
        name: "Link EOI Retreat",
        url: "https://forms.gle/xVHvYCAi9fFSR3fCA",
    },
];

const App = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">
                HTC HEALING FORGIVING - PLB 2023
            </h1>
            <Row className="justify-content-center">
                {links.map((link) => (
                    <Col key={link.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="link-card">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Card.Body>
                                    <Card.Title>{link.name}</Card.Title>
                                </Card.Body>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default App;
