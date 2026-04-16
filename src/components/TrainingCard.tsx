type TrainingLog = {
  _id: string;
  title: string;
  description: string;
  hours: number;
  date: string;
  owner: { fullName: string } | string;
  animal: { name: string; breed: string } | string;
};

type Props = {
  log: TrainingLog;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TrainingCard({ log, onEdit, onDelete }: Props) {
  const ownerName = typeof log.owner === "object" ? log.owner.fullName : log.owner;
  const animalName = typeof log.animal === "object" ? log.animal.name : log.animal;
  const animalBreed = typeof log.animal === "object" ? log.animal.breed : "";

  const dateObj = new Date(log.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const year = dateObj.getFullYear();

  return (
    <div className="flex items-stretch bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center bg-indigo-900 text-white px-8 py-6 min-w-[120px]">
        <span className="text-3xl font-bold leading-none">{day}</span>
        <span className="text-xs mt-2 tracking-wide">{month} - {year}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-7 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-base font-bold text-gray-900">{log.title}</h3>
            <span className="text-sm text-gray-400">· {log.hours} hours</span>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {ownerName}
            {animalBreed && ` - ${animalBreed}`}
            {animalName && ` - ${animalName}`}
          </p>
          <p className="text-sm text-gray-700">{log.description}</p>
        </div>

        <div className="flex gap-2 shrink-0 ml-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 transition"
              aria-label="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.5 1.5l-9 9V17h2.914l9-9-2.914-2.914z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              aria-label="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}