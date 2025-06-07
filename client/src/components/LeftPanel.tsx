import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';

export const LeftPanel = ({ loadingTeams, teams, selectedTeam, onSelect }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 240 },
        height: { xs: 150, sm: '100%' },
        borderRight: { xs: 'none', sm: 1 },
        borderBottom: { xs: 1, sm: 'none' },
        borderColor: 'divider',
        flexShrink: 0,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Typography
          sx={{ px: 2, py: 2, fontWeight: "bold" }}
          variant="subtitle1"
        >
          Teams
        </Typography>
        <Divider />
        {loadingTeams ? (
          <Box sx={{ width: "100%", pt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <CircularProgress size={32} />
            </Box>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={44}
                sx={{ my: 1.5, mx: 2, borderRadius: 1 }}
              />
            ))}
          </Box>
        ) : (
          <List disablePadding>
            {teams.map((team) => (
              <ListItem key={team.id} disablePadding>
                <ListItemButton
                  selected={team.id === selectedTeam?.id}
                  onClick={() => onSelect(team)}
                >
                  <ListItemText primary={team.fullName} secondary={team.city || "Unknown"} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
