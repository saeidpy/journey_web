import {t} from '@lingui/macro'
import {AppBar, Stack, styled, Tab, Tabs} from '@mui/material'
import React, {Suspense, useState} from 'react'
import {CommentIcon, StayIcon} from 'src/assets/icons'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {ThingsComments} from './ThingsComments'
import {ThingsRelatedLocation} from './ThingsRelatedLocation'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const Wrapper = styled(AppBar)(({theme}) => ({
  background: theme.palette.shades[2],
  top: theme.spacing(-2),
}))
const TabsWrapper = styled(Tabs)(({theme}) => ({
  '& .Mui-selected': {
    color: theme.palette.shades[9] + ' !important',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.shades[9] + ' !important',
  },
}))
const StyleTab = styled(Tab)({
  minHeight: 60,
})

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function RelateSection() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack>
      <Wrapper position="sticky" elevation={0}>
        <TabsWrapper value={value} onChange={handleChange} variant="fullWidth">
          <StyleTab label={t`Comments`} icon={<CommentIcon />} {...a11yProps(0)} />
          <StyleTab label={t`Related location`} icon={<StayIcon />} {...a11yProps(1)} />
        </TabsWrapper>
      </Wrapper>
      <TabPanel value={value} index={0}>
        <ErrorBoundary fallback={<></>}>
          <Suspense fallback={<FullScreenLoading />}>
            <ThingsComments />
          </Suspense>
        </ErrorBoundary>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ErrorBoundary fallback={<></>}>
          <Suspense fallback={<FullScreenLoading />}>
            <ThingsRelatedLocation />
          </Suspense>
        </ErrorBoundary>
      </TabPanel>
    </Stack>
  )
}

export default RelateSection
