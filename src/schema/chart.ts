import type { CytoidChart } from '../types/chart'
import { z } from 'zod/v4-mini'

export const cytoidChartTickSchema = z.number().check(
  z.int(),
  z.gte(0),
)

export const cytoidChartPageSchema = z.object({
  start_tick: cytoidChartTickSchema,
  end_tick: cytoidChartTickSchema,
  scan_line_direction: z.number().check(z.int()),
})

export const cytoidChartTempoSchema = z.object({
  tick: cytoidChartTickSchema,
  value: z.number().check(z.int()),
})

export const cytoidChartEventTypeSchema = z.union([z.literal(0), z.literal(1)])

export const cytoidChartEventSpeedTypeSchema = z.union([z.literal('W'), z.literal('R'), z.literal('G')])

export const cytoidChartEventSpeedSchema = z.object({
  type: cytoidChartEventTypeSchema,
  args: cytoidChartEventSpeedTypeSchema,
})

export const cytoidChartEventSchema = z.union([cytoidChartEventSpeedSchema])

export const cytoidChartEventOrderSchema = z.object({
  tick: cytoidChartTickSchema,
  event_list: z.array(cytoidChartEventSchema),
})

export const cytoidChartNodeTypeSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
])

export const cytoidChartNodeSchema = z.object({
  page_index: z.number().check(z.int(), z.gte(0)),
  type: cytoidChartNodeTypeSchema,
  id: z.number().check(z.int(), z.gte(0)),
  tick: cytoidChartTickSchema,
  has_sibling: z.boolean(),
  hold_tick: cytoidChartTickSchema,
  next_id: z.number().check(z.int(), z.gte(0)),
  is_forward: z.boolean(),
})

export const cytoidChartSchema = z.object({
  format_version: z.literal(1),
  time_base: z.number().check(z.int(), z.gte(0)),
  start_offset_time: z.literal(0),
  end_offset_time: z.literal(0),

  music_offset: z.optional(z.number()),
  size: z.optional(z.number().check(z.gt(0))),
  opacity: z.optional(z.number().check(z.int(), z.gte(0))),
  ring_color: z.optional(z.string()),
  fill_colors: z.optional(z.array(z.string())),
  display_boundaries: z.optional(z.boolean()),
  display_background: z.optional(z.boolean()),
  horizontal_margin: z.optional(z.number().check(z.int())),
  vertical_margin: z.optional(z.number().check(z.int())),
  restrict_play_area_aspect_ratio: z.optional(z.boolean()),
  skip_music_on_completion: z.optional(z.boolean()),

  page_list: z.array(cytoidChartPageSchema),
  tempo_list: z.array(cytoidChartTempoSchema),
  event_order_list: z.array(cytoidChartEventOrderSchema),
  node_list: z.array(cytoidChartNodeSchema),
})

export function parseCytoidChart(input: unknown) {
  const raw = typeof input === 'string' ? JSON.parse(input) : input
  return cytoidChartSchema.parse(raw) as CytoidChart
}
