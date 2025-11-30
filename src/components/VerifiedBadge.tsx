import { ShieldCheck } from "lucide-react";

interface VerifiedBadgeProps {
    source?: string;
    url?: string;
    size?: "sm" | "md" | "lg";
}

export default function VerifiedBadge({ source = "MyFXBook", url, size = "md" }: VerifiedBadgeProps) {
    const sizes = {
        sm: { text: "text-[10px]", padding: "px-2 py-1", icon: 12 },
        md: { text: "text-xs", padding: "px-3 py-1.5", icon: 14 },
        lg: { text: "text-sm", padding: "px-4 py-2", icon: 16 }
    };

    const config = sizes[size];

    const badge = (
        <div
            className={`inline-flex items-center gap-1.5 bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/30 ${config.padding} ${config.text} font-bold uppercase tracking-wider cursor-pointer hover:bg-[var(--color-success)]/20 transition-all`}
            style={{ borderRadius: '4px' }}
        >
            <ShieldCheck size={config.icon} />
            <span>Verified by {source}</span>
        </div>
    );

    return url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
            {badge}
        </a>
    ) : badge;
}
