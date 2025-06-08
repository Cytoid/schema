export interface CytoidLevel {
  schema_version: 1 | 2
  version: number
  id: string

  title: string
  title_localized?: string

  artist: string
  artist_localized?: string
  artist_source?: string

  illustrator: string
  illustrator_source?: string

  charter: string
  storyboarder?: string

  music: CytoidLevelResourceFile
  music_preview: CytoidLevelResourceFile

  background: CytoidLevelResourceFile

  charts: CytoidLevelChart[]
}

export interface CytoidLevelResourceFile {
  path: string
}

export interface CytoidLevelChart extends CytoidLevelResourceFile {
  type: 'easy' | 'hard' | 'extreme'
  name?: string
  difficulty: number
  music_override?: CytoidLevelResourceFile
  storyboard?: CytoidLevelResourceFile
}
