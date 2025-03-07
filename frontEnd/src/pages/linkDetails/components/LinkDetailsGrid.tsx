import { TextLink } from '../../../shared/components'
import { ILinkDetails } from '../LinkDetails'
import {
  Grid2 as Grid,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Icon,
  Box
} from '@mui/material'

interface ILinkdetailsGridProps {
  linkDetails?: ILinkDetails
  alias?: string
  isDownMd: boolean
}

export const LinkDetailsGrid: React.FC<ILinkdetailsGridProps> = ({
  linkDetails,
  alias,
  isDownMd
}) => {
  return (
    <Grid container spacing={2} rowSpacing={4} mb={4}>
      <Grid size={{ xs: 2, sm: 1, md: 12 }} order={0}>
        <TextLink
          color="primary"
          href="/links"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            height: '100%'
          }}
        >
          <Icon fontSize={!isDownMd ? 'small' : 'large'}>arrow_back</Icon>
          {!isDownMd && 'My links'}
        </TextLink>
        <Divider
          sx={theme => ({
            bgcolor: theme.palette.background.default,
            borderRadius: 1,
            mt: 1,
            mb: -2,
            [theme.breakpoints.down('md')]: {
              display: 'none'
            }
          })}
        />
      </Grid>
      <Grid size={{ xs: 2, sm: 1 }} order={{ xs: 3, md: 2 }}>
        <Box>
          {linkDetails && (
            <Avatar
              sx={theme => ({
                width: 128,
                height: 128,
                [theme.breakpoints.down('lg')]: {
                  width: 64,
                  height: 64
                }
              })}
              src={`https://api.faviconkit.com/${linkDetails.originalDomain}/128`}
            />
          )}
        </Box>
      </Grid>
      <Grid
        size={{ xs: 8, sm: 10 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        order={{ xs: 2, md: 3 }}
      >
        <Typography
          variant="h4"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.5rem'
            }
          })}
        >
          {alias}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} order={4}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Original url:
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={theme => ({
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              [theme.breakpoints.down('lg')]: {
                fontSize: '0.9rem'
              }
            })}
          >
            {linkDetails?.originalUrl}
          </Typography>
          {linkDetails && (
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(linkDetails.originalUrl)
              }}
            >
              <Icon fontSize="small" color="primary">
                content_copy
              </Icon>
            </IconButton>
          )}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }} order={5}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Link:
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            sx={theme => ({
              [theme.breakpoints.down('lg')]: {
                fontSize: '0.9rem'
              }
            })}
          >
            {linkDetails?.shortenedUrl}
          </Typography>
          {linkDetails && (
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(linkDetails.shortenedUrl)
              }}
            >
              <Icon fontSize="small" color="primary">
                content_copy
              </Icon>
            </IconButton>
          )}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} order={6}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Expired at:
        </Typography>
        <Typography
          variant="body1"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.9rem'
            }
          })}
        >
          {linkDetails?.expiredDate}
        </Typography>
      </Grid>
      <Grid size={{ xs: 6, md: 1.5 }} order={7}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Status:
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="body1"
            sx={theme => ({
              [theme.breakpoints.down('lg')]: {
                fontSize: '0.9rem'
              }
            })}
          >
            {linkDetails?.status}
          </Typography>
          <Box
            sx={theme => ({
              bgcolor:
                linkDetails?.status === 'available'
                  ? theme.palette.success.main
                  : theme.palette.warning.main,
              width: 15,
              height: 15,
              borderRadius: '50%'
            })}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 6, md: 1.5 }} order={8}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Clicks:
        </Typography>
        <Typography
          variant="body1"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.9rem'
            }
          })}
        >
          {linkDetails?.clicks}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} order={9}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Last accessed at:
        </Typography>
        <Typography
          variant="body1"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.9rem'
            }
          })}
        >
          {linkDetails?.lastAccessDate}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} order={10}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Created at:
        </Typography>
        <Typography
          variant="body1"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.9rem'
            }
          })}
        >
          {linkDetails?.createdDate}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }} order={11}>
        <Typography
          variant="h5"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '1.25rem'
            }
          })}
        >
          Status modified at:
        </Typography>
        <Typography
          variant="body1"
          sx={theme => ({
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.9rem'
            }
          })}
        >
          {linkDetails?.statusModifiedDate}
        </Typography>
      </Grid>
    </Grid>
  )
}
