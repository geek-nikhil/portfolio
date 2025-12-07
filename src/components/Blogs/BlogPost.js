
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../../Assets/supabase";
import Particle from "../Particle";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./blog.css";

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();
        
      if (error) throw error;
      setBlog(data);
      if (data) {
        fetchComments(data.id);
        incrementViews(data.id);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (blogId) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("blog_id", blogId)
      .order("created_at", { ascending: true });
    setComments(data || []);
  };

  const incrementViews = async (blogId) => {
    await supabase.rpc('increment_blog_view', { blog_id_input: blogId });
  };

  const handleReaction = async (type) => {
    if (!blog) return;
    // Optimistic update
    setBlog(prev => ({
        ...prev,
        [type === "like" ? "likes" : "dislikes"]: (prev[type === "like" ? "likes" : "dislikes"] || 0) + 1
    }));
    await supabase.rpc('increment_reaction', { blog_id_input: blog.id, reaction_type: type });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;
    setSubmitting(true);
    
    try {
      const { error } = await supabase.from("comments").insert([
          { blog_id: blog.id, name: newComment.name, comment: newComment.comment }
      ]);

      if (error) throw error;
      
      // If the function returns the updated list, use it. Otherwise refetch.
      // Assuming function returns the new comment or list.
      // Let's just refetch to be safe or append if we knew the structure.
      fetchComments(blog.id);
      setNewComment({ name: "", comment: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Container className="project-section"><h2 style={{color: "white"}}>Loading...</h2></Container>;
  
  if (!blog) return <Container className="project-section"><h2 style={{color: "white"}}>Blog not found</h2></Container>;

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="blog-content">
        <h1 className="project-heading" style={{ fontSize: "2.5em" }}>
            {blog.title}
        </h1>
        <div style={{ color: "white", marginBottom: "20px" }}>
            <span>{new Date(blog.published_at).toLocaleDateString()}</span> • 
            <span> {blog.views} Views</span>
        </div>
        
        {blog.cover_image && (
            <img src={blog.cover_image} alt={blog.title} style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "10px", marginBottom: "30px" }} />
        )}

        <div className="markdown-body" style={{ color: "white", textAlign: "left" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
            </ReactMarkdown>
        </div>

        <div className="d-flex gap-3 mt-4 mb-5">
            <Button variant="outline-success" onClick={() => handleReaction("like")}>
                <AiFillLike /> {blog.likes}
            </Button>
            <Button variant="outline-danger" onClick={() => handleReaction("dislike")}>
                <AiFillDislike /> {blog.dislikes}
            </Button>
        </div>

        <hr style={{ color: "white" }} />
        
        <h3 style={{ color: "white" }}>Comments</h3>
        <div className="mb-4">
            {comments.map(c => (
                <div key={c.id} className="p-3 mb-2" style={{ background: "rgba(255,255,255,0.1)", borderRadius: "5px", color: "white", textAlign: "left" }}>
                    <strong>{c.name}</strong> <small className="text-muted" style={{marginLeft: "10px"}}>{new Date(c.created_at).toLocaleString()}</small>
                    <p className="mb-0 mt-1">{c.comment}</p>
                </div>
            ))}
        </div>

        <Form onSubmit={handleCommentSubmit} style={{ textAlign: "left", color: "white" }}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Your Name" 
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Your Comment"
                    value={newComment.comment}
                    onChange={(e) => setNewComment({...newComment, comment: e.target.value})}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post Comment"}
            </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default BlogPost;
