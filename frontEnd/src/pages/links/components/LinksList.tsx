import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LinearProgress,
  ListItemAvatar,
  ListItemButton,
  useMediaQuery,
  ListItemText,
  Typography,
  Collapse,
  ListItem,
  Avatar,
  Button,
  Theme,
  Icon,
  List,
  Box
} from '@mui/material'

interface IRow {
  originalDomain: string
  shortenedUrl: string
  alias: string
  clicks: number
  expiredAt: number
  expiredAtFormated?: string
}

interface LinksListProps {
  rows: IRow[] | undefined
  search: string
  pagination?: React.ReactNode
  isLoading: boolean
}

export const LinksList: React.FC<LinksListProps> = ({
  rows,
  search,
  pagination,
  isLoading
}) => {
  const [linkOpen, setLinkOpen] = useState('')

  const navigate = useNavigate()

  const isDown400Px = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(400)
  )

  return (
    <List
      sx={theme => ({
        width: '100%',
        height: 'calc(100dvh - 90px - 64px)',
        py: 0,
        pb: 6,
        position: 'absolute',
        top: 90 + 64,
        bgcolor: 'background.paper',
        borderTop: '1px solid ' + theme.palette.background.default,
        overflow: 'auto',
        [theme.breakpoints.down(400)]: {
          height: 'calc(100dvh - 90px - 104px)',
          top: 90 + 104
        }
      })}
    >
      {!isLoading && rows?.length === 0 && (
        <ListItem
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography
            variant="h6"
            sx={theme => ({
              textAlign: 'center',
              color: '#bbbbbb',
              [theme.breakpoints.down(400)]: {
                fontSize: '1rem'
              }
            })}
          >
            No links found
            {search.length > 0 ? (
              <>
                {' '}
                with this search:
                <Typography
                  variant="h6"
                  sx={theme => ({
                    textAlign: 'center',
                    color: '#bbbbbb',
                    [theme.breakpoints.down(400)]: {
                      fontSize: '1rem'
                    }
                  })}
                >
                  "{search}"
                </Typography>
              </>
            ) : (
              <>
                !{' '}
                <Typography
                  variant="h6"
                  sx={theme => ({
                    textAlign: 'center',
                    color: '#bbbbbb',
                    mb: 1,
                    [theme.breakpoints.down(400)]: {
                      fontSize: '1rem',
                      mb: 2
                    }
                  })}
                >
                  It looks like you haven't added any links here yet. How about
                  getting started now?
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={theme => ({
                    textTransform: 'none',
                    gap: 1,
                    [theme.breakpoints.down(400)]: {
                      fontSize: '0.75rem'
                    }
                  })}
                >
                  <Icon fontSize={isDown400Px ? 'medium' : 'large'}>add</Icon>
                  Create a link
                </Button>
              </>
            )}
          </Typography>
        </ListItem>
      )}
      {rows?.map((row, index) => (
        <>
          <ListItemButton
            key={index}
            onClick={() => {
              if (linkOpen === row.alias) {
                setLinkOpen('')
              } else {
                setLinkOpen(row.alias)
              }
            }}
            sx={theme => ({
              bgcolor: theme.palette.background.paper,
              borderBottom: '1px solid ' + theme.palette.background.default
            })}
          >
            <ListItemAvatar sx={{ minWidth: 24, mr: 1 }}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={`https://api.faviconkit.com/${row.originalDomain}/128`}
              />
            </ListItemAvatar>
            <ListItemText>{row.alias}</ListItemText>
            <Icon sx={{ color: '#bbbbbb' }}>
              {linkOpen === row.alias ? 'expand_less' : 'expand_more'}
            </Icon>
          </ListItemButton>
          <Collapse
            in={linkOpen === row.alias}
            timeout="auto"
            sx={theme => ({
              p: linkOpen === row.alias ? 1 : 0,
              borderBottom: '1px solid ' + theme.palette.background.default,
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            })}
          >
            <Typography fontWeight={600}>Short link:</Typography>
            <Typography>{row.shortenedUrl}</Typography>
            <Typography fontWeight={600} mt={1}>
              Total clicks:
            </Typography>
            <Typography>{row.clicks}</Typography>
            <Typography fontWeight={600} mt={1}>
              Expiration:
            </Typography>
            <Typography>{row.expiredAtFormated}</Typography>
            <Box
              mt={1}
              display="flex"
              justifyContent="center"
              onClick={() => navigate('/link-details/' + row.alias)}
            >
              <Button variant="contained">View more</Button>
            </Box>
          </Collapse>
        </>
      ))}

      <ListItem
        sx={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'background.paper'
        }}
      >
        {!isLoading && pagination && pagination}
        {isLoading && (
          <LinearProgress
            sx={{ width: '70%', mb: 2, height: 4, borderRadius: 10 }}
            variant="indeterminate"
            color="primary"
          />
        )}
      </ListItem>
    </List>
  )
}
