"use client";

import Link from "next/link";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

function userHandle(user) {
  return user?.name || user?.username || user?.handle || user?.email;
}

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="site-header flex items-center justify-between px-6 sm:px-10 py-5 border-b border-panel-border bg-panel/40 backdrop-blur-sm sticky top-0 z-20">
      <Link
        href="/"
        className="glitch neon-text text-primary text-xl font-bold tracking-[0.3em] hover:text-primary-strong transition-colors"
      >
        DEVFORGE
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4">
        {loading ? (
          <span className="text-[10px] uppercase tracking-widest text-muted animate-pulse">
            {"// scanning..."}
          </span>
        ) : user ? (
          <>
            <Link
              href="/vault"
              className="hidden sm:inline text-[10px] uppercase tracking-widest text-muted hover:text-primary transition-colors"
            >
              vault
            </Link>
            <span className="flex items-center gap-2 text-xs">
              <span className="pulse-dot w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="text-primary font-bold">@{userHandle(user)}</span>
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <Button href="/auth" variant="outline" size="sm">
            &gt; access_terminal
          </Button>
        )}
      </nav>
    </header>
  );
}
