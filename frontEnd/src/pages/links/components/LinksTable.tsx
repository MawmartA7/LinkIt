import { TableHeader } from './TableHeader'
import {
  TableContainer,
  LinearProgress,
  TableFooter,
  IconButton,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Table,
  Icon,
  Box
} from '@mui/material'

type TSortDirection = 'asc' | 'desc'

type TSortableColumns = 'clicks' | 'expiredAt'

interface IRow {
  originalDomain: string
  shortenedUrl: string
  alias: string
  clicks: number
  expiredAt: number
  expiredAtFormated?: string
}

interface ILinksTableProps {
  rows: IRow[] | undefined
  order: TSortDirection
  orderBy: TSortableColumns
  onRequestSort: (property: TSortableColumns) => void
  onClearSort: () => void
  pagination?: React.ReactNode
  isLoading: boolean
}

export const LinksTable: React.FC<ILinksTableProps> = ({
  rows,
  order,
  orderBy,
  onRequestSort,
  onClearSort,
  pagination,
  isLoading
}) => {
  const createSortHandler = (property: TSortableColumns) => {
    onRequestSort(property)
  }

  return (
    <TableContainer
      component={Paper}
      sx={theme => ({
        height: 'auto',
        width: '80%',
        position: 'absolute',
        top: 'calc(50% - 25%)',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        [theme.breakpoints.down('lg')]: {
          width: '90%'
        }
      })}
    >
      <Table stickyHeader>
        <TableHead>
          <TableHeader
            orderBy={orderBy}
            order={order}
            onRequestSort={createSortHandler}
          />
        </TableHead>
        <TableBody>
          {rows?.map(row => (
            <TableRow>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Box
                  sx={theme => ({
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                    [theme.breakpoints.down('lg')]: {
                      gap: 1
                    }
                  })}
                >
                  <Avatar
                    src={`https://api.faviconkit.com/${row.originalDomain}/128`}
                    sx={theme => ({
                      [theme.breakpoints.down('lg')]: {
                        width: 24,
                        height: 24
                      }
                    })}
                  />
                  <Typography
                    variant="body1"
                    sx={theme => ({
                      [theme.breakpoints.down('lg')]: {
                        fontSize: '0.875rem',
                        maxWidth: '250px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    })}
                  >
                    {row.shortenedUrl}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default,
                  [theme.breakpoints.down('lg')]: {
                    padding: 1
                  }
                })}
              >
                <Typography
                  variant="body1"
                  sx={theme => ({
                    [theme.breakpoints.down('lg')]: {
                      fontSize: '0.875rem'
                    }
                  })}
                >
                  {row.clicks}
                </Typography>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Typography
                  variant="body1"
                  sx={theme => ({
                    [theme.breakpoints.down('lg')]: {
                      fontSize: '0.875rem'
                    }
                  })}
                >
                  {row.expiredAtFormated}
                </Typography>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Typography
                  variant="body1"
                  sx={theme => ({
                    [theme.breakpoints.down('lg')]: {
                      fontSize: '0.875rem'
                    }
                  })}
                >
                  {row.alias}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                borderBottom: 'none'
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                position="relative"
                sx={theme => ({
                  [theme.breakpoints.down('lg')]: {
                    alignItems: 'center'
                  }
                })}
              >
                {isLoading && (
                  <LinearProgress
                    sx={{ width: '70%', height: 4, borderRadius: 10 }}
                    variant="indeterminate"
                    color="primary"
                  />
                )}
                {!isLoading && (
                  <>
                    {pagination && pagination}

                    {!(orderBy === 'expiredAt' && order === 'desc') && (
                      <IconButton
                        onClick={onClearSort}
                        sx={{ position: 'absolute', right: 0 }}
                      >
                        <Icon fontSize="medium" sx={{ color: '#bbbbbb' }}>
                          filter_alt_off
                        </Icon>
                      </IconButton>
                    )}
                  </>
                )}
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
