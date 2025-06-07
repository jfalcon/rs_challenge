import { AppBar, Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import rsLogo from "../logo-with-name.png";

export const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ flex: '0 0 auto' }}>
      <Toolbar>
        <Box
          component="img"
          src={rsLogo}
          alt={"logo"}
          sx={{
            height: 100,
            filter: theme.palette.mode === 'dark'
              ? 'invert(1.0)'
              : 'none',
          }}
        />
      </Toolbar>
    </AppBar>
  );
};
