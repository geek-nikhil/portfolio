
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function BlogCard({ blog }) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={blog.cover_image} alt="card-img" style={{ height: "200px", objectFit: "cover"  , borderRadius: "10px"}} />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {blog.excerpt}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" as={Link} to={`/blogs/${blog.slug}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CgFileDocument /> 
            Read More
            </Button>
            <span style={{ color: "white" }}>
                <FaEye /> {blog.views || 0}
            </span>
        </div>
      </Card.Body>
    </Card>
  );
}
export default BlogCard;
