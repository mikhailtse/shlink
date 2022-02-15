import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            https://shlink
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
