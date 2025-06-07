import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { alpha, useTheme } from '@mui/material/styles';

export const RightPanel = ({ selectedTeam, weather, onFetch, loadingWeather }) => {
  const error = useSelector((state: RootState) => state.error.message);
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
      }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {selectedTeam?.fullName
          ? <Typography variant="h5">{selectedTeam.fullName}</Typography>
          : <Typography variant="body1" sx={{ mt: 2 }}>
            This is the content panel. It will show weather information for an NBA team after
            teams are loaded and one is selected.
          </Typography>
        }
        {error && <Typography variant="body1" sx={{ mt: 2 }}>{error}</Typography>}
        <Box>
          {loadingWeather && <CircularProgress />}
          {selectedTeam?.city && weather && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
              Weather in {weather.location}, {weather.region}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img src={weather.icon} alt={weather.condition} />
              <Typography>
                {weather.temp}&deg;F, {weather.condition}
              </Typography>
            </Box>
            <Typography>Wind: {weather.wind} mph</Typography>
          </Paper>
          )}
        </Box>
      </Box>
      {/* Sticky button at the bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Button onClick={onFetch} variant="contained" color="primary" fullWidth>
          {/* this should be a useEffect instead */}
          Show NBA Teams
        </Button>
      </Box>
    </Box>
  );
}
