import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
        Page Not Found
      </h2>
      
      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="btn-primary px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2"
      >
        Return Home
      </Link>
    </div>
  );
}
