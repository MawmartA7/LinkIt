import { useEffect, useState } from 'react'
import { TextFieldCustumOutlined } from '../../../shared/components'
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Dialog,
  Icon,
  Box
} from '@mui/material'

interface IAliasConfirmationModalProps {
  open: boolean
  alias: string
  action: 'delete' | 'disable'
  isLoading: boolean
  onConfirm: () => void
  onClose: () => void
}

export const AliasConfirmationModal: React.FC<IAliasConfirmationModalProps> = ({
  open,
  alias,
  action,
  isLoading,
  onConfirm,
  onClose
}) => {
  const [confirmation, setConfirmation] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const actionText = action === 'delete' ? 'Delete' : 'Disable'
  const promptText =
    action === 'delete'
      ? `Type "${alias}" to permanently delete this item. This action cannot be undone.`
      : `Type "${alias}" to disable this item.`

  useEffect(() => {
    if (confirmation === alias) setIsButtonDisabled(false)
    else if (!isButtonDisabled) setIsButtonDisabled(true)
  }, [alias, confirmation, isButtonDisabled])

  const handleClose = () => {
    setConfirmation('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2, pr: 5 }}>
        {actionText} Confirmation
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.primary.main
          }}
        >
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {promptText}
        </Typography>
        <TextFieldCustumOutlined
          defaultValue=""
          value={confirmation}
          setValue={() => {}}
          onChange={e => {
            setConfirmation(e.target.value)
          }}
          error={false}
          clearError={() => {}}
          inputType="text"
        />
        <Box width="100%" mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color={action === 'delete' ? 'error' : 'warning'}
            disabled={isButtonDisabled}
            loading={isLoading}
            onClick={() => {
              onConfirm()
              handleClose()
            }}
            sx={theme => ({
              'bgcolor':
                action === 'delete' ? '#FF4A4A' : theme.palette.warning.light,
              'textTransform': 'none',
              'maxHeight': '100%',
              'px': 6,
              'borderRadius': 4,
              '&.Mui-disabled': {
                color:
                  action === 'delete' ? '#FF4A4A' : theme.palette.warning.light,
                border: '2px solid ' + theme.palette.background.default
              }
            })}
          >
            Confirm {action}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
