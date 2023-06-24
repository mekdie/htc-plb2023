import React from "react";
import { Card } from "react-bootstrap";

const LinkCard = ({ link }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{link.name}</Card.Title>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Visit Link
                </a>
            </Card.Body>
        </Card>
    );
};

export default LinkCard;
