type Animal = {
  _id: string;
  name: string;
  breed: string;
  owner: { _id?: string; fullName: string } | string;
  hoursTrained: number;
  profilePicture: string;
};

type Props = {
  animal: Animal;
};

export default function AnimalCard({ animal }: Props) {
  const ownerName = typeof animal.owner === "object" ? animal.owner.fullName : animal.owner;
  const ownerInitial = ownerName ? ownerName.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-56">
      {/* Photo with owner avatar overlapping bottom-left */}
      <div className="relative h-48 w-full bg-gray-100">
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
        {/* Owner avatar overlapping bottom-left */}
        <div
          className="absolute -bottom-4 left-3 flex items-center justify-center rounded-full text-white font-bold text-sm border-2 border-white"
          style={{ backgroundColor: "#D21312", width: "2rem", height: "2rem" }}
        >
          {ownerInitial}
        </div>
      </div>

      {/* Card info */}
      <div className="pt-6 px-3 pb-3">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {animal.name} · {animal.breed}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {ownerName} · Trained: {animal.hoursTrained} hours
        </p>
      </div>
    </div>
  );
}
