import React, { useState, useEffect } from "react";
import "./Project.css";

function MainComponent() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ text: "", date: "" });
  const [scheduled, setScheduled] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text || !form.date) return;

    const newPost = { ...form, id: Date.now() };
    setScheduled((prev) => [...prev, newPost]);
    setForm({ text: "", date: "" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const readyPosts = scheduled.filter((p) => new Date(p.date) <= now);
      if (readyPosts.length > 0) {
        setPosts((prev) => [...prev, ...readyPosts]);
        setScheduled((prev) => prev.filter((p) => new Date(p.date) > now));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [scheduled]);

  return (
    <div className="app">
      <div className="left">
        <h2 className="left-heading">What's on your mind</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Enter post text"
            rows="4"
          />
          
          <div className="date-input">
          <label for="date">Post By</label>
          <input
            type="datetime-local"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
          />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="right">
        <h2 className="right-heading">Timeline</h2>
        {posts.length === 0 && <p>No posts yet...</p>}
        <div className="posts">
          {posts.map((p) => (
            <div key={p.id} className="post-card">
              <small>{new Date(p.date).toLocaleString()}</small>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}

export default MainComponent;
