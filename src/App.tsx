import React, { ReactElement, useState } from 'react'
import './App.scss'
import Quiz from './components/Quiz/Quiz'
import About from './components/About/About'
import { Box, ThemeProvider } from '@mui/system'
import { AppBar, Button, Container, createTheme, IconButton, Toolbar, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

type AppView = 'quiz' | 'about'

function App (): ReactElement {
  const [appView, setAppView] = useState<AppView>('quiz')
  const [resetToken, setResetToken] = useState<string>()

  const handleNewQuiz = (): void => {
    setResetToken(new Date().getTime().toString())
    setAppView('quiz')
  }

  const handleAbout = (): void => {
    setAppView('about')
  }

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        flexGrow: 1
      }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{
              flexGrow: 1,
              margin: theme.spacing(1),
              color: 'white'
            }}>
              Kdopak to zpívá?
            </Typography>

            <Button onClick={handleNewQuiz} color="inherit">Nový kvíz</Button>

            <IconButton onClick={handleAbout} color="inherit">
              <InfoIcon></InfoIcon>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container sx={{
          padding: '1rem'
        }}
          maxWidth="sm">
          {appView === 'about' && <About />}
          {appView === 'quiz' && <Quiz resetToken={resetToken} />}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
