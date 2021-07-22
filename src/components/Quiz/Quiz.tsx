import React, { ReactElement, useState } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import QuizBuilder from '../QuizBuilder/QuizBuilder'
import QuizQuestions from '../QuizQuestions/QuizQuestions'
import QuizResults from '../QuizResults/QuizResults'

export default function Quiz (): ReactElement {
    const [quizParams, setQuizParams] = useState<QuizParams>()
    const [quizSummary, setQuizSummary] = useState<QuizSummary>()

    const handleQuizBuild = (params: QuizParams): void => {
        setQuizParams(params)
    }

    const handleQuizFinished = (summary: QuizSummary): void => {
        setQuizSummary(summary)
    }

    const handleRepeatQuiz = (): void => {
        setQuizSummary(undefined)
    }

    const handleNewQuiz = (): void => {
        setQuizSummary(undefined)
        setQuizParams(undefined)
    }

    return (<>
        {quizParams == null && quizSummary == null && <QuizBuilder onBuild={handleQuizBuild} />}
        {quizParams != null && quizSummary == null && <QuizQuestions params={quizParams} onFinished={handleQuizFinished}></QuizQuestions>}
        {quizSummary != null && <QuizResults summary={quizSummary} onRepeatQuiz={handleRepeatQuiz} onNewQuiz={handleNewQuiz}></QuizResults>}
    </>)
}
