import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ResponseBox() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d69c64fa-d3fd-49b5-b97a-6e495f20c942",
          subject: "Project Anmona: New Message from Priyo",
          message: message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400 font-medium animate-fade-in shadow-lg">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
        <span>Message sent securely.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-medium">
        <span className="h-px flex-1 bg-border" />
        Reply
        <span className="h-px flex-1 bg-border" />
      </div>
      
      <div className="relative">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message or reply..."
          className="w-full resize-none rounded-2xl border border-border bg-input/40 p-4 text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:bg-input/60 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition duration-300 shadow-inner"
          disabled={loading}
          required
        />
      </div>
      
      {error && (
        <div className="text-xs text-destructive font-medium px-1">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="w-full rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-semibold py-3 px-4 transition-all duration-300 active:scale-98 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(244,114,182,0.15)] hover:shadow-[0_4px_24px_rgba(244,114,182,0.25)]"
      >
        <Send className="h-4 w-4" />
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
