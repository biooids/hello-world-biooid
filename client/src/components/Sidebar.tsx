import { useState, useMemo, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Code2,
  Search,
  Home,
  Star,
  PlusSquare,
  GitCompare,
  CheckSquare,
  Square,
  X,
} from "lucide-react";
import { Language } from "../data/languages";

interface SidebarProps {
  languages: Language[];
  compareMode: boolean;
  onToggleCompareMode: () => void;
  selectedForCompare: string[];
  onToggleCompare: (id: string) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export default function Sidebar({
  languages,
  compareMode,
  onToggleCompareMode,
  selectedForCompare,
  onToggleCompare,
  isMobileMenuOpen,
  onCloseMobileMenu,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };
    loadFavorites();
    window.addEventListener("storage", loadFavorites);
    const interval = setInterval(loadFavorites, 500);
    return () => {
      window.removeEventListener("storage", loadFavorites);
      clearInterval(interval);
    };
  }, []);

  const filteredLanguages = useMemo(() => {
    let filtered = languages.filter((lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (showFavoritesOnly) {
      filtered = filtered.filter((lang) => favorites.includes(lang.id));
    }
    return filtered;
  }, [languages, searchQuery, showFavoritesOnly, favorites]);

  const activeLinkStyle = {
    backgroundColor: "#22c55e",
    color: "black",
    borderColor: "#22c55e",
  };

  return (
    <div
      className={`bg-black border-r border-green-500 h-screen flex flex-col flex-shrink-0 fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-green-500 bg-black">
        {/* Header with Mobile-Only Close Button */}
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={onCloseMobileMenu}
          >
            <Code2 className="text-green-500" size={24} />
            <h1 className="text-green-500 text-xl font-mono font-bold">
              HELLO WORLD
            </h1>
          </Link>
          <button
            onClick={onCloseMobileMenu}
            className="p-1 text-green-500 md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={onToggleCompareMode}
            className={`flex-1 p-2 border transition-all font-mono text-sm flex items-center justify-center gap-2 ${
              compareMode
                ? "bg-green-500 text-black border-green-500"
                : "bg-black text-green-500 border-green-500 hover:bg-green-500 hover:text-black"
            }`}
          >
            <GitCompare size={16} /> COMPARE
          </button>
          <Link
            to="/create"
            onClick={onCloseMobileMenu}
            className="flex-1 p-2 border border-green-500 bg-black text-green-500 hover:bg-green-500 hover:text-black transition-all font-mono text-sm flex items-center justify-center gap-2"
          >
            <PlusSquare size={16} /> CREATE
          </Link>
        </div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`w-full mb-3 p-2 border transition-all font-mono text-sm flex items-center justify-center gap-2 ${
            showFavoritesOnly
              ? "bg-green-500 text-black border-green-500"
              : "bg-black text-green-500 border-green-500 hover:bg-green-500 hover:text-black"
          }`}
        >
          <Star size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
          {showFavoritesOnly ? "SHOW ALL" : "FAVORITES"}
        </button>

        <Link
          to="/"
          onClick={onCloseMobileMenu}
          className="w-full mb-3 p-2 border border-green-500 bg-black text-green-500 hover:bg-green-500 hover:text-black transition-all font-mono text-sm flex items-center justify-center gap-2"
        >
          <Home size={16} />
          HOME
        </Link>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
            size={16}
          />
          <input
            type="text"
            placeholder="SEARCH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-green-500 text-green-500 placeholder-green-500 placeholder-opacity-50 px-3 py-2 pl-10 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-green-500 text-xs font-mono opacity-70">
            &gt; {filteredLanguages.length} LANGUAGES
          </p>
          {compareMode && (
            <p className="text-green-500 text-xs font-mono opacity-70">
              {selectedForCompare.length} SELECTED
            </p>
          )}
        </div>
      </div>

      <div className="p-2 overflow-y-auto flex-1">
        {filteredLanguages.map((lang) => {
          if (compareMode) {
            const isSelected = selectedForCompare.includes(lang.id);
            return (
              <button
                key={lang.id}
                onClick={() => onToggleCompare(lang.id)}
                className={`w-full text-left p-3 mb-1 font-mono transition-all border flex items-center gap-3 ${
                  isSelected
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-black text-green-500 border-green-500 hover:bg-green-500 hover:bg-opacity-10"
                }`}
              >
                {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                <div className="flex-1">
                  <div className="font-bold text-sm">&gt; {lang.name}</div>
                </div>
              </button>
            );
          }
          return (
            <NavLink
              key={lang.id}
              to={`/language/${lang.id}`}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={onCloseMobileMenu}
              className="block w-full text-left p-3 mb-1 font-mono transition-all border bg-black text-green-500 border-green-500 hover:bg-green-500 hover:bg-opacity-10"
            >
              <div className="font-bold text-sm mb-1 flex items-center justify-between">
                <span>&gt; {lang.name}</span>
                {favorites.includes(lang.id) && (
                  <Star size={12} fill="currentColor" />
                )}
              </div>
              <div className="text-xs opacity-70">
                {lang.creator && lang.year > 0
                  ? `${lang.creator} | ${lang.year}`
                  : "no metadata yet"}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
