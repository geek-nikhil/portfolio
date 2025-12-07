
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "./BlogCard";
import Particle from "../Particle";
import { supabase } from "../../Assets/supabase";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blogs </strong>
        </h1>
        <p style={{ color: "white" }}>
          Sharing my thoughts and experiences.
        </p>
        
        {loading ? (
             <p style={{ color: "white" }}>Loading blogs...</p>
        ) : (
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {blogs.map((blog) => (
                <Col md={4} className="project-card" key={blog.id}>
                <BlogCard blog={blog} />
                </Col>
            ))}
            </Row>
        )}
      </Container>
    </Container>
  );
}

export default BlogList;
