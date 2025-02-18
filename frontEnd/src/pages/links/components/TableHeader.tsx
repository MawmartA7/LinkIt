import { TableSortLabel, Typography, TableCell, TableRow } from '@mui/material'

type TSortDirection = 'asc' | 'desc'
type TSortableColumns = 'clicks' | 'expiredAt'

interface Props {
  orderBy: TSortableColumns
  order: TSortDirection
  onRequestSort: (property: TSortableColumns) => void
}

export const TableHeader = ({ orderBy, order, onRequestSort }: Props) => {
  const createSortHandler = (property: TSortableColumns) => {
    onRequestSort(property)
  }

  return (
    <TableRow>
      <TableCell
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          borderBottomColor: theme.palette.background.default
        })}
      >
        <Typography variant="body1" fontWeight={500}>
          Short links
        </Typography>
      </TableCell>
      <TableCell
        sortDirection={orderBy === 'clicks' ? order : false}
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          borderBottomColor: theme.palette.background.default
        })}
      >
        <TableSortLabel
          active={orderBy === 'clicks'}
          direction={orderBy === 'clicks' ? order : 'asc'}
          onClick={() => createSortHandler('clicks')}
          sx={{
            '& .MuiTableSortLabel-icon': {
              color: '#bbb !important'
            }
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            Clicks
          </Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell
        sortDirection={orderBy === 'expiredAt' ? order : false}
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          borderBottomColor: theme.palette.background.default
        })}
      >
        <TableSortLabel
          active={orderBy === 'expiredAt'}
          direction={orderBy === 'expiredAt' ? order : 'asc'}
          onClick={() => createSortHandler('expiredAt')}
          sx={{
            '& .MuiTableSortLabel-icon': {
              color: '#bbb !important'
            }
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            Expiration
          </Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          borderBottomColor: theme.palette.background.default
        })}
      >
        <Typography variant="body1" fontWeight={500}>
          Alias
        </Typography>
      </TableCell>
    </TableRow>
  )
}
