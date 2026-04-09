import { useRouter } from "next/router";
import { dragonBallSuperItems } from "../../data/mangaData";

export default function DBSPage() {
  const router = useRouter();
  const { id } = router.query;

  const volume = dragonBallSuperItems.find((v) => v.id === id);

  if (!volume) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dragon Ball Super</h1>
      <h2>{volume.title}</h2>
      <img src={volume.coverUrl} width={200} />
      <p>{volume.description}</p>
    </div>
  );
}