"use client";

import { useState } from "react";

/**
 * Showreel: a YouTube video that only loads when clicked. Until then it is a
 * poster image with a play button, so no YouTube code or cookies load with
 * the page. Uses youtube-nocookie.com once playing.
 */
export default function Showreel({
    videoId,
    kicker,
    title,
    playLabel,
}: {
    videoId: string;
    kicker: string;
    title: string;
    playLabel: string;
}) {
    const [playing, setPlaying] = useState(false);

    return (
        <section aria-labelledby="showreel-title" className="mt-24 md:mt-32">
            <div className="mb-10 text-center md:mb-14">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{kicker}</p>
                <h2 id="showreel-title" className="display text-[clamp(2.5rem,7vw,5.5rem)]">
                    {title}
                </h2>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-line bg-black">
                {playing ? (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="group absolute inset-0 h-full w-full"
                        aria-label={`${playLabel}: ${title}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[#0c1424] shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}
