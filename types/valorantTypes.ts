import * as z from "zod";

export interface Meta {
  status: number;
  data: ValorantData[];
}

export interface ValorantData {
  uuid?: string;
  displayName?: string;
  description?: string;
  developerName?: string;
  characterTags?: string[] | null;
  displayIcon?: string;
  displayIconSmall?: string;
  bustPortrait?: null | string;
  fullPortrait?: null | string;
  fullPortraitV2?: null | string;
  killfeedPortrait?: string;
  background?: null | string;
  backgroundGradientColors?: string[];
  assetPath?: string;
  isFullPortraitRightFacing?: boolean;
  isPlayableCharacter?: boolean;
  isAvailableForTest?: boolean;
  isBaseContent?: boolean;
  role?: Role | null;
  abilities?: Ability[];
  voiceLine?: VoiceLine;
}

export interface Ability {
  slot?: Slot;
  displayName?: string;
  description?: string;
  displayIcon?: null | string;
}

export enum Slot {
  Ability1 = "Ability1",
  Ability2 = "Ability2",
  Grenade = "Grenade",
  Passive = "Passive",
  Ultimate = "Ultimate",
}

export interface Role {
  uuid?: string;
  displayName?: DisplayName;
  description?: string;
  displayIcon?: string;
  assetPath?: string;
}

export enum DisplayName {
  Controller = "Controller",
  Duelist = "Duelist",
  Initiator = "Initiator",
  Sentinel = "Sentinel",
}

export interface VoiceLine {
  minDuration?: number;
  maxDuration?: number;
  mediaList?: MediaList[];
}

export interface MediaList {
  id?: number;
  wwise?: string;
  wave?: string;
}

const abilitySchema = z.object({
  slot: z
    .enum([
      Slot.Ability1,
      Slot.Ability2,
      Slot.Grenade,
      Slot.Passive,
      Slot.Ultimate,
    ])
    .optional(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  displayIcon: z.string().nullable().optional(),
});

const roleSchema = z.object({
  uuid: z.string().optional(),
  displayName: z
    .enum([
      DisplayName.Controller,
      DisplayName.Duelist,
      DisplayName.Initiator,
      DisplayName.Sentinel,
    ])
    .optional(),
  description: z.string().optional(),
  displayIcon: z.string().optional(),
  assetPath: z.string().optional(),
});

const mediaListSchema = z.object({
  id: z.number().optional(),
  wwise: z.string().optional(),
  wave: z.string().optional(),
});

const voiceLineSchema = z.object({
  minDuration: z.number().optional(),
  maxDuration: z.number().optional(),
  mediaList: z.array(mediaListSchema).optional(),
});

export const valorantSchema = z.object({
  uuid: z.string(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  developerName: z.string().optional(),
  characterTags: z.array(z.string().nullable()).optional(),
  displayIcon: z.string().nullable().optional(),
  displayIconSmall: z.string().nullable().optional(),
  bustPortrait: z.string().nullable().optional(),
  fullPortrait: z.string().nullable().optional(),
  fullPortraitV2: z.string().nullable().optional(),
  killfeedPortrait: z.string().optional(),
  background: z.string().nullable().optional(),
  backgroundGradientColors: z.array(z.string()).optional(),
  assetPath: z.string().optional(),
  isFullPortraitRightFacing: z.boolean().optional(),
  isPlayableCharacter: z.boolean().optional(),
  isAvailableForTest: z.boolean().optional(),
  isBaseContent: z.boolean().optional(),
  role: roleSchema.nullable().optional(),
  abilities: z.array(abilitySchema).optional(),
  voiceLine: voiceLineSchema.optional(),
});

const metaSchema = z.object({
  status: z.number(),
  data: z.array(valorantSchema),
});

export type MetaType = z.infer<typeof metaSchema>;
