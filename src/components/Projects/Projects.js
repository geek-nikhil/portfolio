import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/image.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import editor from "../../Assets/Projects/codeEditor.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Critique Connect- Full Stack Review Platform"
              description="React, Node.js, Express, MongoDB, NLP– Architected and deployed full-stack application connecting 100+ users with reviewers for product feedback– Implemented user dashboard with intuitive navigation with seamless experience– Integrated NLP-based analysis for automated feedback generation, reducing manual review time by 40%– Designed RESTful APIs and managed database schema for scalable user and review data managemen"
              ghLink="https://github.com/geek-nikhil/Critique_Connect"
              demoLink="https://critique-connect-rho.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Coding Tribe- Collaborative Learning Platform"
              description="React, WebSockets, Web Scraping, Real-time Communication– Built collaborative coding platform enabling knowledge sharing and peer learning among developers– Implemented real-time communication using WebSockets supporting 3+ simultaneous group interactions– Developed verification system using web scraping to validate 100+ LeetCode task submissions automatically– Created group chat functionality and code sharing features enhancing collaborative learning experience"
              ghLink="https://github.com/geek-nikhil/CodingTribe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="The Power Play- Energy Monitoring System"
              description="Node.js, Machine Learning, REST APIs, Data Visualization– Developed full-stack energy monitoring tool with real-time power consumption tracking and analytics– Integrated machine learning models via REST APIs to predict and optimize energy usage patterns– Achieved 20% improvement in energy efficiency through data-driven insights and consumption optimization– Implemented data visualization dashboard for real-time monitoring and historical trend analysis"
              ghLink="https://github.com/geek-nikhil/PowerPlayBackend"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
