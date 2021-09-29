import { AppBar, Button, Container, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import './App.scss'
import Quiz from './components/Quiz/Quiz'
import About from './components/About/About'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(1),
      color: 'white'
    },
    container: {
      padding: '1rem'
    },
    about: {
      color: 'white'
    }
  })
)

type AppView = 'quiz' | 'about'

function App (): ReactElement {
  const classes = useStyles()
  const [appView, setAppView] = useState<AppView>('quiz')
  const [resetToken, setResetToken] = useState<string>()

  const handleNewQuiz = (): void => {
    setResetToken(new Date().getTime().toString())
    setAppView('quiz')
  }

  const handleAbout = (): void => {
    setAppView('about')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kdopak to zpívá?
          </Typography>

          <Button onClick={handleNewQuiz} color="inherit">Nový kvíz</Button>

          <IconButton onClick={handleAbout} color="inherit">
            <InfoIcon></InfoIcon>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container className={classes.container} maxWidth="sm">
        {appView === 'about' && <About />}
        {appView === 'quiz' && <Quiz resetToken={resetToken} />}
      </Container>
    </div>
  )
}

export default App
