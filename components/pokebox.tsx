import DetailPokemon from "@/pages/pokemon/detail/[id]";

interface pokebox {
  name?: string;
  id?: number;
  image?: string;
}

export default function Pokebox(props: pokebox) {
  return (
    <div className="p-6 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700 h-auto max-w-lg rounded-lg">
      <img src={props.image} alt={props.name} />
      <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
      </a>
      <a
        href={`/pokemon/detail/${props.id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Detail
      </a>
    </div>
  );
}
