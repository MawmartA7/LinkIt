import { Pagination } from '@mui/material'
import { Environment } from '../../../shared/environment'

interface ILinksPaginationProps {
  page: number
  totalCount: number
  onChange: (newPage: number) => void
}

export const LinksPagination: React.FC<ILinksPaginationProps> = ({
  page,
  totalCount,
  onChange
}) => {
  return (
    <Pagination
      page={page}
      onChange={(_, newPage) => onChange(newPage)}
      count={Math.ceil(totalCount / Number(Environment.ROWS_PER_PAGE))}
      showFirstButton
      showLastButton
      color="primary"
      sx={theme => ({
        '& .MuiPaginationItem-root': {
          color: theme.palette.primary.contrastText
        }
      })}
    />
  )
}
