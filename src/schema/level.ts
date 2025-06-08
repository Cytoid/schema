import type { CytoidLevel } from '../types/level'
import { z } from 'zod/v4-mini'

export const cytoidLevelResourceFileSchema = z.object({
  path: z.string(),
})

export const cytoidLevelChartSchema = z.object({
  path: z.string(),
  type: z.union([z.literal('easy'), z.literal('hard'), z.literal('extreme')]),
  name: z.optional(z.string()),
  difficulty: z.number(),
  music_override: z.optional(cytoidLevelResourceFileSchema),
  storyboard: z.optional(cytoidLevelResourceFileSchema),
})

export const cytoidLevelIDRegex = /^[a-z\d_]+(?:(?:[\-_.][a-z\d]+)+|_)$/

export const cytoidLevelSchema = z.object({
  schema_version: z.union([z.literal(1), z.literal(2)]),
  version: z.number().check(
    z.int(),
    z.minimum(1),
    z.maximum(999),
  ),
  id: z.string().check(
    z.regex(cytoidLevelIDRegex),
  ),

  title: z.string(),
  title_localized: z.optional(z.string()),

  artist: z.string(),
  artist_localized: z.optional(z.string()),
  artist_source: z.optional(z.string()),

  illustrator: z.string(),
  illustrator_source: z.optional(z.string()),

  charter: z.string(),
  storyboarder: z.optional(z.string()),

  music: cytoidLevelResourceFileSchema,
  music_preview: cytoidLevelResourceFileSchema,
  background: cytoidLevelResourceFileSchema,

  charts: z.array(cytoidLevelChartSchema),
})

export function parseCytoidLevel(input: unknown) {
  const raw = typeof input === 'string' ? JSON.parse(input) : input
  return cytoidLevelSchema.parse(raw) as CytoidLevel
}
