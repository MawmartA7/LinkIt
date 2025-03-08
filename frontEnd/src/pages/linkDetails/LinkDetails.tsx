import { useCallback, useEffect, useState } from 'react'
import { formatDate } from '../../shared/utils/formatTime'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingPage } from '../loadingPage/LoadingPage'
import {
  IShortenedDetails,
  ShortenService,
  TShortenStatus
} from '../../shared/services/ShortenService'
import {
  useMediaQuery,
  Typography,
  Divider,
  Paper,
  Theme,
  Box
} from '@mui/material'
import {
  AliasConfirmationModal,
  LinkDetailsControl,
  LinkDetailsGrid
} from './components'

type TParams = {
  alias: string
}

export type TToolTips = 'Enable' | 'Disable' | 'Delete'

export interface ILinkDetails extends IShortenedDetails {
  originalDomain: string
  expiredDate: string
  createdDate: string
  lastAccessDate: string
  statusModifiedDate: string
}

interface IConfirmation {
  open: boolean
  action: 'delete' | 'disable'
}

export const LinkDetails = () => {
  const { alias } = useParams<TParams>()
  const [linkDetails, setLinkDetails] = useState<ILinkDetails>()
  const [tooltipOpen, setTooltipOpen] = useState<TToolTips>()
  const [confirmation, setConfirmation] = useState<IConfirmation>({
    open: false,
    action: 'disable'
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const isDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const formatGetResult = useCallback((data: IShortenedDetails) => {
    const formatted = { ...data } as ILinkDetails

    formatted.createdDate = formatDate(formatted.createdAt)

    formatted.lastAccessDate = formatDate(formatted.lastAccessed)

    formatted.statusModifiedDate = formatDate(formatted.statusModifiedAt)

    formatted.expiredDate = formatDate(formatted.expiredAt)

    formatted.originalDomain = new URL(formatted.originalUrl).host
    return formatted
  }, [])

  const getLinkDetails = useCallback(async () => {
    if (alias) {
      const result = await ShortenService.getByAlias(alias)

      if (result instanceof Error) {
        console.error(result)

        return null
      }
      const formated = formatGetResult(result)
      setLinkDetails(formated)
    }
  }, [alias, formatGetResult])

  useEffect(() => {
    getLinkDetails()
  }, [alias, getLinkDetails])

  const openTooltip = useCallback(
    (tooltip?: TToolTips) => setTooltipOpen(tooltip),
    []
  )

  const changeStatus = async (newStatus: Omit<TShortenStatus, 'expired'>) => {
    if (!alias || !linkDetails) return

    const result = await ShortenService.changeStatusByAlias(alias, newStatus)

    if (result instanceof Error) {
      console.error(result)
    }

    if (result === 'success') {
      setLinkDetails({ ...linkDetails, status: newStatus as TShortenStatus })
    }
  }

  const deleteLink = async () => {
    if (!alias || !linkDetails) return

    const result = await ShortenService.deleteByAlias(alias)

    if (result instanceof Error) {
      console.error(result)
    }

    if (result === 'success') {
      navigate('/links')
    }
  }

  if (!linkDetails) {
    return <LoadingPage />
  }
  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        minHeight: 'calc(100% - 90px)',
        position: 'absolute',
        top: 90,
        borderRadius: 0,
        px: { xs: 2, sm: 5 },
        pr: { xs: 5 },
        py: 2
      }}
    >
      <LinkDetailsGrid
        linkDetails={linkDetails}
        alias={alias && alias}
        isDownMd={isDownMd}
      />

      <LinkDetailsControl
        title="Enable link"
        description="Enable the shortened url after it has been expired or disabled."
        action="Enable"
        tooltipOpen={tooltipOpen}
        openTooltip={openTooltip}
        onClickInButton={() => changeStatus('available')}
        isDownMd={isDownMd}
        disabled={linkDetails?.status === 'available'}
      />
      <Typography variant="h5" fontWeight={600} sx={{ color: '#FF4A4A' }}>
        Danger zone
      </Typography>
      <Box
        sx={{
          border: '2px solid #FF4A4A',
          borderRadius: 2.25,
          p: 1.25
        }}
      >
        <LinkDetailsControl
          title="Disable link"
          description="Disable the shortened url, to cut the link without deleting it."
          action="Disable"
          withBorder={false}
          buttonColor="#FF4A4A"
          tooltipOpen={tooltipOpen}
          openTooltip={openTooltip}
          onClickInButton={() => {
            setConfirmation({ open: true, action: 'disable' })
          }}
          disabled={linkDetails?.status !== 'available'}
          isDownMd={isDownMd}
        />
        <Divider
          sx={theme => ({
            bgcolor: theme.palette.background.default,
            height: 2,
            borderRadius: 1,
            my: 1
          })}
        />
        <LinkDetailsControl
          title="Delete link"
          description="Delete the shortened url. Is irreversible."
          action="Delete"
          withBorder={false}
          buttonColor="#FF4A4A"
          tooltipOpen={tooltipOpen}
          onClickInButton={() => {
            setConfirmation({ open: true, action: 'delete' })
          }}
          openTooltip={openTooltip}
          disabled={false}
          isDownMd={isDownMd}
        />
      </Box>
      {linkDetails && alias && (
        <AliasConfirmationModal
          open={confirmation.open}
          action={confirmation.action}
          alias={alias}
          onConfirm={() => {
            setIsLoading(true)
            if (confirmation.action === 'disable') {
              setConfirmation({ open: false, action: 'disable' })
              changeStatus('disabled')
            } else {
              setConfirmation({ open: false, action: 'delete' })
              deleteLink()
            }
            setIsLoading(false)
          }}
          onClose={() =>
            setConfirmation(oldConfirmation => ({
              ...oldConfirmation,
              open: false
            }))
          }
          isLoading={isLoading}
        />
      )}
    </Box>
  )
}
