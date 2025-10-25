import { Terminal, Database, FileText } from "lucide-react";
import QuickStats from "./QuickStats";
import { Language } from "../data/languages";

interface WelcomeProps {
  languages: Language[];
}

export default function Welcome({ languages }: WelcomeProps) {
  return (
    <div className="flex-1 bg-black overflow-y-auto p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <QuickStats languages={languages} />

        <div className="border border-green-500 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-green-500">
              <h1 className="text-green-500 text-3xl sm:text-4xl font-mono font-bold mb-4">
                &gt; HELLO WORLD<span className="animate-pulse">_</span>
              </h1>
              <p className="text-green-500 font-mono text-sm opacity-70 mb-8">
                SYSTEM INITIALIZED | READY FOR INPUT
              </p>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Database
                    className="text-green-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-green-500 font-mono text-sm">
                    <span className="font-bold">
                      &gt; {languages.length} LANGUAGES INDEXED
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText
                    className="text-green-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-green-500 font-mono text-sm">
                    <span className="font-bold">
                      &gt; EXPLORE SYNTAX & METADATA
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Terminal
                    className="text-green-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <p className="text-green-500 font-mono text-sm">
                    <span className="font-bold">&gt; SELECT A LANGUAGE</span>{" "}
                    from the sidebar to begin
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex items-center justify-center bg-green-500 bg-opacity-5">
              <pre className="text-green-500 font-mono text-xs overflow-x-auto">
                {`  _____ _____ __    __    _____
 |  |  |   __|  |  |  |  |     |
 |     |   __|  |__|  |__|  |  |
 |__|__|_____|_____|_____|_____|

 _    _  ___  ____  __    ____
| |  | |/ _ \\|  _ \\|  |  |  _ \\
| |/\\| | | | | |_) |  |  | | | |
|  /\\  | |_| |  _ <|  |__| |_| |
|_/  |_|\\___/|_| \\_\\_____|____/`}
              </pre>
            </div>
          </div>
        </div>

        <p className="text-center text-green-500 font-mono  opacity-50 mt-8">
          &gt; created by a banned biooid
        </p>
      </div>
    </div>
  );
}
