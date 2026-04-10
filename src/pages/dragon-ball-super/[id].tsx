import { useParams } from "react-router-dom";
import { dragonBallSuperItems, dragonBallZItems } from "../../data/mangaData";

export default function Reader() {
  const { id, series } = useParams<{ id: string; series: string }>();

  const data =
    series === "dbs" ? dragonBallSuperItems : dragonBallZItems;

  const volume = data.find((item) => item.id === id);

  if (!volume) {
    return <h1 className="text-white p-10">Volume not found</h1>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{volume.title}</h1>
      <p className="mb-6 text-zinc-400">{volume.description}</p>

      {/* Example pages */}
      {Array.from({ length: 10 }, (_, i) => (
        <img
          key={i}
          src={`/images/${series}/volume${id}/page${i + 1}.jpg`}
          alt={`Page ${i + 1}`}
          className="w-full mb-4"
          loading="lazy"
        />
      ))}
    </div>
  );
}