"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import ExcalidrawWrapper from "@/components/ExcalidrawWrapper";
import AppSettings from "@/components/AppSettings";

export default function Home() {
  return (
    <main className="flex">
      <AppSettings />
      <ExcalidrawWrapper />
    </main>
  );
}
