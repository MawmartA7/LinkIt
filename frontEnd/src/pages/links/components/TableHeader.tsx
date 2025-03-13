import { useState } from 'react'
import { Menu } from '../../../shared/components'
import { TExpirationFilter } from '../Links'
import {
  TableSortLabel,
  IconButton,
  Typography,
  TableCell,
  TableRow,
  Icon
} from '@mui/material'

type TSortDirection = 'asc' | 'desc'
type TSortableColumns = 'clicks' | 'expiredAt'

interface Props {
  orderBy: TSortableColumns
  order: TSortDirection
  expirationFilter: TExpirationFilter
  setExpirationFilter: (filter: TExpirationFilter) => void
  onRequestSort: (property: TSortableColumns) => void
}

export const TableHeader = ({
  orderBy,
  order,
  expirationFilter,
  setExpirationFilter,
  onRequestSort
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
          'bgcolor': theme.palette.background.paper,
          'borderBottomColor': theme.palette.background.default,
          'display': 'flex',
          'justifyContent': 'space-between',
          '&:hover button': {
            opacity: !anchorEl && expirationFilter === 'all' ? 0.5 : 1
          }
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
        <IconButton
          onClick={e => setAnchorEl(e.currentTarget)}
          sx={{
            opacity: !anchorEl && expirationFilter === 'all' ? 0 : 1,
            transition: 'opacity 200ms ease-in-out'
          }}
          size="small"
        >
          <Icon sx={{ color: '#bbb' }}>more_vert</Icon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          setAnchorEl={value => setAnchorEl(value)}
          currentOption={expirationFilter}
          options={['all', 'active', 'expired']}
          onSelectOption={(option: TExpirationFilter) => {
            setExpirationFilter(option)
          }}
        />
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
