import { Box, Button, Icon, Tooltip, Typography } from '@mui/material'
import { TToolTips } from '../LinkDetails'

interface ILinkDetailsConfigProps {
  tooltipOpen?: TToolTips
  isDownMd: boolean
  disabled: boolean
  onClickInButton: () => void
  withBorder?: boolean
  buttonColor?: string
  openTooltip: (tooltip?: TToolTips) => void

  title: string
  description: string
  action: TToolTips
}

export const LinkDetailsControl: React.FC<ILinkDetailsConfigProps> = ({
  tooltipOpen,
  isDownMd,
  disabled,
  onClickInButton,
  withBorder = true,
  buttonColor = '#4caf50',
  openTooltip,

  title,
  description,
  action
}) => {
  return (
    <Box
      sx={theme => ({
        width: '100%',
        border: withBorder
          ? '2px solid ' + theme.palette.background.default
          : undefined,
        borderRadius: 2.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: withBorder ? 1.25 : undefined,
        mb: withBorder ? 2 : undefined
      })}
    >
      <Box>
        <Typography display="flex" gap={0.5} fontWeight={500}>
          {title}
          {isDownMd && (
            <Tooltip open={tooltipOpen === action} title={description}>
              <Icon
                fontSize="medium"
                tabIndex={0}
                onClick={() => openTooltip(action)}
                onBlur={() => openTooltip()}
                sx={{ color: '#bbbbbb', cursor: 'pointer' }}
              >
                info_outline
              </Icon>
            </Tooltip>
          )}
        </Typography>
        {!isDownMd && <Typography>{description}</Typography>}
      </Box>
      <Button
        variant="contained"
        onClick={onClickInButton}
        disabled={disabled}
        sx={theme => ({
          'bgcolor': buttonColor,
          'textTransform': 'none',
          'maxHeight': '100%',
          'px': 6,
          'borderRadius': 4,
          '&.Mui-disabled': {
            color: buttonColor,
            border: '2px solid ' + theme.palette.background.default
          }
        })}
      >
        {action}
      </Button>
    </Box>
  )
}
