"use client";

import type React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownRenderer from "@/components/markdown-renderer";

export type ApiTask = {
  name?: string;
  description?: string;
  summary?: string;
  raw?: string;
  [key: string]: string | undefined;
};

export type ApiInnerResult = {
  raw?: string;
  tasks_output?: ApiTask[];
  [key: string]: unknown; // allow extra unpredictable keys
};

export type ApiResultShape = {
  result?: ApiInnerResult;
};



function extractSections(result: ApiInnerResult ) {
    const tasks: ApiTask[] = Array.isArray(result?.tasks_output)
        ? result.tasks_output
        : [];
    // Heuristic: find known sections by task name
    const business = tasks.find((t) =>
        (t.name || "").toLowerCase().includes("business")
    );
    const mvp = tasks.find((t) => (t.name || "").toLowerCase().includes("mvp"));
    const gtm = tasks.find(
        (t) =>
            (t.name || "").toLowerCase().includes("gtm") ||
            (t.raw || "").toLowerCase().includes("go-to-market")
    );
    return { tasks, business, mvp, gtm };
}

export default function ResultsRenderer({ data }: { data: ApiResultShape }) {
    const result = data?.result ?? {};
    const rawRoot = typeof result?.raw === "string" ? result.raw : "";
    const { tasks, business, mvp, gtm } = extractSections(result);

    return (
        <Card className="rounded-none  border-none shadow-none p-0">
            <CardHeader className="px-0">
                <CardTitle className="text-3xl">Results</CardTitle>
                <CardDescription>
                    Explore the generated strategies and plans.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs
                    defaultValue={
                        tasks.length ? "overview" : rawRoot ? "raw" : "overview"
                    }
                    className="w-full"
                >
                    <TabsList className="flex rounded-md bg-secondary/50 gap-2 ">
                        <TabsTrigger value="overview" className="text-xs sm:text-sm md:text-lg ">Overview</TabsTrigger>
                        {business && (
                            <TabsTrigger value="business" className="text-xs sm:text-sm md:text-lg ">
                                Business Plan
                            </TabsTrigger>
                        )}
                        {mvp && <TabsTrigger value="mvp" className="text-xs sm:text-sm md:text-lg ">MVP Plan</TabsTrigger>}
                        {gtm && (
                            <TabsTrigger value="gtm" className="text-xs sm:text-sm md:text-lg ">Go-To-Market</TabsTrigger>
                        )}
                      
                    </TabsList>

                    <TabsContent value="overview" className="mt-5">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card > 
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Detected Sections
                                    </CardTitle>
                                    <CardDescription>
                                        From the API response
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>
                                            Business Plan:{" "}
                                            {business ? "Yes" : "No"}
                                        </li>
                                        <li>MVP Plan: {mvp ? "Yes" : "No"}</li>
                                        <li>
                                            Go-To-Market: {gtm ? "Yes" : "No"}
                                        </li>
                                        <li>
                                            Other Tasks:{" "}
                                            {Math.max(
                                                0,
                                                tasks.length -
                                                    [business, mvp, gtm].filter(
                                                        Boolean
                                                    ).length
                                            )}
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Quick Preview
                                    </CardTitle>
                                    <CardDescription>
                                        Top-level raw content (if present)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {rawRoot ? (
                                        <MarkdownRenderer
                                            content={stripCodeFences(rawRoot)}
                                            className="max-h-[480px] overflow-auto prose-lg leading-relaxed"
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No top-level markdown available.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {business && (
                        <TabsContent value="business" className="mt-5">
                            <SectionCard title="Business Plan">
                                <MarkdownRenderer
                                    content={stripCodeFences(
                                        business.raw || business.summary || ""
                                    )}
                                    className="prose-lg leading-relaxed"
                                />
                            </SectionCard>
                        </TabsContent>
                    )}

                    {mvp && (
                        <TabsContent value="mvp" className="mt-5">
                            <SectionCard title="MVP Plan">
                                <MarkdownRenderer
                                    content={stripCodeFences(
                                        mvp.raw || mvp.summary || ""
                                    )}
                                    className="prose-lg leading-relaxed"
                                />
                            </SectionCard>
                        </TabsContent>
                    )}

                    {gtm && (
                        <TabsContent value="gtm" className="mt-5">
                            <SectionCard title="Go-To-Market">
                                <MarkdownRenderer
                                    content={stripCodeFences(
                                        gtm.raw || gtm.summary || ""
                                    )}
                                    className="prose-lg leading-relaxed"
                                />
                            </SectionCard>
                        </TabsContent>
                    )}

                    

                    
                </Tabs>
            </CardContent>
        </Card>
    );
}

function SectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>Rendered from markdown</CardDescription>
            </CardHeader>
            <CardContent className="p-4">{children}</CardContent>
        </Card>
    );
}

function stripCodeFences(md: string) {
    // Many responses wrap markdown in triple backticks. Remove outermost fences if present.
    const fence = /^```[\s\S]*?\n([\s\S]*?)\n```$/m;
    const m = md.match(fence);
    return m ? m[1] : md;
}
