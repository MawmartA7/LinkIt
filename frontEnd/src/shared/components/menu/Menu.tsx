import { Menu as MuiMenu, MenuItem } from '@mui/material'

interface IMenuProps<T> {
  anchorEl: HTMLElement | null
  setAnchorEl: (value: HTMLElement | null) => void
  options: T[]
  currentOption: T
  onSelectOption: (selectedOption: T) => void
}

export const Menu = <T,>({
  anchorEl,
  setAnchorEl,
  options,
  currentOption,
  onSelectOption
}: IMenuProps<T>) => {
  const open = !!anchorEl

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <MuiMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      onClose={handleClose}
    >
      {options.map(option => (
        <MenuItem
          selected={currentOption === option}
          onClick={() => {
            onSelectOption(option)
            handleClose()
          }}
        >
          {option as string}
        </MenuItem>
      ))}
    </MuiMenu>
  )
}
