import {t, Trans} from '@lingui/macro'
import {Stack} from '@mui/material'
import {LatLng} from 'leaflet'
import {Controller, FormProvider} from 'react-hook-form'
import {Button} from 'src/shared/button'
import {CustomizedRadio, DropDownList, MapInput, MultipleChoiceDropDownList, StandardTextField, TextAreaInput} from 'src/shared/input'
import {Header} from 'src/shared/layouts/app-layout'
import {CitySection, ProvinceSection} from 'src/shared/province-city-section'
import {ProvinceCityInputType, ResortTypeEnum} from 'src/shared/types/server'
import {StyleHeader} from './addPlace.style'
import {useAddPlace} from './useAddPlace'

export interface InputsAddPlacePage extends ProvinceCityInputType {
  name: string
  location: LatLng
  address: string
  resort_type: ResortTypeEnum | null
  resort_filter: string
  description: string
  label: string[]
}

export default function AddPlacePage() {
  const {methods, handleSubmit, onSubmit, control, resortOptions, isLoading} = useAddPlace()
  return (
    <>
      <Header hasBackButton={true} title={t`Add place`} fullWidth />
      <StyleHeader>
        <Trans>Fill the form below if you want to add a place</Trans>
      </StyleHeader>
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
                  title={t`Place name *`}
                  placeholder={t`Text`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack py={2}>
            <ProvinceSection />
          </Stack>
          <Stack py={2}>
            <CitySection />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="address"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <StandardTextField
                  {...field}
                  fullWidth
                  state={fieldState}
                  title={t`Address *`}
                  placeholder={t`Text`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="resort_type"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <CustomizedRadio
                  RadioList={[
                    {label: t`Residence`, value: 'residence'},
                    {label: t`Restaurant`, value: 'restaurant'},
                    {label: t`Attraction`, value: 'tourismEntity'},
                  ]}
                  {...field}
                  label={t`Experience type *`}
                  state={fieldState}
                  control={<></>}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="location"
              control={control}
              rules={{
                required: true,
              }}
              render={({field, fieldState}) => (
                <MapInput state={fieldState} label={t`Choose on map *`} {...field} helperText={fieldState.error?.message} />
              )}
            />
          </Stack>
          {resortOptions?.length && (
            <Stack pt={2} pb={1}>
              <Controller
                name="resort_filter"
                control={control}
                rules={{
                  required: true,
                }}
                render={({fieldState, field}) => (
                  <DropDownList
                    state={fieldState}
                    onChange={field.onChange}
                    helperText={fieldState.error?.message}
                    optionList={resortOptions}
                    title={t`Type *`}
                    placeholder={t`Type`}
                  />
                )}
              />
            </Stack>
          )}
          <Stack pt={2} pb={1}>
            <Controller
              name="label"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <MultipleChoiceDropDownList
                  value={field.value}
                  optionList={[]}
                  inputLabel=""
                  onChange={field.onChange}
                  state={fieldState}
                  title={t`Tag *`}
                  placeholder={t`Tag`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: 50,
              }}
              render={({fieldState, field}) => (
                <TextAreaInput
                  {...field}
                  minRows={6}
                  fullWidth
                  state={fieldState}
                  title={t`Description`}
                  placeholder={t`Text`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Button fullWidth type="submit" variant="contained" color="primary" isLoading={isLoading}>
            <Trans>Add place</Trans>
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
