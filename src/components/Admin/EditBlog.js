
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../Assets/supabase";
import ImageUpload from "./ImageUpload";
import Particle from "../Particle";
import ReactMarkdown from "react-markdown";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
        
      if (error) throw error;
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setCoverImage(data.cover_image);
    } catch (error) {
      alert("Error fetching blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // Don't auto-update slug on edit to preserve SEO URLs usually, but user can edit naturally
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase.from("blogs").update({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage,
          updated_at: new Date().toISOString(),
      }).eq('id', id);

      if (error) throw error;
      alert("Blog updated successfully!");
      navigate(`/blogs/${slug}`);
    } catch (error) {
      alert("Error updating blog: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Container className="project-section"><h2 style={{color: "white"}}>Loading...</h2></Container>;

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container style={{ position: "relative", zIndex: "10" }}>
        <h1 className="project-heading">Edit <strong className="purple">Blog</strong></h1>
        <Form onSubmit={handleSubmit} style={{ color: "white", textAlign: "left" }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </Form.Group>

          <ImageUpload onUpload={setCoverImage} existingImage={coverImage} />

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

          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Blog"}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default EditBlog;
