import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

function Modal({ title, message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 font-mono">
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

export default function CreateLanguage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 text-green-500 font-mono">
      <Link
        to="/"
        className="flex items-center gap-2 mb-6 opacity-70 hover:opacity-100"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
      <div className="border border-green-500">
        <div className="p-4 border-b border-green-500 bg-green-500 bg-opacity-10">
          <h2 className="text-xl font-bold">&gt; CREATE NEW LANGUAGE</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs opacity-70 mb-1">NAME</label>
            <input
              type="text"
              placeholder="e.g., Python"
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">CREATOR</label>
            <input
              type="text"
              placeholder="e.g., Guido van Rossum"
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">YEAR</label>
            <input
              type="number"
              placeholder="e.g., 1991"
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">PARADIGM</label>
            <input
              type="text"
              placeholder="e.g., Object-oriented, Imperative"
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">
              SYNTAX (HELLO, WORLD!)
            </label>
            <textarea
              placeholder='e.g., print("Hello, World!")'
              rows={5}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">PURPOSE</label>
            <textarea
              placeholder="Describe the main purpose of the language..."
              rows={3}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">HISTORY</label>
            <textarea
              placeholder="Briefly describe its history..."
              rows={5}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs opacity-70 mb-1">
              FACTS (ONE PER LINE)
            </label>
            <textarea
              placeholder="e.g., Named after Monty Python"
              rows={4}
              className="w-full bg-black border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleCreate}
            className="w-full p-2 border border-green-500 bg-green-500 text-black font-bold hover:bg-green-600 transition-all"
          >
            CREATE
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title="System Alert"
          message="Create functionality not yet implemented."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
