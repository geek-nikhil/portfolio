import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

// Google Drive Preview Link (Use "preview" instead of "view")
const pdf = "https://drive.google.com/file/d/15pDrwck-u_ZImHq0jOhJGahZgIBpftyX/preview";

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href="https://drive.google.com/file/d/15pDrwck-u_ZImHq0jOhJGahZgIBpftyX/preview"
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume" style={{ justifyContent: "center", marginTop: "20px" }}>
          {/* Use iframe for Google Drive PDF Preview */}
          <iframe
            src={pdf}
            width={width > 786 ? "80%" : "100%"}
            height="1100px"
            style={{ border: "none" }}
            allow="autoplay"
          ></iframe>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href="https://drive.google.com/file/d/15pDrwck-u_ZImHq0jOhJGahZgIBpftyX/preview"
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
