import DetailPokemon from "@/pages/pokemon/[id]";

interface pokebox {
  name?: any;
  id?: any;
  image?: string;
}

export default function Pokebox(props: pokebox) {
  return (
    <div className="p-6  bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-auto max-w-lg rounded-lg">
      <img src={props.image} alt={props.name} />
      <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
      </a>

      <DetailPokemon
        data={{
          name: props.name,
          id: props.id,
        }}
      />
    </div>
  );
}
