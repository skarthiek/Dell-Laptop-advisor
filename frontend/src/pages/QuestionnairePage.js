import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { getRecommendation } from '../services/api';

const QuestionnairePage = ({ onSubmit, onRecommendationReceived }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({
        is_student: false,
        likes_gaming: false,
        ai_ml_work: false,
        priority: '',
        budget: ''
    });

    const questions = [
        {
            id: 'is_student',
            question: 'Are you a student?',
            type: 'boolean',
            options: [
                { value: true, label: 'Yes, I am a student', icon: '🎓' },
                { value: false, label: 'No, I am not a student', icon: '💼' }
            ]
        },
        {
            id: 'likes_gaming',
            question: 'Do you like gaming?',
            type: 'boolean',
            options: [
                { value: true, label: 'Yes, I love gaming!', icon: '🎮' },
                { value: false, label: 'No, I don\'t game much', icon: '📚' }
            ]
        },
        {
            id: 'ai_ml_work',
            question: 'Are you going to work on AI/ML/data science?',
            type: 'boolean',
            options: [
                { value: true, label: 'Yes, I work with AI/ML', icon: '🤖' },
                { value: false, label: 'No, not my focus', icon: '📝' }
            ]
        },
        {
            id: 'priority',
            question: 'What\'s most important to you?',
            type: 'single',
            options: [
                { value: 'performance', label: 'Performance & Speed', icon: '⚡' },
                { value: 'battery', label: 'Battery Life', icon: '🔋' },
                { value: 'portability', label: 'Portability & Lightweight', icon: '💼' }
            ]
        },
        {
            id: 'budget',
            question: 'What\'s your budget range?',
            type: 'single',
            options: [
                { value: 'budget', label: 'Budget (Under ₹80,000)', icon: '💰' },
                { value: 'mid-range', label: 'Mid-range (₹80,000 - ₹1,50,000)', icon: '💳' },
                { value: 'premium', label: 'Premium (Above ₹1,50,000)', icon: '💎' }
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const recommendation = await getRecommendation(answers);
            onSubmit(answers);
            onRecommendationReceived(recommendation);
            navigate('/results');
        } catch (error) {
            console.error('Error getting recommendation:', error);
            alert('Sorry, there was an error getting your recommendation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;
    const canProceed = answers[currentQuestion.id] !== '';

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-dell-blue hover:text-dell-dark-blue mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </button>
                    <h1 className="text-3xl font-bold text-dell-dark-gray mb-2">
                        Let's Find Your Perfect Laptop
                    </h1>
                    <p className="text-gray-600">
                        Step {currentStep + 1} of {questions.length}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-dell-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="question-card">
                    <h2 className="text-2xl font-semibold text-dell-dark-gray mb-6">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${answers[currentQuestion.id] === option.value
                                        ? 'border-dell-blue bg-dell-light-blue'
                                        : 'border-gray-200 hover:border-dell-blue hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-2xl mr-4">{option.icon}</span>
                                    <span className="font-medium text-dell-dark-gray">
                                        {option.label}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${currentStep === 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-dell-blue hover:text-dell-dark-blue'
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </button>

                        {isLastStep ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!canProceed || loading}
                                className={`btn-primary flex items-center ${!canProceed || loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Getting Recommendation...
                                    </>
                                ) : (
                                    <>
                                        Get Recommendation
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed}
                                className={`btn-primary flex items-center ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionnairePage; 