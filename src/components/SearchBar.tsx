import { useState, useEffect, useRef } from "react";
import { Search, Command } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

const placeholders = [
  "artificial intelligence",
  "black holes",
  "climate change",
  "quantum computing",
  "roman empire",
  "deep ocean creatures",
  "space exploration",
];

const SearchBar = ({ onSearch, isLoading }: Props) => {
  const [value, setValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) return;

    const target = placeholders[phIndex];
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        setPlaceholderText(target.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex >= target.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
        timeout = setTimeout(tick, 60 + Math.random() * 40);
      } else {
        setPlaceholderText(target.slice(0, charIndex));
        charIndex--;
        if (charIndex < 0) {
          setPhIndex((prev) => (prev + 1) % placeholders.length);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    };

    tick();
    return () => clearTimeout(timeout);
  }, [phIndex, value]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <motion.div
        className="relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative flex items-center bg-background border-2 border-foreground">
          <Search className="ml-4 h-5 w-5 text-foreground/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={value ? "" : `Search "${placeholderText}"`}
            className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-foreground/30 outline-none text-base font-mono"
          />
          
          {!value && (
            <div className="hidden sm:flex items-center gap-1 mr-3 text-foreground/40">
              <kbd className="px-1.5 py-0.5 border border-foreground/30 text-[10px] font-mono flex items-center gap-0.5">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="mr-2 px-5 py-2 bg-primary text-primary-foreground font-display text-lg tracking-wider hover:bg-foreground/80 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "GO"}
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default SearchBar;
