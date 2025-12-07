
import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import NewBlog from "./NewBlog";
import Particle from "../Particle";

function Admin() {
  const [showModal, setShowModal] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      setShowModal(false);
    }
  }, []);

  const handleValidation = (e) => {
    e.preventDefault();
    if (passcode === "geek-nikhil-blogs-846") {
      setIsAuthenticated(true);
      setShowModal(false);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Incorrect Passcode");
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      
      {!isAuthenticated ? (
        <Container>
           <h1 className="project-heading" style={{color: "white"}}>
             Admin <strong className="purple">Access</strong>
           </h1>
           <Modal 
            show={showModal} 
            backdrop="static" 
            keyboard={false}
            centered
           >
             <Modal.Header>
               <Modal.Title>Enter Admin Passcode</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <Form onSubmit={handleValidation}>
                 <Form.Group className="mb-3">
                   <Form.Control
                     type="password"
                     placeholder="Passcode"
                     value={passcode}
                     onChange={(e) => setPasscode(e.target.value)}
                     autoFocus
                   />
                 </Form.Group>
                 {error && <p className="text-danger">{error}</p>}
                 <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Access
                    </Button>
                 </div>
               </Form>
             </Modal.Body>
           </Modal>
        </Container>
      ) : (
        <NewBlog />
      )}
    </Container>
  );
}

export default Admin;
