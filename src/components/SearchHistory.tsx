import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";

type Props = {
  history: string[];
  onSelect: (q: string) => void;
  onClear: () => void;
};

const SearchHistory = ({ history, onSelect, onClear }: Props) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 flex-wrap mt-4 max-w-2xl mx-auto"
    >
      <Clock className="h-3.5 w-3.5 text-foreground/40 shrink-0" />
      {history.slice(0, 5).map((q, i) => (
        <motion.button
          key={q}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(q)}
          className="px-3 py-1 text-xs font-mono border border-foreground/40 text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          {q}
        </motion.button>
      ))}
      <button onClick={onClear} className="p-1 border border-foreground/20 hover:bg-foreground/10 transition-colors ml-1">
        <X className="h-3 w-3 text-foreground/40" />
      </button>
    </motion.div>
  );
};

export default SearchHistory;
