import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LanguageDetail from "./components/LanguageDetail";
import Welcome from "./components/Welcome";
import EditLanguage from "./pages/EditLanguage";
import CreateLanguage from "./pages/CreateLanguage";
import CompareMode from "./components/CompareMode";
import { languages } from "./data/languages";
import { Menu, Code2 } from "lucide-react"; // Import Menu and Code2

/**
 * A new header component that only appears on small screens.
 */
function MobileHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="md:hidden p-4 flex items-center justify-between border-b border-green-500 bg-black">
      <Link to="/" className="flex items-center gap-2">
        <Code2 className="text-green-500" size={24} />
        <h1 className="text-green-500 text-xl font-mono font-bold">
          HELLO WORLD
        </h1>
      </Link>
      <button
        onClick={onOpenMenu}
        className="p-2 text-green-500"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}

// The Layout now handles showing either the current page OR the Compare Mode
function AppLayout() {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(id) ? prev.filter((langId) => langId !== id) : [...prev, id]
    );
  };

  const compareLanguages = languages.filter((lang) =>
    selectedForCompare.includes(lang.id)
  );

  return (
    <div className="min-h-screen bg-black flex md:flex-row flex-col">
      <Sidebar
        languages={languages}
        compareMode={compareMode}
        onToggleCompareMode={() => setCompareMode(!compareMode)}
        selectedForCompare={selectedForCompare}
        onToggleCompare={handleToggleCompare}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)} // Pass close function
      />

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <MobileHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          {compareMode ? (
            <CompareMode
              languages={compareLanguages}
              onClose={() => setCompareMode(false)}
            />
          ) : (
            <Outlet /> // This is where the routed page (Welcome, Detail, etc.) will render
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Welcome languages={languages} />} />
        <Route
          path="language/:id"
          element={<LanguageDetail languages={languages} />}
        />
        <Route
          path="edit/:id"
          element={<EditLanguage languages={languages} />}
        />
        <Route path="create" element={<CreateLanguage />} />
      </Route>
    </Routes>
  );
}

export default App;
