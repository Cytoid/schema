export interface CytoidChart {
  format_version: 1
  time_base: number
  start_offset_time: 0
  end_offset_time: 0

  music_offset?: number
  size?: number
  opacity?: number
  ring_color?: string
  fill_colors?: string[]
  display_boundaries?: boolean
  display_background?: boolean
  horizontal_margin?: number
  vertical_margin?: number
  restrict_play_area_aspect_ratio?: boolean
  skip_music_on_completion?: boolean

  page_list: CytoidChartPage[]
  tempo_list: CytoidChartTempo[]
  event_order_list: CytoidChartEventOrder[]
  note_list: CytoidChartNote[]
}

export interface CytoidChartPage {
  start_tick: number
  end_tick: number
  scan_line_direction: number
}

export interface CytoidChartTempo {
  tick: number
  value: number
}

export interface CytoidChartEventOrder {
  tick: number
  event_list: CytoidChartEvent[]
}

export enum CytoidChartEventType {
  SPEED_UP = 0,
  SPEED_DOWN = 1,
}

export type CytoidChartEvent = CytoidChartEventSpeed

export enum CytoidChartEventSpeedType {
  WHITE = 'W',
  RED = 'R',
  GREEN = 'G',
}

export interface CytoidChartEventSpeed {
  type: CytoidChartEventType
  args: 'W' | 'R' | 'G'
}

export enum CytoidChartNodeType {
  CLICK = 0,
  HOLD = 1,
  LONG_HOLD = 2,
  DRAG = 3,
  DRAG_CHILD = 4,
  FLICK = 5,
  CLICK_DRAG = 6,
  CLICK_DRAG_CHILD = 7,
}

export interface CytoidChartNote {
  page_index: number
  type: CytoidChartNodeType
  id: number
  x: number
  tick: number
  has_sibling: boolean
  hold_tick: number
  next_id: number
  is_forward: boolean
}
