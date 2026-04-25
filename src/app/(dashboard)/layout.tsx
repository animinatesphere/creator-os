"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { OnboardingTour } from "@/components/features/OnboardingTour";

/**
 * Dashboard Route Group Layout
 * Children are each responsible for wrapping themselves in <DashboardShell>
 * so they can pass their own title and actions props.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !user.isSubscribed) {
      router.push("/billing");
    } else {
      setIsReady(true);
    }
  }, [isAuthenticated, user, router]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#060608]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <OnboardingTour />
      {children}
    </>
  );
}
