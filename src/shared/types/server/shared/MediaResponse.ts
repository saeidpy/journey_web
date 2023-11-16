export enum MediaEnum {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface MediaResponse {
  adder_by_id: number | null
  created_at: Date | string
  dislike_count: number
  impression_of_the_caller: number | null
  is_main: boolean
  like_count: number
  media_file_storage: string | null
  media_id: number
  storage_path: string | null
  temporary_media_url: string | null
  type: [MediaEnum, string[]]
  url: string
}
