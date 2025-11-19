import { Lock } from "lucide-react"

export default function LoginImageSection() {
    return (
        <div className="bg-muted relative hidden md:flex items-center justify-center">
            {/* Background gradient lembut */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 dark:from-slate-900 dark:to-slate-800" />

            {/* Ikon gembok di tengah */}
            <div className="relative flex flex-col items-center justify-center text-center">
                <div className="bg-background/80 dark:bg-slate-800/60 p-8 rounded-full shadow-lg border border-border">
                    <Lock className="h-20 w-20 text-muted-foreground" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                    Aman & Terlindungi
                </h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                    Data Anda dijaga dengan sistem keamanan berlapis.
                </p>
            </div>
        </div>
    )
}
