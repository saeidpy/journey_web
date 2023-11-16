import {t, Trans} from '@lingui/macro'
import {Stack} from '@mui/material'
import {Controller, FormProvider} from 'react-hook-form'
import {coverPng, profileJpg} from 'src/assets/img'
import {Button} from 'src/shared/button'
import {StandardTextField, TextAreaInput} from 'src/shared/input'
import {NewBadge} from 'src/shared/newBadge'
import {CitySection, ProvinceCityInputType, ProvinceSection} from 'src/shared/province-city-section'
import {ProfileHeaderWithCover} from '../ProfileHeaderWithCover'
import useEditProfile from './useEditProfile'
export interface InputsEditProfilePage extends ProvinceCityInputType {
  name: string | null
  description: string | null
  phone_number: string
  email: string
}

export default function EditProfilePage() {
  const {onSubmit, medalName, memberName, isLoading, isNewBadgeModalShown, profileData, methods, onCloseBadge, handleUpdate} =
    useEditProfile()
  const {control, handleSubmit} = methods
  return (
    <>
      <ProfileHeaderWithCover
        hasFeedbackButton={false}
        hasBackButton={true}
        isPhotoChangeable={true}
        coverAlt={profileData?.name ?? 'Cover'}
        coverSrc={profileData?.cover_picture?.url ?? coverPng}
        profileSrc={profileData?.profile_picture?.url ?? profileJpg}
        onFinishUpload={handleUpdate}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack pt={2} pb={1}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <StandardTextField
                  {...field}
                  autoFocus
                  fullWidth
                  state={fieldState}
                  title={t`Enter your name.`}
                  placeholder={t`Name *`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="phone_number"
              control={control}
              render={({fieldState, field}) => (
                <StandardTextField
                  {...field}
                  fullWidth
                  disabled
                  state={fieldState}
                  title={t`Enter your phone number.`}
                  placeholder={t`Phone number *`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="email"
              control={control}
              render={({fieldState, field}) => (
                <StandardTextField
                  {...field}
                  fullWidth
                  state={fieldState}
                  title={t`Enter your email.`}
                  placeholder={t`Email`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <ProvinceSection />
          </Stack>
          <Stack pt={2} pb={1}>
            <CitySection />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="description"
              control={control}
              render={({fieldState, field}) => (
                <TextAreaInput
                  title={t`About Me`}
                  {...field}
                  minRows={6}
                  fullWidth
                  state={fieldState}
                  placeholder={t`Text`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack py={2}>
            <Button variant="contained" type="submit" color="primary" fullWidth isLoading={isLoading}>
              <Trans>Confirm</Trans>
            </Button>
          </Stack>
        </form>
      </FormProvider>
      {isNewBadgeModalShown && <NewBadge close={onCloseBadge} medalName={medalName} memberName={memberName} />}
    </>
  )
}
