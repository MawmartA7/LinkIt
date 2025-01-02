import { useCallback, useState } from 'react'
import { Box, Button, Icon, Typography } from '@mui/material'
import { useVForm, VForm } from '../../shared/forms'
import { VTextField } from '../../shared/components'

export const Home = () => {
  const [IsCustomizeIdOpen, setIsCustomizeIdOpen] = useState(false)

  const { formRef, save } = useVForm()

  const handleCustomizeOpenToggle = useCallback(() => {
    setIsCustomizeIdOpen(oldIsCustomizeUrlOpen => !oldIsCustomizeUrlOpen)
  }, [])

  return (
    <VForm
      ref={formRef}
      onSubmit={data => {
        console.log(data)
      }}
      placeholder={undefined}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>Paste your url here to create a short link:</Typography>
          <VTextField
            required
            variant="withMessage"
            helperMessages={{
              validMessage: 'Yeah!  Your URL is valid'
            }}
            placeholder="https://exemple-long-url.com/extra-LONG"
            name="url"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>Give a alias to your short link:</Typography>
          <VTextField
            required
            variant="withMessage"
            helperMessages={{
              validMessage: 'Yeah!  The alias is valid and unique'
            }}
            placeholder="Alias"
            name="alias"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            sx={{ display: 'flex', gap: 0.75, cursor: 'pointer' }}
            onClick={handleCustomizeOpenToggle}
          >
            <Typography>Customize the shorten link</Typography>
            <Icon
              fontSize="medium"
              sx={theme => ({ color: theme.palette.primary.contrastText })}
            >
              {IsCustomizeIdOpen ? 'expand_more' : 'expand_less'}
            </Icon>
          </Box>
          {IsCustomizeIdOpen ? (
            <Box display="flex" flexDirection="column" gap={1} mb={1}>
              <Typography>
                Enter a unique code for the shortened link:
              </Typography>
              <VTextField
                variant="withMessage"
                helperMessages={{
                  validMessage: 'Yeah!  The name is valid and unique'
                }}
                placeholder="Unique-Code"
                name="id"
              />
            </Box>
          ) : undefined}
        </Box>

        <Button
          onClick={save}
          sx={{ width: '70%', marginX: 'auto', textTransform: 'none' }}
          color="primary"
          variant="contained"
        >
          Link It
        </Button>
      </Box>
    </VForm>
  )
}
