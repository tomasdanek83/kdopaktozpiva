import { AppBar, Button, Container, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom'
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

function App (): ReactElement {
  const classes = useStyles()

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Kdopak to zpívá?
            </Typography>
            <Button component={RouterLink} to="/" color="inherit">Nový kvíz</Button>
            <IconButton component={RouterLink} to="/about" color="inherit">
              <InfoIcon></InfoIcon>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container className={classes.container} maxWidth="sm">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Quiz />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default App
