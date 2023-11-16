import {t, Trans} from '@lingui/macro'
import {Stack, Typography, useTheme} from '@mui/material'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useCallback} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useSnackbar} from 'src/core/snackbar'
import {Button} from 'src/shared/button'
import {DropDownList, TextAreaInput} from 'src/shared/input'
import {Header, useHandleBack} from 'src/shared/layouts/app-layout'
import {InputWrapper} from 'src/shared/login-things'
import {feedback} from './feedback.mutation'
import {feedbacktype} from './feedbacktype.query'
export type MenuItemProps = {
  value: string | number
  label: string
}

type Inputs = {
  subject: string
  explanation: string
}
export default function ProfileFeedbackPage() {
  const {
    isLoading,
    mutateAsync,
    //data: mutationData
  } = useMutation(feedback)
  const {data} = useQuery(['feedbacktype'], feedbacktype)
  const {showSnackbar} = useSnackbar()
  const goBack = useHandleBack()

  const theme = useTheme()
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>()

  const onSubmit = useCallback(
    (data: Inputs) => {
      mutateAsync({
        description: data.explanation,
        feedback_type: data.subject,
      }).then((res) => {
        goBack(true)
        if (res) {
          showSnackbar(t`Successfully registered`)
        }
      })
    },
    [goBack, mutateAsync, showSnackbar]
  )
  const optionList = data?.map(([value, [label]]) => ({
    value,
    label,
  }))
  return (
    <>
      <Header hasBackButton={true} title={t`Feedback`} fullWidth />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack py={theme.spacing(4)}>
          <Typography variant="caption">
            <Trans>Send us your suggestion or criticism to improve the program</Trans>
          </Typography>
        </Stack>
        <Stack py={4}>
          <Stack pt={2} pb={1}>
            <Typography variant="caption" py={1}>
              {t`Subject`}*
            </Typography>

            <Controller
              name="subject"
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <DropDownList
                  state={fieldState}
                  onChange={field.onChange}
                  helperText={fieldState.error?.message}
                  optionList={optionList as MenuItemProps[]}
                  placeholder={t`Select a subject`}
                />
              )}
            />
          </Stack>
          <InputWrapper>
            <Stack py={1}>
              <Typography variant="caption" py={1}>{t`Explanation`}</Typography>
              <Controller
                name="explanation"
                control={control}
                rules={{
                  required: true,
                  maxLength: 50,
                }}
                render={({fieldState, field}) => (
                  <TextAreaInput
                    {...field}
                    // title={t`Explanation`}
                    minRows={6}
                    // autoFocus
                    fullWidth
                    state={fieldState}
                    placeholder={t`Text`}
                    helperText={
                      fieldState.error?.type
                        ? fieldState.error?.type === 'required'
                          ? t`This field is required.` // ? t`Please enter the code correctly.`
                          : t`This field most be lower than 50 characters.`
                        : ''
                        ? t`This field most be lower than 50 characters.`
                        : undefined
                    }
                  />
                )}
              />
            </Stack>
          </InputWrapper>
        </Stack>
        <Stack p={2}>
          <Button
            fullWidth
            variant="contained"
            disabled={!!(errors.explanation || errors.subject || isLoading)}
            color={'primary'}
            type={'submit'}
          >
            <Trans>Send feedback</Trans>
          </Button>
        </Stack>
      </form>
    </>
  )
}
