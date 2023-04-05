import { Box, Tab, Tabs } from '@mui/material'
import * as React from 'react'
import DrawView from './DrawView'
import EmployeeView from './EmployeeView'

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/*
          FIXME I don't know if using Typography as a parent component has any
            real merit
          <Typography component="div">{children}</Typography>
          */}
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number): {[key: string]: string, } {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


export default function MainView(): JSX.Element {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="tab-view">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="">
          <Tab label="Employees" {...a11yProps(0)} />
          <Tab label="Draws" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EmployeeView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DrawView />
      </TabPanel>
    </div>
  )
}
