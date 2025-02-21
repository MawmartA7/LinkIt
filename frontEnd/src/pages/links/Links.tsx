import { useCallback, useEffect, useMemo, useState } from 'react'
import { LinksList, LinksPagination, LinksTable, SearchBar } from './components'
import { Button, Paper, Icon, useMediaQuery, Theme } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatTimeRemaining } from './utils/formatTime'
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

  const getRows = useCallback(() => {
    setTimeout(() => {
      const filteredData = [...data].filter(link => link.alias.includes(search))

      const sortedData = filteredData.sort((a, b) => {
        return order === 'asc'
          ? a[orderBy] - b[orderBy]
          : b[orderBy] - a[orderBy]
      })

      const paginatedData = sortedData.slice(
        ROWS_PER_PAGE * (page - 1),
        ROWS_PER_PAGE * (page - 1) + ROWS_PER_PAGE
      )

      setTotalCount(filteredData.length)

      const formattedData = paginatedData.map(row => {
        const formattedRow = { ...row }
        formatTimeRemaining(formattedRow)
        return formattedRow
      })

      setRows(formattedData)
      setIsLoading(false)
    }, 1000)
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
