import { TextFieldCustumOutlined } from '../../../shared/components'
import { Box, Icon } from '@mui/material'

interface Props {
  search: string
  onSearchChange: (value: string) => void
}

export const SearchBar = ({ search, onSearchChange }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={theme => ({
        width: 300,
        [theme.breakpoints.down('sm')]: {
          width: 275
        },
        [theme.breakpoints.down(400)]: {
          width: '100%',
          px: 1
        }
      })}
    >
      <TextFieldCustumOutlined
        defaultValue=""
        value={search}
        setValue={() => {}}
        onChange={e => onSearchChange(e.target.value)}
        error={false}
        clearError={() => {}}
        placeholder="Search by alias"
        startAdornment={
          <Icon
            sx={theme => ({
              'color': '#bbbbbb',
              'position': 'relative',
              'bottom': 3,
              'right': 5,
              '&:hover': { color: theme.palette.secondary.main }
            })}
          >
            search
          </Icon>
        }
        inputType="text"
      />
    </Box>
  )
}
