
import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { supabase } from "../../Assets/supabase";

function ImageUpload({ onUpload, existingImage }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingImage || "");

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("blogs").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      onUpload(data.publicUrl);
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Cover Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <p className="text-muted">Uploading...</p>}
      </Form.Group>
      {imageUrl && (
        <div className="mb-3">
            <Image src={imageUrl} thumbnail style={{ maxHeight: "200px" }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
