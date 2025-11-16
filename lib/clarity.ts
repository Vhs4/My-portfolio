"use client";

import { clarity } from "react-microsoft-clarity";

export function initClarity() {
    if (typeof window === "undefined") return;
    if (clarity.hasStarted()) return;

    clarity.init("u5kswen59t");
}
