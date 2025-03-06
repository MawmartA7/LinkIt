import { useCallback, useEffect, useMemo, useState } from 'react'
import { LinksList, LinksPagination, LinksTable, SearchBar } from './components'
import { Button, Paper, Icon, useMediaQuery, Theme } from '@mui/material'
import { ShortenService } from '../../shared/services/ShortenService'
import { formatTimeRemaining } from '../../shared/utils/formatTime'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Environment } from '../../shared/environment'
import { useDebounce } from '../../shared/hooks'

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

export const Links = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState<IRow[]>()
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<TSortDirection>('desc')
  const [orderBy, setOrderBy] = useState<TSortableColumns>('expiredAt')
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
      order
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
  }, [ROWS_PER_PAGE, order, orderBy, page, search])

  useEffect(() => {
    setIsLoading(true)
    getRows()
  }, [ROWS_PER_PAGE, order, orderBy, page])

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
            top: 90
          },
          [theme.breakpoints.down(400)]: {
            borderRadius: 0,
            width: '100%',
            top: 90,
            flexDirection: 'column',
            alignItems: 'center'
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
        <SearchBar
          search={search}
          onSearchChange={value =>
            setSearchParams(
              { search: value, page: `${page}` },
              { replace: true }
            )
          }
        />
      </Paper>
      {useMediaQuery((theme: Theme) => theme.breakpoints.up('md')) ? (
        <LinksTable
          rows={rows}
          search={search}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          onClearSort={() => {
            setOrder('desc')
            setOrderBy('expiredAt')
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
