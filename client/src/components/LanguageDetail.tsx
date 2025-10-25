import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Layers,
  Target,
  Lightbulb,
  Copy,
  Check,
  Star,
  Edit,
} from "lucide-react";
import { Language } from "../data/languages";

interface LanguageDetailProps {
  languages: Language[];
}

export default function LanguageDetail({ languages }: LanguageDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const language = languages.find((lang) => lang.id === id);

  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!language) return false;
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites).includes(language.id) : false;
  });

  if (!language) {
    return (
      <div className="p-8 text-center text-red-500 font-mono">
        &gt; ERROR: Language with ID "{id}" not found.{" "}
        <Link to="/" className="underline">
          Go Home
        </Link>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(language.syntax);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleFavorite = () => {
    const favorites = localStorage.getItem("favorites");
    let favArray: string[] = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      favArray = favArray.filter((favId) => favId !== language.id);
    } else {
      favArray.push(language.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favArray));
    setIsFavorite(!isFavorite);
  };

  const renderField = (value: string | number, placeholder: string) => {
    return value && value.toString().length > 0 && value !== 0 ? (
      <span className="font-bold">{value}</span>
    ) : (
      <span className="font-bold opacity-50">{placeholder}</span>
    );
  };

  return (
    <div className="flex-1 bg-black overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="mb-8 border border-green-500 p-6 bg-black">
          <div className="flex items-start justify-between mb-4 gap-4">
            <h1 className="text-green-500 text-3xl sm:text-4xl font-mono font-bold">
              &gt; {language.name}
            </h1>
            <div className="flex-shrink-0 flex items-center gap-2">
              <button
                onClick={() => navigate(`/edit/${language.id}`)}
                className="p-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all"
                aria-label="Edit language"
              >
                <Edit size={24} />
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-3 border transition-all ${
                  isFavorite
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-black text-green-500 border-green-500 hover:bg-green-500 hover:text-black"
                }`}
                aria-label="Toggle favorite"
              >
                <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-500 font-mono text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="opacity-70">CREATOR:</span>
              {renderField(language.creator, "no data yet")}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="opacity-70">YEAR:</span>
              {renderField(language.year, "no data yet")}
            </div>
            <div className="flex items-center gap-2 col-span-1 md:col-span-2">
              <Layers size={16} />
              <span className="opacity-70">PARADIGM:</span>
              {renderField(language.paradigm, "no data yet")}
            </div>
          </div>
        </div>

        <div className="mb-8 border border-green-500 bg-black">
          <div className="border-b border-green-500 p-3 bg-green-500 bg-opacity-10 flex items-center justify-between">
            <h2 className="text-green-500 font-mono font-bold flex items-center gap-2">
              &gt; SYNTAX_OUTPUT
            </h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-mono text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  COPIED
                </>
              ) : (
                <>
                  <Copy size={14} />
                  COPY
                </>
              )}
            </button>
          </div>
          <div className="p-4">
            <pre className="text-green-500 font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
              {language.syntax}
            </pre>
          </div>
        </div>

        <div className="mb-8 border border-green-500 bg-black">
          <div className="border-b border-green-500 p-3 bg-green-500 bg-opacity-10">
            <h2 className="text-green-500 font-mono font-bold flex items-center gap-2">
              <Target size={18} />
              PURPOSE
            </h2>
          </div>
          <div className="p-4">
            <p className="text-green-500 font-mono text-sm leading-relaxed">
              {language.purpose || "no data yet"}
            </p>
          </div>
        </div>

        <div className="mb-8 border border-green-500 bg-black">
          <div className="border-b border-green-500 p-3 bg-green-500 bg-opacity-10">
            <h2 className="text-green-500 font-mono font-bold flex items-center gap-2">
              <Lightbulb size={18} />
              HISTORY
            </h2>
          </div>
          <div className="p-4">
            <p className="text-green-500 font-mono text-sm leading-relaxed">
              {language.history || "no data yet"}
            </p>
          </div>
        </div>

        <div className="border border-green-500 bg-black">
          <div className="border-b border-green-500 p-3 bg-green-500 bg-opacity-10">
            <h2 className="text-green-500 font-mono font-bold">
              &gt; INTERESTING_FACTS
            </h2>
          </div>
          <div className="p-4">
            {language.facts && language.facts.length > 0 ? (
              <ul className="space-y-2">
                {language.facts.map((fact, index) => (
                  <li
                    key={index}
                    className="text-green-500 font-mono text-sm flex gap-2"
                  >
                    <span className="opacity-70">[{index + 1}]</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-500 font-mono text-sm opacity-50">
                no data yet
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 border border-green-500 bg-green-500 bg-opacity-5 text-center">
          <p className="text-green-500 font-mono text-xs opacity-70">
            &gt; END_OF_FILE | {language.name.toUpperCase()}_LOADED_SUCCESSFULLY
          </p>
        </div>
      </div>
    </div>
  );
}
