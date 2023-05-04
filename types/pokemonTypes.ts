export interface Pokemon {
  name?: string | any;
  abilities?: { ability: { name: string } }[] | any;
  types?: { type: { name: string } }[];
  stats?: { base_stat: number; stat: { name: string } }[];
  moves?: { move: { name: string } }[];
  sprites?: { front_default: string; front_shiny: string };
  id?: any;
}
