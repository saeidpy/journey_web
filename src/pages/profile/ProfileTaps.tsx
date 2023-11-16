import {Box, Tab, Tabs} from '@mui/material'
import {ReactNode, useState} from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

type tabProps = {
  label: string
  content: ReactNode
}
type ProfileTabProps = {
  tabList: tabProps[]
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{py: 3}}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const ProfileTabs = (props: ProfileTabProps) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          {props.tabList.map((item, i) => (
            <Tab label={item.label} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </Box>
      {props.tabList.map((item, i) => (
        <TabPanel value={value} index={i} key={i}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  )
}
