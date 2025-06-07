import { useDispatch } from "react-redux";
import { useState } from "react";
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { setError, clearError } from "./slices/error";
import { Header } from "./components/Header";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import "./App.css";

// normally we wouldn't cross client/server boundaries like this,
// so to ensure types are across projects consistent a global types
// folder, built out definition file, etc. should be considered
import { Team } from "../../server/controllers/teams"
import { Weather } from "../../server/controllers/weather"

export const App = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  // height of AppBar (default 64px desktop, 56px mobile)
  // in the future, don't use pixel values for height
  const APP_BAR_HEIGHT = isSmDown ? 56 : 64;

  // responsive height calculations
  const mainAreaHeight = `calc(100vh - ${APP_BAR_HEIGHT}px)`;
  const leftPanelHeight = isSmDown ? 150 : mainAreaHeight;
  const rightPanelHeight = isSmDown ? `calc(100vh - ${APP_BAR_HEIGHT}px - 150px)` : mainAreaHeight;

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const dispatch = useDispatch();

  // note, this really should be using useEffect rather than button click
  const fetchTeams = async () => {
    setLoadingTeams(true);
    dispatch(clearError());

    try {
      const res = await fetch("/api/teams");
      if (!res.ok) throw new Error("Network response was not ok");
      setTeams(await res.json());
    } catch (e) {
      console.error(e);
      dispatch(setError("Failed to load NBA teams."));
    } finally {
      setLoadingTeams(false);
    }
  };

  const handleSelectTeam = async (team: Team) => {
    setSelectedTeam(team);
    setWeather(null);
    setLoadingWeather(true);
    dispatch(clearError());

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(team.city)}`);
      if (!res.ok) throw new Error("Network response was not ok");
      setWeather(await res.json());
    } catch (e) {
      console.error(e);
      dispatch(setError("Failed to load weather information."));
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          minHeight: 0, // important for scroll areas
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: 240 }, height: leftPanelHeight }}>
          <LeftPanel
            loadingTeams={loadingTeams}
            teams={teams}
            selectedTeam={selectedTeam}
            onSelect={handleSelectTeam}
          />
        </Box>
        <Box sx={{ flex: 1, height: rightPanelHeight, minWidth: 0 }}>
          <RightPanel
            selectedTeam={selectedTeam}
            weather={weather}
            onFetch={fetchTeams}
            loadingWeather={loadingWeather}
          />
        </Box>
      </Box>
    </Box>
  );
};
