import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function CommentsList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/comments')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const feedbackCount = feedbacks.length;

  return (
    feedbackCount
  );
}


function CommentForm() {
  const { id } = useParams();
  const [nid, setNid] = useState('');
  const [text, setText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const CommentsListVal = CommentsList()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nid:CommentsListVal+1,
          idnews: id,
          text: text,
          authorname: authorName,
        }),
      });
      const data = await response.json();
      console.log(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isSubmitted ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Your comment has been saved.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="authorName" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Your Name:</label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "30rem" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="text" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Your Comment:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", height: "10rem", maxWidth: "40rem" }}
              required
            />
          </div>
          <button type="submit" style={{ backgroundColor: "#0077FF", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default CommentForm;