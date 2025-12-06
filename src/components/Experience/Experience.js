import React from "react";
import { Container, Row } from "react-bootstrap";
import Particle from "../Particle";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork } from "react-icons/md";

function Experience() {
  return (
    <Container fluid className="experience-section">
      <Particle />
      <Container>
        <h1 className="project-heading mt-20">
          My <strong className="purple">Experience </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are my professional experiences.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <VerticalTimeline>
            <VerticalTimelineElement
              className=""
              contentStyle={{ background: "rgba(8, 23, 121, 1)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(133, 220, 243)" }}
              date="March 2025 - Present"
              dateClassName="!left-[90%]"
              iconStyle={{ background: "rgb(33, 50, 243)", color: "#fff" }}
              icon={<MdWork />}
            >
              <h3 className="vertical-timeline-element-title">
                Full Stack Developer
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Propzing - Real Estate AI Platform
              </h4>
              <p>
                Hybrid– Led UI consistency initiatives by developing and refactoring
                5+ applications in Next.js, improving design uniformity
                across 10+ core application pages– Engineered scalable team
                management system using Supabase and client-side logic, enhancing
                workflow efficiency for 500+ platform users– Optimized chatbot
                workflow architecture, reducing response times by 3x through
                UI/backend integration improvements– Integrated secure payment systems
                using DodPayments and Stripe, and implemented Meta WhatsApp APIs for
                enhanced Marketing capabilities
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgba(8, 23, 121, 1)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(33, 50, 243)" }}
              date="February 2025 - March 2025"
              iconStyle={{ background: "rgb(33, 50, 243)", color: "#fff" }}
              icon={<MdWork />}
            >
              <h3 className="vertical-timeline-element-title">
                Frontend Developer
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Amargenix - Education Technology Platform
              </h4>
              <p>
                Remote– Developed responsive web platform for government exam
                preparation using React.js and modern CSS techniques–
                Collaborated using Git version control, managing pull requests
                and resolving merge conflicts in team environment
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Row>
      </Container>
    </Container>
  );
}

export default Experience;
