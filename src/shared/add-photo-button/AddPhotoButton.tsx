import {Trans} from '@lingui/macro'
import {styled, Typography} from '@mui/material'
import {useRef, useState} from 'react'
import {useUserProfile} from 'src/core/auth'
import {Button} from 'src/shared/button'
import {FullScreenModalForAddingPhoto} from 'src/shared/modal'

const HiddenInput = styled('input')({
  display: 'none',
})

export type AddButtonProps = {
  resortId: string
}
export const AddPhotoButton = (props: AddButtonProps) => {
  const [isShown, setIsShown] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const {user} = useUserProfile()
  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setIsShown(true)
    }
  }
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current?.click()
  }

  const closeFunc = () => {
    setIsShown(false)
  }
  return (
    <>
      <form>
        <HiddenInput type="file" ref={inputFileRef} onChangeCapture={onFileChangeCapture} />
        <Button fullWidth color="primary" variant="contained" onClick={onBtnClick}>
          <Trans>Add Photo</Trans>
        </Button>
      </form>
      {isShown && (
        <FullScreenModalForAddingPhoto
          close={closeFunc}
          dataToPost={{image_1: selectedImage as Blob, member_id: (user?.member_id as number).toString()}}
          resortId={props.resortId}
          UserInfo={
            <Typography variant="caption" color="white">
              <Trans>Selected photo</Trans>
            </Typography>
          }
        >
          {selectedImage !== null ? <img src={URL.createObjectURL(selectedImage)} width="100%" alt="Thumb" /> : null}
        </FullScreenModalForAddingPhoto>
      )}
    </>
  )
}
