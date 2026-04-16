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
};

export default function TrainingLogCard({ log }: Props) {
  const ownerName = typeof log.owner === "object" ? log.owner.fullName : log.owner;
  const animalName = typeof log.animal === "object" ? log.animal.name : log.animal;
  const animalBreed = typeof log.animal === "object" ? log.animal.breed : "";
  const formattedDate = new Date(log.date).toLocaleDateString();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{log.title}</h3>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        {ownerName} · {animalName}
        {animalBreed && ` (${animalBreed})`}
      </p>
      <p className="text-sm text-gray-700 mb-2">{log.description}</p>
      <p className="text-sm font-medium text-gray-900">{log.hours} hrs</p>
    </div>
  );
}