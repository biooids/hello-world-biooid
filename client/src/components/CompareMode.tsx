import { X, Code2 } from "lucide-react";
import { Language } from "../data/languages";

interface CompareModeProps {
  languages: Language[];
  onClose: () => void;
}

export default function CompareMode({ languages, onClose }: CompareModeProps) {
  return (
    <div className="flex-1 bg-black overflow-y-auto">
      <div className="sticky top-0 bg-black border-b border-green-500 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Code2 className="text-green-500" size={24} />
          <h2 className="text-green-500 font-mono font-bold text-xl">
            &gt; COMPARE_MODE
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-green-500 hover:bg-green-500 hover:text-black p-2 border border-green-500 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <div key={lang.id} className="border border-green-500 bg-black">
              <div className="bg-green-500 bg-opacity-10 p-4 border-b border-green-500">
                <h3 className="text-green-500 font-mono font-bold text-lg">
                  &gt; {lang.name}
                </h3>
                <p className="text-green-500 font-mono text-xs opacity-70 mt-1">
                  {lang.creator && lang.year > 0
                    ? `${lang.creator} | ${lang.year}`
                    : "no metadata yet"}
                </p>
              </div>
              <div className="p-4">
                <pre className="text-green-500 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                  {lang.syntax}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {languages.length < 2 && (
          <div className="text-center text-green-500 font-mono text-sm opacity-70 mt-8">
            &gt; SELECT AT LEAST 2 LANGUAGES TO COMPARE
          </div>
        )}
      </div>
    </div>
  );
}
