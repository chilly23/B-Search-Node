import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, Zap } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import FilterBar from "@/components/FilterBar";
import FunFact from "@/components/FunFact";
import SearchHistory from "@/components/SearchHistory";
import { searchWikipedia, type SearchResult } from "@/lib/wikipedia";

type SortOption = "relevance" | "date" | "wordcount";

const Index = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    setHistory((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 8));

    try {
      const data = await searchWikipedia(query);
      setResults(data);
      setSort("relevance");
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedResults = useMemo(() => {
    const copy = [...results];
    if (sort === "date") {
      copy.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    } else if (sort === "wordcount") {
      copy.sort((a, b) => (b.wordcount || 0) - (a.wordcount || 0));
    }
    return copy;
  }, [results, sort]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* top border line */}
      <div className="brutalist-line w-full" />

      {/* header bar */}
      <motion.div
        className="flex items-center justify-between px-6 py-4 border-b-2 border-foreground"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-mono text-xs text-foreground/60">20</span>
        <h1 className="font-display text-2xl tracking-wider text-foreground">B-SEARCH NODE</h1>
        <span className="font-mono text-xs text-foreground/60">25</span>
      </motion.div>

      {/* content */}
      <div className="relative z-10">
        {/* hero */}
        <div className={`flex flex-col items-center justify-center px-4 transition-all duration-700 ease-out ${hasSearched ? "pt-6 pb-4" : "pt-[16vh] pb-10"}`}>
          
          {!hasSearched && (
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-6xl sm:text-8xl tracking-tight text-foreground leading-none">
  B SEARCH NODE
</h2>
              <p className="font-mono text-xs text-foreground/50 mt-2 tracking-widest uppercase">
                Est. 2025 — Powered by Wikipedia
              </p>
            </motion.div>
          )}

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <SearchHistory history={history} onSelect={handleSearch} onClear={() => setHistory([])} />
        </div>

        {/* services-style label row when idle */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 mt-2 mb-8"
          >
            {["Science", "History", "Technology", "Philosophy", "Nature", "Space", "Culture", "Math"].map((tag, i) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag.toLowerCase())}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group"
              >
                <span className="font-mono text-[10px] text-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="group-hover:underline underline-offset-4 decoration-2">{tag}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* content area */}
        <div className="max-w-2xl mx-auto px-4 pb-16">
          {/* loading */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-16"
            >
              <div className="h-10 w-10 border-3 border-foreground border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono text-foreground/60">
                Searching<span className="cursor-blink">|</span>
              </p>
            </motion.div>
          )}

          {/* error */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-4 border-2 border-foreground bg-destructive/20 text-foreground"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* results */}
          {!isLoading && !error && results.length > 0 && (
            <>
              <div className="mb-4">
                <FilterBar sort={sort} onSortChange={setSort} resultCount={results.length} />
              </div>
              <div className="flex flex-col gap-3">
                <AnimatePresence mode="wait">
                  {sortedResults.map((r, i) => (
                    <ResultCard key={r.pageid} result={r} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* empty state */}
          {!isLoading && !error && hasSearched && results.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-foreground/50 py-16 font-mono"
            >
              No results found. Try a different search term.
            </motion.p>
          )}

          {/* fun fact when idle */}
          {!hasSearched && <FunFact />}
        </div>

        {/* footer */}
        <div className="border-t-2 border-foreground">
          <div className="flex flex-col items-center gap-1 px-6 py-4">
  <div className="flex items-center justify-between w-full">
    <span className="font-mono text-xs text-foreground/40">20</span>
    <div className="flex items-center gap-1.5 text-[11px] text-foreground/40 font-mono">
      <Zap className="h-3 w-3" />
      react + wikipedia api
    </div>
    <span className="font-mono text-xs text-foreground/40">25</span>
  </div>
  <p className="font-mono text-[10px] text-foreground/30">
    © Velan E · velane929@gmail.com · December 2025
  </p>
</div>
          <div className="brutalist-line w-full" />
        </div>
      </div>
    </div>
  );
};

export default Index;
