import {MediaEnum, MediaResponse} from 'src/shared/types/server'

export const createMediaOutOfUrl = (url: string) =>
  ({
    url,
    adder_by_id: 0,
    created_at: new Date(),
    dislike_count: 0,
    impression_of_the_caller: null,
    is_main: true,
    like_count: 0,
    media_file_storage: null,
    media_id: 0,
    storage_path: null,
    temporary_media_url: null,
    type: [MediaEnum.IMAGE, [MediaEnum.IMAGE]],
  } as MediaResponse)

export const createMediaOutOfFile = (file: File) => createMediaOutOfUrl(URL.createObjectURL(file))
