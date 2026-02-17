import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";

const FunFact = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
      const data = await res.json();
      setFact(data.text);
    } catch {
      setFact("Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFact(); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="card-brutalist bg-background p-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 border border-foreground shrink-0 mt-0.5">
            <Lightbulb className="h-4 w-4 text-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-display tracking-wider text-foreground uppercase">Did you know?</span>
              <button
                onClick={fetchFact}
                disabled={loading}
                className="ml-auto p-1 border border-foreground/30 hover:bg-foreground/10 transition-colors"
              >
                <RefreshCw className={`h-3 w-3 text-foreground/60 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={fact}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-foreground/60 leading-relaxed"
              >
                {loading ? "Loading..." : fact}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FunFact;
