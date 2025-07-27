import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function App() {
    const [userPreferences, setUserPreferences] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    const handlePreferencesSubmit = (preferences) => {
        setUserPreferences(preferences);
    };

    const handleRecommendationReceived = (rec) => {
        setRecommendation(rec);
    };

    return (
        <Router>
            <div className="App min-h-screen bg-gradient-to-br from-dell-light-blue to-white">
                <Routes>
                    <Route
                        path="/"
                        element={<WelcomePage onStart={() => { }} />}
                    />
                    <Route
                        path="/questionnaire"
                        element={
                            <QuestionnairePage
                                onSubmit={handlePreferencesSubmit}
                                onRecommendationReceived={handleRecommendationReceived}
                            />
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            recommendation ? (
                                <ResultsPage
                                    recommendation={recommendation}
                                    userPreferences={userPreferences}
                                />
                            ) : (
                                <Navigate to="/questionnaire" replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 