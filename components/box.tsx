import DetailPokemon from "@/pages/pokemon/[id]";
import DetailValorant from "@/pages/valorant/[uuid]";
import { Pokemon } from "@/types/pokemonTypes";

interface DetailProps<T = {}> {
  data?: Partial<T> & Pokemon;
}

interface BaseBoxProps<T> {
  image?: string;
  name: string;
  id: any;
  detailComponent?: JSX.Element;
  detailData?: DetailProps<T>;
}

function BaseBox<T extends DetailProps>(props: BaseBoxProps<T>) {
  const { image, name, detailComponent: DetailComponent, detailData } = props;

  return (
    <div className="p-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-auto max-w-lg rounded-lg">
      <img src={image} alt={name} />
      <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </a>
      {DetailComponent}
    </div>
  );
}

interface PokeboxProps {
  name?: string;
  id?: any;
  image?: string;
}

export function Pokebox(props: PokeboxProps) {
  return (
    <BaseBox<DetailProps>
      image={props.image!}
      name={props.name!}
      id={props.id!}
      detailComponent={
        <DetailPokemon
          data={{
            name: props.name,
            id: props.id,
          }}
        />
      }
    />
  );
}

interface ValoboxProps {
  displayName?: string;
  uuid?: any;
  displayIcon?: string;
  displayIconSmall?: string;
}
export function Valobox(props: ValoboxProps) {
  return (
    <BaseBox<DetailProps>
      image={props.displayIconSmall!}
      name={props.displayName!}
      id={props.uuid!}
      detailComponent={
        <DetailValorant
          data={{
            displayName: props.displayName,
            uuid: props.uuid,
          }}
        />
      }
    />
  );
}

interface PtProps {
  nama_pt?: string;
  id_sp?: any;
  kode_pt?: string;
}

export function Ptbox(props: PtProps) {
  return (
    <BaseBox<DetailProps>
      image={props.kode_pt!}
      name={props.nama_pt!}
      id={props.id_sp!}
    />
  );
}
