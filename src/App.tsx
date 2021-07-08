import { AppBar, Container, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import './App.scss'
import Quiz from './components/Quiz/Quiz'
import { QuizParams } from './model/QuizParams.model'
import QuizBuilder from './components/QuizBuilder/QuizBuilder'
import { QuizSummary } from './model/QuizSummary.model'
import QuizResults from './components/QuizResults/QuizResults'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(1)
    },
    container: {
      padding: '1rem'
    }
  })
)

function App (): ReactElement {
  const classes = useStyles()

  const [quizParams, setQuizParams] = useState<QuizParams>()
  const [quizSummary, setQuizSummary] = useState<QuizSummary>()

  const handleQuizBuild = (params: QuizParams): void => {
    setQuizParams(params)
  }

  const handleQuizFinished = (summary: QuizSummary): void => {
    setQuizSummary(summary)
  }

  const handleNewQuiz = (): void => {
    setQuizSummary(undefined)
    setQuizParams(undefined)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Typography variant="h6" className={classes.title}>
          Kdopak to zpívá?
        </Typography>
      </AppBar>

      <Container className={classes.container} maxWidth="sm">
        {quizParams == null && <QuizBuilder onBuild={handleQuizBuild} />}
        {quizParams != null && <Quiz params={quizParams} onFinished={handleQuizFinished}></Quiz>}
        {quizSummary != null && <QuizResults summary={quizSummary} onNewQuiz={handleNewQuiz}></QuizResults>}
      </Container>
    </div>
  )
}

export default App
