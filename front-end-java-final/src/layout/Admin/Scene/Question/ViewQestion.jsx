import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';
import { useLoading } from '../../../../context/loadingContext';
import { request } from '../../../../services';

function ViewQuestion({ type }) {
    const [questions, setQuestions] = useState([]);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const getQuestions = async () => {
            startLoading();
            try {
                let endpoint = '/api/v1/admin/question';

                if (type === 'waiting') {
                    endpoint += '/not-answered';
                } else if (type === 'sent') {
                    endpoint += '/answered';
                } else if (type === 'trash') {
                    endpoint += '/trash';
                }

                const response = await request('GET', endpoint);
                if (response.data) {
                    setQuestions(response.data);
                }
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
            stopLoading();
        };

        getQuestions();
    }, [type]);

    return (
        <div className="flex flex-col gap-1">
            {questions.map((question, index) => (
                <QuestionItem key={index} data={question} />
            ))}
        </div>
    );
}

export default ViewQuestion;
