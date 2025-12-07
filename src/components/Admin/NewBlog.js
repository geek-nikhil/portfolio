
import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { supabase } from "../../Assets/supabase";
import ImageUpload from "./ImageUpload";
import Particle from "../Particle";
import ReactMarkdown from "react-markdown";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSlug(generateSlug(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("blogs").insert([
        {
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage,
          status: "published",
          published_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      alert("Blog created successfully!");
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
    } catch (error) {
      alert("Error creating blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container style={{ position: "relative", zIndex: "10" }}>
        <h1 className="project-heading">Create New <strong className="purple">Blog</strong></h1>
        <Form onSubmit={handleSubmit} style={{ color: "white", textAlign: "left" }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </Form.Group>

          <ImageUpload onUpload={setCoverImage} />

          <Form.Group className="mb-3">
            <Form.Label>Excerpt</Form.Label>
            <Form.Control as="textarea" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
          </Form.Group>

          <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Content (Markdown)</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={15} 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        style={{ fontFamily: 'monospace' }}
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Label>Preview</Form.Label>
                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", height: "400px", overflowY: "auto", background: "#1e1e1e" }}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Publish Blog"}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default NewBlog;
