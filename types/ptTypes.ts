import { z } from "zod";

export type PTData = {
  id_sp: string;
  kode_pt: string;
  nama_pt: string;
};

export const ptSchema = z.array(
  z.object({
    id_sp: z.string().uuid(),
    kode_pt: z.string().trim(),
    nama_pt: z.string().optional(),
  })
);

export type PT = z.infer<typeof ptSchema>;
