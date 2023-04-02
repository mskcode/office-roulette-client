import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button } from '@mui/material'

function RefreshDrawTableButton(): JSX.Element {
  const onRefreshDrawTableClick = () => {
    // TODO implement me
    alert('Refresh feature not implemented')
  }
  return (
    <Button variant='contained' onClick={onRefreshDrawTableClick}><RefreshIcon /></Button>
  )
}

function DrawTable(): JSX.Element {
  return (
    <div>
    </div>
  )
}

function OpenAddDrawModalButton(): JSX.Element {
  return (
    <Button variant="contained"><AddIcon />Add Draw</Button>
  )
}

export default function DrawView(): JSX.Element {
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
          width: '50%',
        }}>
          <OpenAddDrawModalButton />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'right',
          width: '50%',
        }}>
          <RefreshDrawTableButton />
        </Box>
      </Box>

      <Box>
        <DrawTable />
      </Box>
    </Box>
  )
}
