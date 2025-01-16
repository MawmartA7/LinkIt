import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

interface ITextLinkProps {
  href: string
  target?: React.HTMLAttributeAnchorTarget
  children: React.ReactNode
}

export const TextLink: React.FC<ITextLinkProps> = ({
  href,
  target,
  children
}) => {
  const navigate = useNavigate()

  return (
    <Typography
      variant="body1"
      component="a"
      color="secondary"
      target={target}
      rel={target !== '_blank' ? undefined : 'noopener noreferrer'}
      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
      onClick={() =>
        target !== '_blank' ? navigate(href) : window.open(href, target)
      }
    >
      {children}
    </Typography>
  )
}
