import DetailValorant from "@/pages/valorant/[uuid]";

interface valobox {
  displayName?: any;
  uuid?: any;
  displayIcon?: string;
}

export default function Pokebox(props: valobox) {
  return (
    <div className="p-6  bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-auto max-w-lg rounded-lg">
      <img src={props.displayIcon} alt={props.displayName} />
      <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.displayName}
        </h5>
      </a>
      <DetailValorant
        data={{
          displayName: props.displayName,
          uuid: props.uuid,
        }}
      />
    </div>
  );
}
