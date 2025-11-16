"use client";

import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

export default function ClarityClient() {
    useEffect(() => {
        if (typeof window !== "undefined" && !clarity.hasStarted()) {
            clarity.init("u5kswen59t");
        }
    }, []);

    return null;
}
