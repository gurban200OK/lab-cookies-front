"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Field from "./Field";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({ confirm: "", form: "" });
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmRef = useRef(null);

  const isLogin = mode === "login";

  async function handleLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      await login(email, password);
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirm) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      confirmRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setErrors({ confirm: "", form: "" });

    try {
      await signup(name, email, password);
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrors({ confirm: "", form: "" });
  }

  return (
    <div className="auth-card w-full max-w-md">
      <div className="auth-card-inner neon-border bg-panel rounded-xl p-8 sm:p-10">
        <Link
          href="/"
          className="block text-center text-primary neon-text font-bold tracking-[0.3em] mb-1 cursor-pointer hover:text-primary-strong transition-colors"
        >
          DEVFORGE
        </Link>

        <p className="text-center text-xs text-muted tracking-widest mb-6">
          {"// access_terminal"}
        </p>

        <div
          className="auth-mode-toggle grid grid-cols-2 gap-1 p-1 mb-8 rounded-md bg-background/60 border border-panel-border"
          role="tablist"
          aria-label="Authentication mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            onClick={() => switchMode("login")}
            className={`auth-mode-btn rounded-sm py-2 text-[10px] uppercase tracking-[0.25em] cursor-pointer transition-all ${
              isLogin
                ? "bg-primary/15 text-primary border border-primary/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                : "text-muted hover:text-foreground border border-transparent"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            onClick={() => switchMode("signup")}
            className={`auth-mode-btn rounded-sm py-2 text-[10px] uppercase tracking-[0.25em] cursor-pointer transition-all ${
              !isLogin
                ? "bg-secondary/15 text-secondary border border-secondary/40 shadow-[0_0_12px_rgba(255,43,214,0.2)]"
                : "text-muted hover:text-foreground border border-transparent"
            }`}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="flex flex-col gap-5"
        >
          {!isLogin && (
            <Field
              id="name"
              label="handle"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, confirm: "" }));
              }}
              placeholder="n3on_rider"
            />
          )}

          <Field
            id="email"
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@grid.net"
          />

          <Field
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            placeholder="••••••••"
          />

          {!isLogin && (
            <Field
              id="confirm-password"
              label="confirm password"
              type="password"
              value={confirm}
              inputRef={confirmRef}
              onChange={(e) => {
                setConfirm(e.target.value);
                setErrors((prev) => ({ ...prev, confirm: "" }));
              }}
              error={errors.confirm}
              placeholder="••••••••"
            />
          )}

          {errors.form && (
            <p
              role="alert"
              aria-live="polite"
              className="auth-error text-xs text-red-400 tracking-widest px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/5"
            >
              {"// "}
              {errors.form}
            </p>
          )}

          <Button
            type="submit"
            variant={isLogin ? "primary" : "secondary"}
            className="mt-1 w-full"
            disabled={submitting}
          >
            {submitting
              ? "// syncing..."
              : isLogin
                ? "Jack in"
                : "Create account"}
          </Button>
        </form>

        <Link
          href="/"
          className="block text-center text-xs text-muted hover:text-primary mt-8 cursor-pointer transition-colors"
        >
          ← back to home
        </Link>
      </div>
    </div>
  );
}
