import {t, Trans} from '@lingui/macro'
import {Divider, IconButton, Stack, Typography} from '@mui/material'
import {compact, set} from 'lodash'
import {useEffect, useRef} from 'react'
import {FieldPath, useController, useFormContext} from 'react-hook-form'
import {DeleteIcon, Plus} from 'src/assets/icons'
import {PassengerRoomType} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import {convertToPersianLetter} from '../utils/number'
import {PassengerCountType} from './HotelPassengerCountModal'
import {PassengerCounter} from './PassengerCounter'

const HotelRoomCounter = ({maxRoom}: {maxRoom: number}) => {
  const {control, getValues} = useFormContext<PassengerCountType>()
  const {
    field: {value: counterList, onChange},
  } = useController({control, name: 'count'})

  const handleChange = (name: FieldPath<PassengerRoomType[]>, value: number): void => {
    const _value = [...(getValues()?.count ?? counterList)]
    set(_value, name, value)
    onChange(_value)
  }
  const roomContainerRef = useRef<HTMLDivElement | null>(null)

  const handleAddRoom = (): void => {
    const _value = [...(getValues()?.count ?? counterList), {adult: 1, child: 0, childAge: []}]
    onChange(_value)
  }
  useEffect(() => {
    // Scroll to the last added room
    if (roomContainerRef.current) {
      roomContainerRef.current.scrollTop = roomContainerRef.current.scrollHeight
    }
  }, [counterList])

  const handleRemoveRoom = (index: number): void => {
    const _value = [...(getValues()?.count ?? counterList)].filter((_, itemIndex) => itemIndex !== index)
    onChange(_value)
  }

  return (
    <Stack>
      <Stack mt={2} overflow="overlay" maxHeight={425} ref={roomContainerRef}>
        {compact(counterList).map(({adult, child}, index) => (
          <Stack flexDirection="column" width="100%" gap={3} mb={2}>
            <Stack px={2} flexDirection="column" width="100%" gap={3}>
              <Stack flexDirection="row" width="100%" alignItems={'center'} justifyContent={'space-between'}>
                <Typography>
                  <Trans>room {convertToPersianLetter(index + 1)}</Trans>
                </Typography>
                {counterList.length > 1 && (
                  <IconButton size="small" sx={{padding: 0}} onClick={() => handleRemoveRoom(index)}>
                    <DeleteIcon width={24} height={24} />
                  </IconButton>
                )}
              </Stack>
              <PassengerCounter
                value={adult}
                onChange={(name, count) => handleChange(`${index}.${name}`, count)}
                name="adult"
                title={t`Adult passenger`}
                disabled={adult >= 6}
                index={index}
              />
              <Divider />
              <PassengerCounter
                value={child}
                onChange={(name, count) => handleChange(`${index}.${name}`, count)}
                name="child"
                title={t`Child passenger`}
                disabled={child >= 4}
                index={index}
                withAge
              />
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
      <Button
        variant="text"
        onClick={handleAddRoom}
        sx={{width: 'fit-content', padding: 2}}
        fullWidth={false}
        disabled={counterList.length >= maxRoom}
      >
        <Plus /> <Trans>add room</Trans>
      </Button>
    </Stack>
  )
}

export default HotelRoomCounter
