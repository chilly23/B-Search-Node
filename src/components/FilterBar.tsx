import { ArrowUpDown, Clock, BookOpen } from "lucide-react";

type SortOption = "relevance" | "date" | "wordcount";

type Props = {
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  resultCount: number;
};

const FilterBar = ({ sort, onSortChange, resultCount }: Props) => {
  const options: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: "relevance", label: "Relevant", icon: <ArrowUpDown className="h-3.5 w-3.5" /> },
    { value: "date", label: "Recent", icon: <Clock className="h-3.5 w-3.5" /> },
    { value: "wordcount", label: "Longest", icon: <BookOpen className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      <span className="text-sm font-mono text-foreground/50">
        {resultCount} results
      </span>
      <div className="flex gap-0 border border-foreground">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all border-r border-foreground last:border-r-0 ${
              sort === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-foreground/50 hover:text-foreground hover:bg-foreground/10"
            }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
