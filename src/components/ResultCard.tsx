import { ExternalLink, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchResult } from "@/lib/wikipedia";

type Props = {
  result: SearchResult;
  index: number;
};

const ResultCard = ({ result, index }: Props) => {
  const wikiUrl = `https://en.wikipedia.org/?curid=${result.pageid}`;
  const cleanSnippet = result.snippet.replace(/<[^>]*>/g, "");

  return (
    <motion.a
      href={wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="block group"
    >
      <div className="card-brutalist bg-background p-5">
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-foreground/30 mt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground group-hover:underline underline-offset-4 decoration-2 leading-snug uppercase tracking-wide">
              {result.title}
            </h3>
            <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed line-clamp-2">
              {cleanSnippet}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-foreground/40 font-mono">
              {result.wordcount && (
                <span className="flex items-center gap-1 px-2 py-0.5 border border-foreground/20">
                  <BookOpen className="h-3 w-3" />
                  {result.wordcount.toLocaleString()}
                </span>
              )}
              {result.timestamp && (
                <span className="flex items-center gap-1 px-2 py-0.5 border border-foreground/20">
                  <Clock className="h-3 w-3" />
                  {new Date(result.timestamp).toLocaleDateString()}
                </span>
              )}
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ResultCard;
