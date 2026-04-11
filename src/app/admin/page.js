"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (sessionStorage.getItem("avlune_admin_auth") === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use env variable or fallback
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "AVLUNE20265";
    
    if (password === correctPassword) {
      sessionStorage.setItem("avlune_admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="icon-wrapper">
            <Lock size={24} color="#C9A96E" />
          </div>
          <h1>Admin Portal</h1>
          <p>Enter your authorization key to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="password"
              placeholder="Authorization Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Access Dashboard
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/">← Return to Storefront</a>
        </div>
      </motion.div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1A1A1A;
          background-image: radial-gradient(circle at center, #2A2A2A 0%, #111 100%);
          padding: 1rem;
          font-family: var(--font-body);
        }

        .login-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 3rem 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          background: rgba(201, 169, 110, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        h1 {
          font-family: var(--font-display);
          color: white;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group input {
          width: 100%;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          text-align: center;
          letter-spacing: 0.1em;
        }

        .input-group input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.2);
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          background: var(--color-accent);
          color: #111;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .login-btn:hover {
          background: var(--color-accent-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px rgba(201, 169, 110, 0.5);
        }

        .error-message {
          color: #EF4444;
          font-size: 0.875rem;
          text-align: center;
          margin: -0.5rem 0;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .login-footer a {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
          transition: color 0.3s;
        }

        .login-footer a:hover {
          color: white;
        }
      `}</style>
    </div>
  );
}
