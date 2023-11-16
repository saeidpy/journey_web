import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import {QueryFunction, QueryKey, useQuery} from '@tanstack/react-query'
import {ForwardedRef, forwardRef, Key as ReactKey, ReactElement, useId} from 'react'
import {BaseResponseType} from 'src/shared/types/server'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import {AsyncDropDownListProps} from './types'

interface AsyncDropDownProps<Data, Key extends QueryKey> {
  queryKey: Key
  queryFn: QueryFunction<BaseResponseType<Data[]>['data'], Key>
  getItem: (
    option: Data,
    index: number
  ) => {
    value: string | number | readonly string[] | undefined
    label: string
    key: ReactKey
  }
}

const Select = styled(MuiSelect, {shouldForwardProp})<{color?: string}>(({color, theme}) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(1),
  border: `1px solid ${!color ? theme.palette.shades[2] : theme.palette[color].main};`,
  backgroundColor: theme.palette.shades[2],
  position: 'relative',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: !color ? theme.palette.shades[4] : theme.palette[color].main,
  padding: theme.spacing(1, 2),
  '&:before, :after': {
    display: 'none',
  },
}))

export const AsyncDropDown: <Data = unknown, Key extends QueryKey = QueryKey, RefType = unknown>(
  props: AsyncDropDownProps<Data, Key> & Omit<AsyncDropDownListProps, 'optionList'> & SelectProps,
  ref: ForwardedRef<RefType>
) => ReactElement | null = forwardRef(
  (
    {queryKey, queryFn, getItem, inputLabel, onChange, onBlur, value, state: {error, invalid, isDirty}, helperText, ...selectProps},
    ref
  ) => {
    const {data, isLoading} = useQuery(queryKey, queryFn, {
      suspense: false,
      useErrorBoundary: false,
    })
    const internalId = useId()
    const theme = useTheme()
    const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined
    return (
      <FormControl variant="standard" sx={{paddingY: theme.spacing(1)}} error={error !== undefined}>
        <InputLabel shrink htmlFor={internalId} style={{transform: 'unset'}}>
          {inputLabel}
        </InputLabel>
        <Select
          color={color}
          defaultValue="none"
          id={internalId}
          inputRef={ref}
          onChange={onChange}
          value={value}
          placeholder={inputLabel}
          inputProps={{'aria-label': 'Without label'}}
          {...selectProps}
          endAdornment={
            isLoading ? (
              <Stack mr={2}>
                <CircularProgress color="inherit" size={20} />
              </Stack>
            ) : undefined
          }
        >
          {inputLabel && (
            <MenuItem disabled value="none">
              {inputLabel}
            </MenuItem>
          )}
          {data?.result?.map((option, index) => {
            const item = getItem(option, index)
            return (
              <MenuItem key={item.key} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
        {helperText ? (
          <Typography variant="subtitle1" color="error">
            {helperText}
          </Typography>
        ) : (
          ''
        )}
      </FormControl>
    )
  }
)
