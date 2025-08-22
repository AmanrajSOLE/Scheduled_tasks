import React, { useState, useEffect } from "react";

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
        <h2>What's on your mind</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Enter post text"
          />
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="right">
        <h2>Timeline</h2>
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
