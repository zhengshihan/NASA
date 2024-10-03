import React, { useState, useEffect } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768); // Default isVisible based on screen size
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768); // Show chatbot on larger screens
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
    ]);
    setInput("");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      const botMessage =
        data.candidates[0]?.content.parts[0]?.text ||
        "Sorry, I didn’t understand that.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: " + data.error.message, isUser: false },
      ]);
    }
  };

  return (
    <>
      {isVisible && (
        <div className={styles.chatbotContainer}>
          <button
            onClick={() => setIsVisible(false)}
            className={styles.closeButton}
          >
            ×
          </button>
          <h2 style={{ fontSize: "16px", margin: "0 0 10px", color: "black" }}>
            Chatbot
          </h2>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{ textAlign: msg.isUser ? "right" : "left" }}
              >
                <p
                  className={`${styles.message} ${
                    msg.isUser ? styles.messageUser : styles.messageBot
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={styles.inputField}
              rows={1}
              style={{
                height: `${Math.min(input.split("\n").length * 24, 150)}px`,
              }}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}

      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            zIndex: 1001,
          }}
        >
          Ask chatbot
        </button>
      )}
    </>
  );
};

export default Chatbot;
