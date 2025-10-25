import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Language } from "../data/languages";
import { ArrowLeft } from "lucide-react";

// --- Custom Modal Component ---
// We define this right inside the file for simplicity.
interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

function Modal({ title, message, onClose }: ModalProps) {
  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 font-mono">
      {/* Modal Box */}
      <div className="border border-green-500 bg-black p-6 shadow-lg max-w-sm w-full mx-4">
        <h3 className="text-xl font-bold text-green-500 mb-4">&gt; {title}</h3>
        <p className="text-green-500 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full p-2 border border-green-500 bg-green-500 text-black font-bold hover:bg-green-600 transition-all"
        >
          OK
        </button>
      </div>
    </div>
  );
}

// --- Edit Language Page Component ---

interface EditLanguageProps {
  languages: Language[];
}

export default function EditLanguage({ languages }: EditLanguageProps) {
  const { id } = useParams();
  const language = languages.find((lang) => lang.id === id);

  // State to control the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!language) {
    return (
      <div className="p-8 text-center text-red-500 font-mono">
        &gt; ERROR: Language with ID "{id}" not found.
      </div>
    );
  }

  // This function now opens the modal instead of alerting
  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 text-green-500 font-mono">
      <Link
        to={`/language/${id}`}
        className="flex items-center gap-2 mb-6 opacity-70 hover:opacity-100"
      >
        <ArrowLeft size={16} />
        Back to {language.name}
      </Link>
      <div className="border border-green-500">
        <div className="p-4 border-b border-green-500 bg-green-500 bg-opacity-10">
          <h2 className="text-xl font-bold">&gt; EDITING: {language.name}</h2>
        </div>
        <div className="p-6 space-y-4">
          {/* --- All Metadata Fields --- */}

          <div>
            <label className="block text-xs opacity-70 mb-1">NAME</label>
            <input
              type="text"
              defaultValue={language.name}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">CREATOR</label>
            <input
              type="text"
              defaultValue={language.creator}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">YEAR</label>
            <input
              type="number"
              defaultValue={language.year}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">PARADIGM</label>
            <input
              type="text"
              defaultValue={language.paradigm}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">
              SYNTAX (HELLO, WORLD!)
            </label>
            <textarea
              defaultValue={language.syntax}
              rows={5}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">PURPOSE</label>
            <textarea
              defaultValue={language.purpose}
              rows={3}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">HISTORY</label>
            <textarea
              defaultValue={language.history}
              rows={5}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">
              FACTS (ONE PER LINE)
            </label>
            <textarea
              defaultValue={language.facts.join("\n")}
              rows={4}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* --- Update Button --- */}
          <button
            onClick={handleUpdate}
            className="w-full p-2 border border-green-500 bg-green-500 text-black font-bold hover:bg-green-600 transition-all"
          >
            UPDATE
          </button>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <Modal
          title="System Alert"
          message="Update functionality not yet implemented."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
