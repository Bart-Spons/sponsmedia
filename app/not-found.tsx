// app/not-found.tsx
// Outside [locale] there is no layout with <html>/<body>, so this page renders its own.
import NotFoundView from "@/components/NotFoundView";

export default function NotFound() {
    return (
        <html lang="en">
            <body className="bg-night text-frost antialiased">
                <NotFoundView />
            </body>
        </html>
    );
}
