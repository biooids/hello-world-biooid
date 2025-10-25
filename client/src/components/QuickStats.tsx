import { Calendar, TrendingUp, Layers } from "lucide-react";
import { Language } from "../data/languages";

interface QuickStatsProps {
  languages: Language[];
}

export default function QuickStats({ languages }: QuickStatsProps) {
  const languagesWithStats = languages.filter(
    (lang) => lang.year > 0 && lang.paradigm
  );

  if (languagesWithStats.length < 2) {
    return (
      <div className="border border-green-500 bg-black p-4 mb-8 text-center">
        <p className="text-green-500 font-mono text-sm opacity-70">
          &gt; Not enough metadata available to generate statistics.
        </p>
      </div>
    );
  }

  const oldestLanguage = languagesWithStats.reduce((oldest, lang) =>
    lang.year < oldest.year ? lang : oldest
  );
  const newestLanguage = languagesWithStats.reduce((newest, lang) =>
    lang.year > newest.year ? lang : newest
  );

  const paradigmCounts = languagesWithStats.reduce((acc, lang) => {
    const mainParadigm = lang.paradigm.split(":")[0].trim();
    acc[mainParadigm] = (acc[mainParadigm] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostCommonParadigm = Object.entries(paradigmCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const decadeCounts = languagesWithStats.reduce((acc, lang) => {
    const decade = Math.floor(lang.year / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const mostProductiveDecade = Object.entries(decadeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="border border-green-500 bg-black p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-green-500" size={20} />
          <h3 className="text-green-500 font-mono font-bold text-sm">OLDEST</h3>
        </div>
        <p className="text-green-500 font-mono text-lg font-bold">
          {oldestLanguage.name}
        </p>
        <p className="text-green-500 font-mono text-xs opacity-70">
          {oldestLanguage.year} | {oldestLanguage.creator}
        </p>
      </div>
      <div className="border border-green-500 bg-black p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-green-500" size={20} />
          <h3 className="text-green-500 font-mono font-bold text-sm">NEWEST</h3>
        </div>
        <p className="text-green-500 font-mono text-lg font-bold">
          {newestLanguage.name}
        </p>
        <p className="text-green-500 font-mono text-xs opacity-70">
          {newestLanguage.year} | {newestLanguage.creator}
        </p>
      </div>
      <div className="border border-green-500 bg-black p-4">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="text-green-500" size={20} />
          <h3 className="text-green-500 font-mono font-bold text-sm">
            MOST COMMON
          </h3>
        </div>
        <p className="text-green-500 font-mono text-lg font-bold">
          {mostCommonParadigm[0]}
        </p>
        <p className="text-green-500 font-mono text-xs opacity-70">
          {mostCommonParadigm[1]} languages
        </p>
      </div>
      <div className="border border-green-500 bg-black p-4 md:col-span-2 lg:col-span-3">
        <h3 className="text-green-500 font-mono font-bold text-sm mb-3">
          &gt; TIMELINE
        </h3>
        <div className="flex items-end gap-1 h-24">
          {Object.entries(decadeCounts)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([decade, count]) => {
              const maxCount = Math.max(...Object.values(decadeCounts));
              const height = (count / maxCount) * 100;
              return (
                <div
                  key={decade}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div className="text-green-500 font-mono text-xs">
                    {count}
                  </div>
                  <div
                    className="w-full bg-green-500 transition-all hover:bg-opacity-70"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-green-500 font-mono text-xs opacity-70">
                    {decade}s
                  </div>
                </div>
              );
            })}
        </div>
        <p className="text-green-500 font-mono text-xs opacity-70 mt-3 text-center">
          Most productive decade: {mostProductiveDecade[0]}s (
          {mostProductiveDecade[1]} languages)
        </p>
      </div>
    </div>
  );
}
