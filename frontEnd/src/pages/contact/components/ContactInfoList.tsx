import { Box, List, ListItem, Typography } from '@mui/material'

interface ContactInfoListProps {
  isUpMd: boolean
}

export const ContactInfoList: React.FC<ContactInfoListProps> = ({ isUpMd }) => {
  return (
    <List
      sx={{
        pl: { md: 2 },
        mt: { xs: 2, sm: 4 }
      }}
    >
      <ListItem sx={{ gap: 2, px: 0 }}>
        <Box
          component="img"
          width="40"
          height="40"
          src={`https://img.icons8.com/?size=40&id=pB1P8RtAJn4H&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
          alt="Programmer icon"
        />
        <Typography
          color="textSecondary"
          sx={theme => ({
            [theme.breakpoints.down('md')]: {
              color: '#bbb'
            }
          })}
        >
          Aaron Stewart Martinez
        </Typography>
      </ListItem>
      <ListItem sx={{ gap: 2, px: 0 }}>
        <Box
          component="img"
          width="40"
          height="40"
          src={`https://img.icons8.com/?size=40&id=63&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
          alt="Email icon"
        />
        <Typography
          color="textSecondary"
          sx={theme => ({
            [theme.breakpoints.down('md')]: {
              color: '#bbb'
            }
          })}
        >
          aaronstmart.dev@gmail.com
        </Typography>
      </ListItem>
      <ListItem sx={{ gap: 2, px: 0 }}>
        <Box
          component="img"
          width="40"
          height="40"
          src={`https://img.icons8.com/?size=40&id=53438&format=png&color=${isUpMd ? '1f1f1f' : 'bbbbbb'}`}
          alt="Phone icon"
        />
        <Typography
          color="textSecondary"
          sx={theme => ({
            [theme.breakpoints.down('md')]: {
              color: '#bbb'
            }
          })}
        >
          +55 21 99455-5856
        </Typography>
      </ListItem>
    </List>
  )
}
