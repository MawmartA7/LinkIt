import { TextFieldCustumOutlined } from '../../../shared/components'
import { Box, Icon } from '@mui/material'

interface Props {
  search: string
  onSearchChange: (value: string) => void
}

export const SearchBar = ({ search, onSearchChange }: Props) => {
  return (
    <Box width={300} display="flex" alignItems="center" gap={1}>
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
