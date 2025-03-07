import { useCallback, useEffect, useState } from 'react'
import { LinkDetailsControl } from './components/LinkDetailsConfig'
import { LinkDetailsGrid } from './components/LinkDetailsGrid'
import { formatDate } from '../../shared/utils/formatTime'
import { useParams } from 'react-router-dom'
import {
  IShortenedDetails,
  ShortenService
} from '../../shared/services/ShortenService'
import {
  useMediaQuery,
  Typography,
  Divider,
  Paper,
  Theme,
  Box
} from '@mui/material'

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

export const LinkDetails = () => {
  const { alias } = useParams<TParams>()
  const [linkDetails, setLinkDetails] = useState<ILinkDetails>()
  const [tooltipOpen, setTooltipOpen] = useState<TToolTips>()

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
          openTooltip={openTooltip}
          disabled={false}
          isDownMd={isDownMd}
        />
      </Box>
    </Box>
  )
}
