import {t, Trans} from '@lingui/macro'
import {Grid, Stack, Typography, useTheme} from '@mui/material'
import {MobileDatePicker} from '@mui/x-date-pickers'
import {subMonths} from 'date-fns' // Import date-fns for date manipulation
import {ChangeEvent} from 'react'
import {Controller} from 'react-hook-form'
import {Cancel} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {PlaceBriefCart} from 'src/shared/cart'
import {ImageUploader} from 'src/shared/image-uploader'
import {CustomizedRadio, StandardTextField, TextAreaInput} from 'src/shared/input'
import {Header} from 'src/shared/layouts/app-layout'
import {NewBadge} from 'src/shared/newBadge'
import {RateIcon} from 'src/shared/rate'
import {ExperienceTypeEnum} from 'src/shared/types/server'
import {CustomGrid, HiddenInput, IconButtonForRemovePreviewPhoto} from './addComment.style'
import useAddComment from './useAddComment'

export default function AddCommentPage() {
  const theme = useTheme()

  const {
    thingData,
    handleSubmit,
    onSubmit,
    control,
    inputPhotoRef,
    onFileChangeCapture,
    onAddingPhotoBtnClick,
    photoPreview,
    removeSelectedPhoto,
    isLoading,
    isNewBadgeModalShown,
    onCloseBadge,
    memberName,
    medalName,
    isShownCropper,
    selectedImage,
    setIsShownCropper,
    getCropData,
  } = useAddComment()

  return thingData ? (
    <>
      <Header hasBackButton title={t`Add Comment`} fullWidth />
      <PlaceBriefCart location={thingData?.location.city.city_name_fa} name={thingData?.name_fa} imageUrl={thingData?.media_list[0]?.url} />
      <form id="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          <Stack>
            <Controller
              name="rate"
              control={control}
              rules={{
                required: true,
              }}
              render={({field, fieldState}) => (
                <RateIcon
                  onChangeRate={(val) => {
                    field.onChange(val)
                  }}
                  rate={0}
                  title={t`Rate this experience`}
                  state={fieldState}
                  isChangeable={true}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              name="date"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <MobileDatePicker
                  disableFuture
                  inputFormat="yyyy-MM-dd"
                  {...field}
                  DialogProps={{dir: theme.direction}}
                  minDate={subMonths(new Date(), 6)} // Calculate the max date (6 months ago)
                  renderInput={(params) => (
                    <StandardTextField
                      {...params}
                      {...field}
                      fullWidth
                      state={fieldState}
                      title={t`Experience's date`}
                      placeholder={t`Experience's date`}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{shrink: false}}
                    />
                  )}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              name="experienceType"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <CustomizedRadio
                  sx={{flexWrap: 'nowrap'}}
                  RadioList={[
                    {label: t`FamilyJust`, value: ExperienceTypeEnum.FAMILY},
                    {label: t`Friendly`, value: ExperienceTypeEnum.FRIENDLY},
                    {label: t`Work`, value: ExperienceTypeEnum.WORK_RELATED},
                    {label: t`Single`, value: ExperienceTypeEnum.SINGLE},
                  ]}
                  {...field}
                  onChange={field.onChange}
                  label={t`Experience type *`}
                  state={fieldState}
                  control={<></>}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack>
            <Controller
              name="comment"
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({fieldState, field}) => (
                <TextAreaInput
                  {...field}
                  minRows={6}
                  autoFocus
                  fullWidth
                  title={t`Experience's comment`}
                  state={fieldState}
                  placeholder={t`Text`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack alignItems="flex-start">
            <Controller
              name="image2"
              control={control}
              defaultValue={null}
              render={({field}) => (
                <>
                  <HiddenInput
                    type="file"
                    ref={inputPhotoRef}
                    onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => {
                      // field.onChange(e)
                      onFileChangeCapture(e)
                    }}
                  />
                  <Button variant="text" onClick={onAddingPhotoBtnClick}>
                    <Typography variant="h2"> + </Typography>
                    <Typography>
                      <Trans>Add Photo</Trans>
                    </Typography>
                  </Button>
                </>
              )}
            />
            {photoPreview && (
              <Grid flexWrap="unset" overflow="auto" py={1} container spacing={0.5}>
                {photoPreview.map((item, i) => (
                  <CustomGrid item xs={4} key={i}>
                    <img alt={`Preview_${i}`} src={item} width="100%" />
                    <IconButtonForRemovePreviewPhoto
                      size="large"
                      onClick={() => {
                        removeSelectedPhoto(i)
                      }}
                    >
                      <Cancel width={30} height={30} />
                    </IconButtonForRemovePreviewPhoto>
                  </CustomGrid>
                ))}
              </Grid>
            )}
          </Stack>
          <Button type="submit" variant="contained" isLoading={isLoading} fullWidth color="primary">
            <Trans>Submit comment</Trans>
          </Button>
        </Stack>
      </form>
      {isNewBadgeModalShown && <NewBadge close={onCloseBadge} medalName={medalName} memberName={memberName} />}
      {isShownCropper && selectedImage && (
        <ImageUploader
          onClose={() => {
            setIsShownCropper(false)
          }}
          image={URL.createObjectURL(selectedImage)}
          getCropData={getCropData}
        />
      )}
    </>
  ) : null
}
