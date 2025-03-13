"use client";

import { FirebaseDebug } from "@/components/auth/firebase-debug";

export default function FirebaseDebugPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Depuración de Firebase</h1>
      <FirebaseDebug />
    </div>
  );
} 