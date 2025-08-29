import { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import { themeService } from '../services/api';

const HomePage = ({ onThemeSelect }) => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const data = await themeService.getAllThemes();
        setThemes(data);
      } catch (err) {
        setError('Ошибка при загрузке тем: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleThemeClick = (theme) => {
    onThemeSelect(theme);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Заголовок */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h1" component="h1" gutterBottom color="text.primary">
          Flashcards
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Выберите тему для изучения
        </Typography>
      </Box>

      {/* Сетка тем */}
      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
        {themes && themes.length > 0 ? (
          themes.map((theme) => (
            <Grid item xs={12} sm={6} md={4} key={theme.id} display="flex" justifyContent="center">
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 440,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 14px 40px rgba(16, 94, 66, 0.18)',
                  },
                }}
              >
                <CardActionArea onClick={() => handleThemeClick(theme)} sx={{ p: 3 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <SchoolIcon sx={{ fontSize: 56, color: 'primary.main', mb: 1.5 }} />
                    <Typography variant="h5" component="h3" gutterBottom color="text.primary">
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Нажмите, чтобы начать изучение
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Темы не найдены
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage; 