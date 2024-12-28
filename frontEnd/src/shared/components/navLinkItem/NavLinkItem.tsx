import { useCallback } from 'react'

import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

interface INavLinkItemProps {
  label: string
  to: string
  isDrawerOpen: boolean
  onClick?: () => void
}

export const NavLinkItem: React.FC<INavLinkItemProps> = ({
  label,
  to,
  isDrawerOpen,
  onClick
}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)

  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const handleClick = useCallback(() => {
    navigate(to)
    onClick?.()
  }, [navigate, onClick, to])

  return (
    <Box
      onClick={handleClick}
      sx={
        isDrawerOpen && !!match
          ? theme => ({
              bgcolor: theme.palette.primary.main
            })
          : {}
      }
      p={2}
    >
      <Typography
        sx={
          isDrawerOpen && !!match
            ? theme => ({
                color: theme.palette.primary.contrastText
              })
            : theme => ({
                color: theme.palette.primary.main
              })
        }
        fontWeight={500}
      >
        {label}
      </Typography>
    </Box>
  )
}
