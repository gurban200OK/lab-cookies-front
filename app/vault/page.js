"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

function userHandle(user) {
  return user?.name || user?.username || user?.handle || user?.email;
}

export default function VaultPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4">
          <p className="text-muted text-xs tracking-[0.3em] uppercase animate-pulse">
            {"// verifying credentials..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 text-foreground">
      <Navbar />

      <section className="scanlines flex flex-1 items-center justify-center px-6 py-20">
        <div className="vault-panel w-full max-w-2xl neon-border bg-panel rounded-xl p-8 sm:p-12 text-center">
          <p className="text-secondary text-xs uppercase tracking-[0.4em] mb-4">
            {"// restricted_sector"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary neon-text mb-4">
            Welcome, @{userHandle(user)}
          </h1>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            You cleared the gate. This vault is only visible to authenticated
            grid members — your session cookie checked out with the backend.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="outline" size="sm">
              ← home
            </Button>
            <Link
              href="/auth"
              className="text-xs text-muted hover:text-primary tracking-widest transition-colors"
            >
              {"// switch account"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
