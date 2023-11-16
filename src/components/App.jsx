import React, { useState } from 'react';
import Sections from './Sections';
import FeedbackOptions from './Feedback';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = type => {
    setState(prevState => ({ ...prevState, [type]: prevState[type] + 1 }));
  };
  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedback = () => {
    const total = countTotalFeedback();
    return total ? Math.round((state.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedback();

  return (
    <div>
      <Sections title="Please leave feedback">
        <FeedbackOptions options={state} onLeaveFeedback={handleFeedback} />

        {total > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Sections>
    </div>
  );
};
