import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Environment } from '../../shared/environment'
import { TableHeader } from './components/TableHeader'
import { SearchBar } from './components/SearchBar'
import { useDebounce } from '../../shared/hooks'
import { formatTimeRemaining } from './utils/formatTime'
import {
  TableContainer,
  LinearProgress,
  TableFooter,
  IconButton,
  Typography,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Paper,
  Table,
  Icon,
  Box
} from '@mui/material'

type TSortDirection = 'asc' | 'desc'

type TSortableColumns = 'clicks' | 'expiredAt'

interface ILink {
  originalDomain: string
  shortenedUrl: string
  alias: string
  clicks: number
  expiredAt: number
}

interface IRow extends ILink {
  expiredAtFormated?: string
}

const data: ILink[] = [
  {
    originalDomain: 'discord.com',
    shortenedUrl: 'https://lnkit.onrender.com/LINK-ORIGINAL',
    alias: 'Link of discord',
    clicks: 1442,
    expiredAt: 1739987888000
  },
  {
    originalDomain: 'github.com',
    shortenedUrl: 'https://lnkit.onrender.com/uIrF4',
    alias: 'LinkIt repository',
    clicks: 23,
    expiredAt: 1740074288000
  },
  {
    originalDomain: 'figma.com',
    shortenedUrl: 'https://lnkit.onrender.com/figma',
    alias: 'LinkIt figma',
    clicks: 53,
    expiredAt: 1740182452000
  },
  {
    originalDomain: 'chatgpt.com',
    shortenedUrl: 'https://lnkit.onrender.com/3aY7m',
    alias: 'gpt conversation',
    clicks: 312,
    expiredAt: 1740074288000
  },
  {
    originalDomain: 'sa-east-1.signin.aws.amazon.com',
    shortenedUrl: 'https://lnkit.onrender.com/h5Gc1',
    alias: 'AWS',
    clicks: 6,
    expiredAt: 1740096052000
  },
  {
    originalDomain: 'mui.com',
    shortenedUrl: 'https://lnkit.onrender.com/material-ui',
    alias: 'material ui',
    clicks: 0,
    expiredAt: 1740087172000
  },
  {
    originalDomain: 'hub.docker.com',
    shortenedUrl: 'https://lnkit.onrender.com/nginx-image',
    alias: 'Image nginx',
    clicks: 12,
    expiredAt: 1739914372000
  },
  {
    originalDomain: 'web.whatsapp.com',
    shortenedUrl: 'https://lnkit.onrender.com/soft-group',
    alias: 'Dev group whatzapp',
    clicks: 233,
    expiredAt: 1740224522000
  },
  {
    originalDomain: 'youtube.com',
    shortenedUrl: 'https://lnkit.onrender.com/music',
    alias: 'Rock 70s 80s 90s Music',
    clicks: 4296,
    expiredAt: 1739970723000
  }
]

export const Links = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState<IRow[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<TSortDirection>('desc')
  const [orderBy, setOrderBy] = useState<TSortableColumns>('expiredAt')
  const { debounce } = useDebounce(1000)

  const ROWS_PER_PAGE = Number(Environment.ROWS_PER_PAGE)

  const handleRequestSort = (property: TSortableColumns) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page')) || 1
  }, [searchParams])

  const getRows = useCallback(() => {
    if (order === 'asc') {
      setRows(
        [...data]
          .filter(link => link.alias.includes(search))
          .sort((a, b) => a[orderBy] - b[orderBy])
          .slice(
            ROWS_PER_PAGE * (page - 1),
            ROWS_PER_PAGE * (page - 1) + ROWS_PER_PAGE
          )
      )
    } else {
      setRows(
        [...data]
          .filter(link => link.alias.includes(search))
          .sort((a, b) => b[orderBy] - a[orderBy])
          .slice(
            ROWS_PER_PAGE * (page - 1),
            ROWS_PER_PAGE * (page - 1) + ROWS_PER_PAGE
          )
      )
    }

    setRows(oldRows => {
      oldRows?.forEach(oldRow => {
        formatTimeRemaining(oldRow)
      })
      return oldRows
    })
  }, [ROWS_PER_PAGE, order, orderBy, page, search])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      getRows()

      setIsLoading(false)
    }, 1000)
  }, [ROWS_PER_PAGE, getRows, order, orderBy, page])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      debounce(getRows)

      setIsLoading(false)
    }, 1000)
  }, [debounce, getRows, search])

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 'auto',
        width: '70%',
        position: 'absolute',
        top: 'calc(50% - 25%)'
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={5}
              sx={theme => ({
                bgcolor: theme.palette.background.paper,
                borderBottom: 'none'
              })}
            >
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none', gap: 1 }}
                >
                  <Icon fontSize="large">add</Icon>
                  Add
                </Button>
                <SearchBar
                  search={search}
                  onSearchChange={value =>
                    setSearchParams(
                      { search: value, page: `${page}` },
                      { replace: true }
                    )
                  }
                />
              </Box>
            </TableCell>
          </TableRow>
          <TableHeader
            orderBy={orderBy}
            order={order}
            onRequestSort={handleRequestSort}
          />
        </TableHead>
        <TableBody>
          {rows?.map(row => (
            <TableRow>
              <TableCell
                sx={theme => ({
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Avatar
                  src={`https://api.faviconkit.com/${row.originalDomain}/128`}
                />
                <Typography variant="body1">{row.shortenedUrl}</Typography>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Typography variant="body1">{row.clicks}</Typography>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Typography variant="body1">{row.expiredAtFormated}</Typography>
              </TableCell>
              <TableCell
                sx={theme => ({
                  borderBottomColor: theme.palette.background.default
                })}
              >
                <Typography variant="body1">{row.alias}</Typography>
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
              <Box display="flex" justifyContent="center" position="relative">
                {isLoading && (
                  <LinearProgress
                    sx={{ width: '70%', height: 4, borderRadius: 10 }}
                    variant="indeterminate"
                    color="primary"
                  />
                )}
                {!isLoading && (
                  <>
                    <Pagination
                      page={page}
                      onChange={(_, newPage) =>
                        setSearchParams(
                          { search, page: newPage.toString() },
                          { replace: true }
                        )
                      }
                      count={Math.ceil(data.length / ROWS_PER_PAGE)}
                      showFirstButton
                      showLastButton
                      color="primary"
                      sx={theme => ({
                        '& .MuiPaginationItem-root': {
                          color: theme.palette.primary.contrastText
                        }
                      })}
                    />
                    {!(orderBy === 'expiredAt' && order === 'desc') && (
                      <IconButton
                        onClick={() => {
                          setOrder('desc')
                          setOrderBy('expiredAt')
                        }}
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
