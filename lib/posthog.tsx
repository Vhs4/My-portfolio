"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

export default function PostHogClient() {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
        if (!key || process.env.NODE_ENV !== "production") return
        if (posthog.__loaded) return

        // ui_host deriva da região do projeto (ex.: https://us.i.posthog.com -> https://us.posthog.com)
        const uiHost = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(".i.posthog.com", ".posthog.com")

        posthog.init(key, {
            // Proxy primeira-parte: requisições saem de vhs4.dev/ingest e não caem em blocklists.
            // NUNCA troque api_host pelo NEXT_PUBLIC_POSTHOG_HOST — isso desativaria o anti-bloqueio.
            api_host: "/ingest",
            ui_host: uiHost,
            defaults: "2025-05-24",
            session_recording: {
                maskAllInputs: true,
            },
        })
    }, [])

    return null
}
