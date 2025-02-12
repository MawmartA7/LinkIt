import { useCallback, useState } from 'react'
import { ShortenService } from '../../shared/services/ShortenService'
import { createShortenedUrl } from '../../shared/forms/schemas'
import { Box, Button, Icon, Typography } from '@mui/material'
import { useVForm, VForm } from '../../shared/forms'
import { VTextField } from '../../shared/components'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface ICreateData {
  url: string
  alias: string
  id?: string
}

export const Home = () => {
  const [IsCustomizeIdOpen, setIsCustomizeIdOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { formRef, save } = useVForm()

  const navigate = useNavigate()

  const handleSave = useCallback(
    async (data: ICreateData) => {
      setIsLoading(true)

      try {
        const validatedData = await createShortenedUrl.validate(data, {
          abortEarly: false
        })

        const response = await ShortenService.create(validatedData)

        if (response === 'success') {
          navigate('/links')
          return
        }

        if (response.message === 'Request failed with status code 409') {
          formRef.current?.setErrors({
            alias: 'This alias is already in use'
          })
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {}

          error.inner.forEach(error => {
            if (!error.path) return
            validationErrors[error.path] = error.message
          })

          formRef.current?.setErrors(validationErrors)
        } else {
          console.error(error)
        }
      } finally {
        setIsLoading(false)
      }
      setIsLoading(false)
      return
    },
    [formRef, navigate]
  )

  const handleCustomizeOpenToggle = useCallback(() => {
    setIsCustomizeIdOpen(oldIsCustomizeUrlOpen => !oldIsCustomizeUrlOpen)
  }, [])

  return (
    <VForm
      ref={formRef}
      onSubmit={(data: ICreateData) => {
        console.log(data)
        handleSave(data)
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
            disabled={isLoading}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>Give a alias to your short link:</Typography>
          <VTextField
            required
            variant="withMessage"
            helperMessages={{
              validMessage: 'Yeah!  The alias is valid'
            }}
            placeholder="Alias"
            name="alias"
            disabled={isLoading}
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
                  validMessage: 'Yeah!  The name is valid'
                }}
                placeholder="Unique-Code"
                name="id"
                disabled={isLoading}
              />
            </Box>
          ) : undefined}
        </Box>

        <Button
          onClick={save}
          sx={{ width: '70%', marginX: 'auto', textTransform: 'none' }}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          Link It
        </Button>
      </Box>
    </VForm>
  )
}
