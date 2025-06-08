import { AppBar, Box, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFeature } from "../hooks/useFeature";
import rsLogo from "../logo-with-name.png";

export const Header = () => {
  const theme = useTheme();
  const darkModeFilter = useFeature("darkModeFilter");
  const random = useFeature("random");

  return (
    <AppBar position="static" sx={{ flex: '0 0 auto' }}>
      <Toolbar>
        <Box
          component="img"
          src={rsLogo}
          alt={"logo"}
          sx={{
            height: 100,
            filter: darkModeFilter && theme.palette.mode === 'dark'
              ? 'invert(1.0)'
              : 'none',
          }}
        />
        {random && <Box>If you see me, I'm a random feature flag.</Box>}
      </Toolbar>
    </AppBar>
  );
};
