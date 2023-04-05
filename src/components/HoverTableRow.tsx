import { TableRow } from '@mui/material'
import { styled } from '@mui/system'

export const HoverTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}))
