export interface Story {
  id: number
  by: string
  descendants: number
  kids: number[]
  score: number
  time: number
  title: string
  type: "story"
  url: string
  deleted?: boolean
}

export interface Comment {
  id: number
  by: string
  parent: number
  time: number
  text: string
  type: "comment"
  kids?: number[]
  deleted?: boolean
}
