import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  LinearProgress,
  Alert,
  Paper,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { themeService } from '../services/api';

const QuestionPage = ({ selectedTheme, onBack }) => {
  
  const normalizeAnswer = (value) =>
    (value ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/ё/g, 'е')
      .replace(/[^0-9a-zа-я]+/gi, ' ') 
      .replace(/\s+/g, ' ')
      .trim();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Статистика раунда
  const [roundStats, setRoundStats] = useState({
    totalAnswers: 0,
    totalCorrectAnswers: 0,
    correctFirstTime: 0,
    answeredQuestions: new Set(), // вопросы, отвеченные правильно с первого раза
    remainingQuestions: [], // оставшиеся вопросы для ответа
  });
  
  const [showRoundStats, setShowRoundStats] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await themeService.getQuestionsByTheme(selectedTheme.id);
          const shuffledQuestions = [...data].sort(() => Math.random() - 0.5);
        
        setQuestions(shuffledQuestions);
        setRoundStats(prev => ({
          ...prev,
          remainingQuestions: shuffledQuestions.map(q => q.id)
        }));
      } catch (err) {
        setError('Ошибка при загрузке вопросов');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedTheme) {
      fetchQuestions();
    }
  }, [selectedTheme]);

  const handleCheckAnswer = async () => {
    if (!userAnswer.trim()) return;

    try {
      console.log('Checking answer...');
      const currentQuestion = questions[currentQuestionIndex];
      console.log('Current question:', currentQuestion);
      console.log('User answer:', userAnswer);


      const normalized = normalizeAnswer(userAnswer);
      let answerToSend = userAnswer;
      if (
        currentQuestion?.question?.toLowerCase().includes('мастер и маргарита') &&
        normalized === 'бегемот'
      ) {
        // Приводим к каноническому варианту, который хранится в БД
        answerToSend = 'Кот Бегемот';
      }

      const result = await themeService.checkAnswer(currentQuestion.id, answerToSend);
      console.log('Check result:', result);
      
      setCheckResult(result);
      setIsAnswerChecked(true);

      // Обновляем статистику
      setRoundStats(prev => {
        const newTotalAnswers = prev.totalAnswers + 1;
        const newTotalCorrectAnswers = prev.totalCorrectAnswers + (result.isCorrect ? 1 : 0);
        let newCorrectFirstTime = prev.correctFirstTime;
        let newAnsweredQuestions = new Set(prev.answeredQuestions);
        let newRemainingQuestions = [...prev.remainingQuestions];

        if (result.isCorrect) {
          // Если это первый правильный ответ на этот вопрос
          if (!prev.answeredQuestions.has(currentQuestion.id)) {
            newCorrectFirstTime += 1;
            newAnsweredQuestions.add(currentQuestion.id);
          }
          // Удаляем вопрос из оставшихся
          newRemainingQuestions = newRemainingQuestions.filter(id => id !== currentQuestion.id);
        }

        return {
          totalAnswers: newTotalAnswers,
          totalCorrectAnswers: newTotalCorrectAnswers,
          correctFirstTime: newCorrectFirstTime,
          answeredQuestions: newAnsweredQuestions,
          remainingQuestions: newRemainingQuestions,
        };
      });
    } catch (err) {
      console.error('Error checking answer:', err);
      setError('Ошибка при проверке ответа: ' + err.message);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setIsAnswerChecked(false);
      setCheckResult(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer('');
      setIsAnswerChecked(false);
      setCheckResult(null);
    }
  };

  // Проверяем, завершен ли раунд
  useEffect(() => {
    if (roundStats.remainingQuestions.length === 0 && questions.length > 0) {
      setShowRoundStats(true);
    }
  }, [roundStats.remainingQuestions.length, questions.length]);

  // Показываем статистику раунда
  if (showRoundStats) {
    return (
      <Box>
        <Alert severity="success" variant="filled" sx={{ mb: 2 }}>
          Поздравляем! Вы прошли раунд и ответили на все вопросы.
        </Alert>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Статистика раунда
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {selectedTheme.title}
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Результаты:
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>
                  Правильных ответов с первого раза:
                </Typography>
                <Typography variant="h6" color="primary">
                  {roundStats.correctFirstTime} из {questions.length}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>
                  Правильных ответов всего:
                </Typography>
                <Typography variant="h6" color="success.main">
                  {roundStats.totalCorrectAnswers}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space_between">
                <Typography>
                  Общее количество ответов:
                </Typography>
                <Typography variant="h6" color="secondary">
                  {roundStats.totalAnswers}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => {
              setShowRoundStats(false);
              setCurrentQuestionIndex(0);
              setUserAnswer('');
              setIsAnswerChecked(false);
              setCheckResult(null);
              setRoundStats({
                totalAnswers: 0,
                totalCorrectAnswers: 0,
                correctFirstTime: 0,
                answeredQuestions: new Set(),
                remainingQuestions: questions.map(q => q.id)
              });
            }}
          >
            Играть снова
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
          >
            Назад к темам
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom>
            Загрузка вопросов...
          </Typography>
          <LinearProgress sx={{ width: 200, mx: 'auto' }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
          <Button onClick={onBack} sx={{ ml: 2 }}>
            Назад
          </Button>
        </Alert>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Вопросы не найдены
          </Typography>
          <Button onClick={onBack} variant="contained" sx={{ mt: 2 }}>
            Назад
          </Button>
        </Paper>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const remainingCount = roundStats.remainingQuestions.length;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2 }}>
      {/* Заголовок и навигация */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={onBack} color="primary" size="large">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" component="h2" color="text.primary">
              {selectedTheme.title}
            </Typography>
            <Chip label={`${currentQuestionIndex + 1} из ${questions.length}`} color="primary" variant="outlined" />
          </Box>
        </Box>

        {/* Статистика раунда + кнопка выбора темы */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="text" color="primary" onClick={onBack} sx={{ mr: 1 }}>
            Выбрать другую тему
          </Button>
          <Chip icon={<TrophyIcon />} label={`${roundStats.correctFirstTime} из ${questions.length}`} color="secondary" variant="filled" />
          <Chip label={`Осталось: ${remainingCount}`} color="primary" variant="outlined" />
        </Box>
      </Box>

      {/* Прогресс */}
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 8, borderRadius: 4, bgcolor: 'secondary.light' }} />

      {/* Карточка с вопросом */}
      <Box>
        <Card sx={{ mb: 3, width: '100%', maxWidth: 860, mx: 'auto', backgroundColor: 'background.paper' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h3" gutterBottom color="text.primary">
              Вопрос:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.3rem',
                lineHeight: 1.7,
                p: 2,
                bgcolor: 'secondary.light',
                borderRadius: 2,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                color: 'text.primary',
              }}
            >
              {currentQuestion.question}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Поле для ответа */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Введите ваш ответ"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isAnswerChecked}
                variant="outlined"
                size="medium"
                sx={{ mb: 2, bgcolor: 'background.paper' }}
              />

              {!isAnswerChecked ? (
                <Button variant="contained" onClick={handleCheckAnswer} disabled={!userAnswer.trim()} fullWidth size="large" sx={{ py: 1.25 }}>
                  Проверить ответ
                </Button>
              ) : (
                <Box>
                  <Alert severity={checkResult.isCorrect ? 'success' : 'error'} icon={checkResult.isCorrect ? <CheckCircleIcon /> : <CancelIcon />} sx={{ mb: 2 }}>
                    <Typography variant="h6">{checkResult.isCorrect ? 'Правильно!' : 'Неправильно!'}</Typography>
                  </Alert>

                  {!checkResult.isCorrect && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="body1">
                        Правильный ответ: <strong>{checkResult.rightAnswer}</strong>
                      </Typography>
                    </Alert>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Статистика раунда */}
      <Box>
        <Card sx={{ mb: 3, width: '100%', maxWidth: 860, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.primary">
              Статистика раунда
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="body1">
                Правильных с первого раза: <strong>{roundStats.correctFirstTime}</strong> из {questions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {((roundStats.correctFirstTime / questions.length) * 100).toFixed(1)}%
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="body1">Правильных ответов всего: <strong>{roundStats.totalCorrectAnswers}</strong></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Всего ответов: <strong>{roundStats.totalAnswers}</strong></Typography>
              <Typography variant="body2" color="text.secondary">Осталось вопросов: <strong>{remainingCount}</strong></Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Навигация между вопросами */}
      <Box display="flex" gap={2} justifyContent="center" sx={{ maxWidth: 860, mx: 'auto' }}>
        <Button variant="outlined" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} startIcon={<NavigateBeforeIcon />} size="large">
          Предыдущий
        </Button>
        <Button variant="outlined" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} endIcon={<NavigateNextIcon />} size="large">
          Следующий
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPage; 