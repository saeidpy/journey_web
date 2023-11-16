import {Trans} from '@lingui/macro'
import {Button, Checkbox, List, ListItem, ListItemText, Stack} from '@mui/material'
import {useState} from 'react'
import {CheckboxChecked, CheckboxUnchecked} from 'src/assets/icons'

interface SortSheetProps {
  handleToggle: (id: string) => void
  onClose: () => void
  defaultSelected: string | null
  sortList: {label: string; id: string}[]
}

// const sortList = [
//   {label: t`Fastest`, id: 'fastest'},
//   {label: t`Cheapest`, id: 'cheapest'},
//   {label: t`High Priced`, id: 'high-priced'},
//   {label: t`Latest`, id: 'latest'},
// ]

export const SortSheet = ({handleToggle, onClose, defaultSelected, sortList}: SortSheetProps) => {
  const [selectedSort, setSelectedSort] = useState(defaultSelected ?? sortList[0].id)

  const onClickSave = () => {
    handleToggle(selectedSort)
  }

  return (
    <Stack>
      <List disablePadding>
        {sortList.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`
          return (
            <ListItem key={value.id} disablePadding>
              <Checkbox
                size="medium"
                onClick={() => setSelectedSort(value.id)}
                checked={selectedSort === value.id}
                inputProps={{'aria-labelledby': labelId}}
                icon={<CheckboxUnchecked />}
                checkedIcon={<CheckboxChecked />}
              />
              <ListItemText id={value.id} primary={value.label} />
            </ListItem>
          )
        })}
      </List>
      <Stack px={1} mt={3} flexDirection={'row'} gap={2} alignItems="center">
        <Button onClick={onClickSave} variant="contained" fullWidth>
          <Trans>Save changes</Trans>
        </Button>
        <Button onClick={onClose} variant="outlined" fullWidth>
          <Trans>Cancel</Trans>
        </Button>
      </Stack>
    </Stack>
  )
}
