"use client";

import React, { useState } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";

import { useMemo } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResultsRenderer, {
    type ApiResultShape,
} from "@/components/results-renderer";

type FormState = {
    startup_idea: string;
    target_market: string;
    team_composition: string;
};

const DEFAULTS: FormState = {
    startup_idea: "",
    target_market: "",
    team_composition: "",
};

export default function GTMStrategyPage() {
    const [form, setForm] = useState<FormState>(DEFAULTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ApiResultShape | null>(null);

    const disabled = useMemo(() => {
        return (
            !form.startup_idea.trim() ||
            !form.target_market.trim() ||
            !form.team_composition.trim()
        );
    }, [form]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch(
                "https://enterpreneaur-977121587860.asia-south2.run.app/run-crew",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        startup_idea: form.startup_idea,
                        target_market: form.target_market,
                        team_composition: form.team_composition,
                    }),
                }
            );

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(
                    `Request failed (${res.status}). ${
                        text || "Please try again."
                    }`
                );
            }

            const data = await res.json();
            const normalized: ApiResultShape = {
                result: data?.result ?? data ?? null,
            };
            setResult(normalized);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="max-w-5xl mx-auto p-2 mt-10 space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
                    Generate Your <AuroraText>Go-To-Market</AuroraText> Strategy
                </h1>
                <p className="text-gray-600 ">
                    Empower your startup with a tailored GTM plan in minutes.
                    Just provide a few details about your idea, target audience,
                    and team.
                </p>

                <div className="grid gap-6">
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle className="text-xl">Search</CardTitle>
                            <CardDescription>
                                Enter your startup details and run the analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                                aria-label="Startup search form"
                            >
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="idea"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Startup idea
                                    </label>
                                    <Input
                                        id="idea"
                                        placeholder="e.g., AI-powered resume enhancer that tailors resumes to job descriptions"
                                        value={form.startup_idea}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                startup_idea: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="market"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Target market
                                    </label>
                                    <Input
                                        id="market"
                                        placeholder="e.g., Recent graduates and job seekers in tech"
                                        value={form.target_market}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                target_market: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="team"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Team composition
                                    </label>
                                    <Input
                                        id="team"
                                        placeholder="e.g., 3 software engineers and 1 career coach"
                                        value={form.team_composition}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                team_composition:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="submit"
                                        disabled={disabled || loading}
                                        className={loading ? "opacity-80" : ""}
                                    >
                                        {loading ? "Running..." : "Run search"}
                                    </Button>

                                    {error && (
                                        <span
                                            role="status"
                                            aria-live="polite"
                                            className="text-sm text-red-600"
                                        >
                                            {error}
                                        </span>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <section className="mt-10">
                    {!result ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>No results yet</CardTitle>
                                <CardDescription>
                                    Run a search to see results here.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : (
                        <ResultsRenderer data={result} />
                    )}
                </section>
            </div>
        </div>
    );
}
