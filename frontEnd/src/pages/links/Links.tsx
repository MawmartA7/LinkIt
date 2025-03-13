import { useCallback, useEffect, useMemo, useState } from 'react'
import { LinksList, LinksPagination, LinksTable, SearchBar } from './components'
import { ShortenService } from '../../shared/services/ShortenService'
import { formatTimeRemaining } from '../../shared/utils/formatTime'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Environment } from '../../shared/environment'
import { useDebounce } from '../../shared/hooks'
import {
  useMediaQuery,
  IconButton,
  Button,
  Theme,
  Paper,
  Icon,
  Box
} from '@mui/material'
import { Menu } from '../../shared/components'

type TSortDirection = 'asc' | 'desc'

type TSortableColumns = 'clicks' | 'expiredAt'

export type TExpirationFilter = 'all' | 'expired' | 'active'

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

export const Links = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState<IRow[]>()
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<TSortDirection>('desc')
  const [orderBy, setOrderBy] = useState<TSortableColumns>('expiredAt')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [expirationFilter, setExpirationFilter] =
    useState<TExpirationFilter>('all')
  const { debounce } = useDebounce(500)

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

  const getRows = useCallback(async () => {
    const response = await ShortenService.getAll(
      search,
      page - 1,
      ROWS_PER_PAGE,
      orderBy,
      order,
      expirationFilter
    )

    if (response instanceof Error) {
      setIsLoading(false)
      console.error(response.message)

      return
    }

    setTotalCount(response.totalCount)

    const rows = response.shorteneds.map(row => {
      const formattedRow = { ...row } as IRow
      formattedRow.expiredAtFormated = formatTimeRemaining(
        formattedRow.expiredAt
      )
      return formattedRow
    })

    setRows(rows)
    setIsLoading(false)
  }, [ROWS_PER_PAGE, expirationFilter, order, orderBy, page, search])

  useEffect(() => {
    setIsLoading(true)
    getRows()
  }, [ROWS_PER_PAGE, expirationFilter, order, orderBy, page])

  useEffect(() => {
    setIsLoading(true)
    debounce(getRows)
  }, [debounce, search])

  return (
    <>
      <Paper
        sx={theme => ({
          bgcolor: theme.palette.background.paper,
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: 'none',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          position: 'absolute',
          top: 'calc(50% - 25% - 64px)',
          padding: 1,
          [theme.breakpoints.down('lg')]: {
            width: '90%'
          },
          [theme.breakpoints.down('md')]: {
            borderRadius: 0,
            width: '100%',
            top: 90,
            flexDirection: 'column',
            alignItems: 'center'
          }
        })}
      >
        <Box
          sx={theme => ({
            display: 'flex',
            gap: 2,
            [theme.breakpoints.down('md')]: {
              px: 2,
              width: '100%',
              justifyContent: 'space-between'
            }
          })}
        >
          <Button
            onClick={() => navigate('/')}
            sx={theme => ({
              textTransform: 'none',
              gap: 1,
              [theme.breakpoints.down('sm')]: {}
            })}
          >
            <Icon fontSize="large">add</Icon>
            Add
          </Button>
          {useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) && (
            <>
              <IconButton
                onClick={e => {
                  setAnchorEl(e.currentTarget)
                }}
              >
                <Icon sx={{ color: '#bbb' }}>filter_list</Icon>
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
            </>
          )}
        </Box>
        <Box display="flex" width="100%" justifyContent="flex-end">
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
      </Paper>
      {useMediaQuery((theme: Theme) => theme.breakpoints.up('md')) ? (
        <LinksTable
          rows={rows}
          search={search}
          order={order}
          orderBy={orderBy}
          expirationFilter={expirationFilter}
          setExpirationFilter={filter => setExpirationFilter(filter)}
          onRequestSort={handleRequestSort}
          onClearSort={() => {
            setOrder('desc')
            setOrderBy('expiredAt')
            setExpirationFilter('all')
          }}
          isLoading={isLoading}
          pagination={
            <LinksPagination
              page={page}
              totalCount={totalCount}
              onChange={newPage =>
                setSearchParams(
                  { search, page: newPage.toString() },
                  { replace: true }
                )
              }
            />
          }
        />
      ) : (
        <LinksList
          rows={rows}
          search={search}
          isLoading={isLoading}
          pagination={
            <LinksPagination
              page={page}
              totalCount={totalCount}
              showFirstAndLastButton={false}
              onChange={newPage =>
                setSearchParams(
                  { search, page: newPage.toString() },
                  { replace: true }
                )
              }
            />
          }
        />
      )}
    </>
  )
}
