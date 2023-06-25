import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
    return (
        <footer class="footer">
            <Container>
                <Row>
                    <Col>
                        <p>
                            &copy; Designed and built by{" "}
                            <a
                                href="https://github.com/mekdie/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mekdie
                            </a>
                            &nbsp;specially for HTC2023
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
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
