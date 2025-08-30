"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import VantaFog from "@/components/VantaFog";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import gtmIllustration from "../../public/images/2df63f_cf537ca0b8254df79a53dae712b84510~mv2.avif";
import { CardContent, CardHeader } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import profile from '../../public/images/profile.jpg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Marquee } from "@/components/magicui/marquee";



const reviews = [
    {
        name: "Arjun Malhotra",
        username: "@arjun_founder",
        body: "Entrepreneur Copilot helped me validate my startup idea and build a go-to-market plan in under an hour. Absolute game-changer for solo founders!"
    },
    {
        name: "Neha Gupta",
        username: "@neha_g",
        body: "The AI-driven customer segmentation was spot-on. We discovered niche audiences we had completely overlooked."
    },
    {
        name: "Vikram Rao",
        username: "@vikram_startup",
        body: "Instead of spending weeks on market research, I had actionable insights and channel strategies ready in a single session."
    },
    {
        name: "Sofia Khan",
        username: "@sofia_k",
        body: "We pivoted our product positioning based on the competitive analysis from Entrepreneur Copilot — and saw our conversions double."
    },
    {
        name: "Karan Patel",
        username: "@karanp_growth",
        body: "The outreach and content suggestions saved our team days of brainstorming. It felt like having a full-time GTM strategist in-house."
    },
    {
        name: "Emily Chen",
        username: "@emily_builds",
        body: "As a first-time founder, I had no idea where to start. Copilot walked me through every step and gave me the confidence to launch."
    }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    name,
    username,
    body,
}: {
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={profile}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

const steps = [
    {
        title: "Step 1: Describe Your Startup Idea",
        description:
            "Begin by sharing your business concept, target market, and current stage. The Copilot uses this to tailor a GTM strategy specifically for you."
    },
    {
        title: "Step 2: Analyze Market & Competition",
        description:
            "The AI scans real-time market data, trends, and competitors to reveal gaps, opportunities, and positioning angles."
    },
    {
        title: "Step 3: Define Ideal Customer Profiles",
        description:
            "Get precise audience segments based on demographics, behavior, and buying patterns — so your targeting is laser-focused."
    },
    {
        title: "Step 4: Identify Core Value Proposition",
        description:
            "Clarify your unique selling points and messaging that will resonate most with your chosen audience."
    },
    {
        title: "Step 5: Build Your Acquisition Plan",
        description:
            "Receive actionable recommendations for channels, partnerships, and campaigns to drive awareness and conversions."
    },
    {
        title: "Step 6: Launch & Track Progress",
        description:
            "Execute your GTM strategy with built-in progress tracking, automated feedback, and continuous optimization suggestions."
    }
];


export default function Home() {
    const { theme } = useTheme();
    return (
        <main className="mx-auto">
            <VantaFog />
           <section className="mt-20 px-4 md:px-36 flex flex-col justify-center items-center text-center">
    <div className="group mb-5 relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
        <span
            className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
                WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
            }}
        />
        🚀
        <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
        <AnimatedGradientText className="text-sm font-medium">
            AI-Powered GTM Strategy Builder for Startup Founders
        </AnimatedGradientText>
        <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>

    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary mb-6">
        Launch Your Startup <AuroraText>Faster & Smarter</AuroraText>  
        with AI-Driven Go-To-Market Strategies
    </h1>

    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        Instantly generate, refine, and execute a robust GTM plan tailored to your business idea — from market analysis and ideal customer profiles to acquisition channels and growth initiatives.
    </p>

    <div className="">
        <Link href="/search">
            <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Build My GTM Plan
                </span>
            </ShimmerButton>
        </Link>
    </div>
</section>


            <section className="pt-20 lg:pt-32 pb-10 px-4 md:px-36 mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    How It Works
                    {/* <AuroraText>How It Works</AuroraText> */}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {steps.map((step, index) => (
                        <MagicCard
                            key={index}
                            gradientColor={
                                theme === "dark" ? "#262626" : "#D9D9D955"
                            }
                            className="rounded-xl px-5 py-4 bg-background shadow-md border border-border min-h-[180px] h-full"
                        >
                            <CardHeader className="p-0">
                                <h3 className="text-lg font-semibold text-primary">
                                    {step.title}
                                </h3>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground text-sm leading-snug">
                                    {step.description}
                                </p>
                            </CardContent>
                        </MagicCard>
                    ))}
                </div>
            </section>

          <section className="flex mt-10 flex-col md:flex-row items-center justify-between gap-5 px-4 md:px-36 py-12">
    {/* Text Section */}
    <div className="md:w-1/2 text-center md:text-left space-y-4 order-2 md:order-1">
        <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Build and Launch Your Go-To-Market Strategy — Powered by AI.
        </h2>
        <p className="text-lg text-muted-foreground">
            Entrepreneur Copilot helps you analyze your market, define your ideal customer, and create a step-by-step GTM plan — so you can launch faster, smarter, and with higher ROI.
        </p>
        <Link href="/search">
            <ShimmerButton className="shadow-2xl flex justify-center mx-auto md:mx-0">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Build My GTM Plan
                </span>
            </ShimmerButton>
        </Link>
    </div>

    {/* Image Section */}
    <div className="md:w-1/2 mt-10 md:mt-0 order-1 md:order-2 flex justify-center">
        <Image
            src={gtmIllustration} // Replace with your GTM strategy illustration path
            alt="AI-Powered Go-To-Market Strategy"
            className="w-full max-w-md h-96 object-cover"
            width={10}
            height={10}
            unoptimized
        />
    </div>
</section>


            <section className="mx-4 mt-20 md:mx-36">
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </div>
            </section>

            <section className="px-4 md:px-36 mt-20">
    <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
    >
        <h1 className="text-4xl font-bold">FAQ&apos;S</h1>

        <AccordionItem value="item-1">
            <AccordionTrigger>
                1. What is Entrepreneur Copilot?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Entrepreneur Copilot is an AI-powered platform that helps startup founders instantly create, refine, and execute robust go-to-market (GTM) strategies. It analyzes your idea, market, and target audience to deliver a personalized plan for launching and scaling successfully.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>
                2. How does it work?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Simply describe your startup idea and industry. The platform uses AI and real-time market data to recommend customer profiles, competitive positioning, acquisition strategies, and an actionable GTM roadmap tailored to your business.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>
                3. What kind of businesses can use it?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Entrepreneur Copilot works for solo founders, early-stage startups, accelerators, incubators, and even established businesses entering new markets or pivoting their GTM approach.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger>
                4. Does it use real market data?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Yes. The platform integrates real-time market insights, industry trends, and competitive data to ensure your GTM strategy reflects the most up-to-date opportunities and challenges.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
            <AccordionTrigger>
                5. Can it help with customer targeting?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Absolutely. Entrepreneur Copilot recommends detailed ideal customer profiles (ICPs) and segments based on demographics, behavior, and purchase patterns, so your outreach is focused and effective.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
            <AccordionTrigger>
                6. Does it suggest acquisition and growth strategies?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Yes. The platform generates channel recommendations, outreach ideas, content strategies, and growth initiatives, so you have a clear execution plan for acquiring and retaining customers.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
            <AccordionTrigger>
                7. Can it track my GTM progress?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Yes. You can track execution milestones, measure results, and receive AI-driven optimization tips to adapt your GTM strategy as you go.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
            <AccordionTrigger>
                8. Is Entrepreneur Copilot only for tech startups?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Not at all. It works for startups and businesses in any industry — from SaaS and e-commerce to manufacturing, services, and offline businesses — as long as you need a GTM plan.
                </p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
            <AccordionTrigger>
                9. Is there a free version?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Core features like idea analysis and basic GTM planning are free. Advanced features — such as detailed market reports, custom acquisition plans, and progress tracking — may require a paid subscription.
                </p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</section>

        </main>
    );
}
