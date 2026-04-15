type Animal = {
  _id: string;
  name: string;
  breed: string;
  owner: { fullName: string } | string;
  hoursTrained: number;
  profilePicture: string;
};

type Props = {
  animal: Animal;
};

export default function AnimalCard({ animal }: Props) {
  const ownerName = typeof animal.owner === "object" ? animal.owner.fullName : animal.owner;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-64">
      <div className="h-44 w-full bg-gray-100 relative">
        {animal.profilePicture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={animal.profilePicture}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-4xl">?</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
        <p className="text-sm text-gray-500">{animal.breed}</p>
        <p className="text-sm text-gray-500 mt-1">Owner: {ownerName}</p>
        <p className="text-sm text-gray-700 mt-1 font-medium">{animal.hoursTrained} hrs trained</p>
      </div>
    </div>
  );
}
