import React, { ReactElement, useEffect, useState } from 'react'
import { QuizParams } from '../../model/QuizParams.model'
import { QuizSummary } from '../../model/QuizSummary.model'
import QuizBuilder from '../QuizBuilder/QuizBuilder'
import QuizQuestions from '../QuizQuestions/QuizQuestions'
import QuizResults from '../QuizResults/QuizResults'

const defaultQuizParams: QuizParams = {
    birds: [],
    questionCount: 10,
    type: 'all',
    mode: 'education',
    quality: 'high'
}

export type QuizProps = {
    resetToken?: string
}

export type QuizView = 'quizBuilder' | 'quizQuestions' | 'quizSummary'

export default function Quiz ({ resetToken }: QuizProps): ReactElement {
    const [quizView, setQuizView] = useState<QuizView>('quizBuilder')
    const [quizParams, setQuizParams] = useState<QuizParams>(defaultQuizParams)
    const [quizSummary, setQuizSummary] = useState<QuizSummary>()

    useEffect(() => {
        if (resetToken != null) {
            setQuizParams(defaultQuizParams)
            setQuizView('quizBuilder')
        }
    }, [resetToken])

    const handleQuizBuild = (params: QuizParams): void => {
        setQuizParams(params)
        setQuizView('quizQuestions')
    }

    const handleQuizFinished = (summary: QuizSummary): void => {
        setQuizSummary(summary)
        setQuizView('quizSummary')
    }

    const handleRepeatQuiz = (): void => {
        setQuizView('quizBuilder')
    }

    const handleNewQuiz = (): void => {
        setQuizParams(defaultQuizParams)
        setQuizView('quizBuilder')
    }

    return (<>
        {quizView === 'quizBuilder' &&
            <QuizBuilder
                initialParams={quizParams}
                onBuild={handleQuizBuild} />
        }

        {quizView === 'quizQuestions' &&
            <QuizQuestions
                params={quizParams}
                onRepeatQuiz={handleRepeatQuiz}
                onFinished={handleQuizFinished} />
        }

        {quizView === 'quizSummary' && quizSummary != null &&
            <QuizResults
                summary={quizSummary}
                onRepeatQuiz={handleRepeatQuiz}
                onNewQuiz={handleNewQuiz} />
        }
    </>)
}
