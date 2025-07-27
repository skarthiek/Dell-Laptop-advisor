import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Sparkles, ArrowRight } from 'lucide-react';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/questionnaire');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-dell-blue p-4 rounded-full mr-4">
                            <Laptop className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-dell-dark-gray">
                            Dell Laptop Advisor
                        </h1>
                    </div>
                    <div className="flex items-center justify-center text-dell-blue mb-4">
                        <Sparkles className="w-6 h-6 mr-2" />
                        <span className="text-xl font-semibold">AI-Powered Recommendations</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="question-card max-w-3xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-dell-dark-gray mb-6">
                        Find Your Perfect Dell Laptop
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Our intelligent system analyzes your needs and preferences to recommend
                        the ideal Dell laptop for you. Whether you're a student, professional,
                        gamer, or creative, we'll find the perfect match.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="bg-dell-light-blue p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="font-semibold text-dell-dark-gray mb-2">Smart Matching</h3>
                            <p className="text-sm text-gray-600">AI-powered analysis of your requirements</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-dell-light-blue p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="font-semibold text-dell-dark-gray mb-2">Expert Insights</h3>
                            <p className="text-sm text-gray-600">Detailed explanations and recommendations</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-dell-light-blue p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <h3 className="font-semibold text-dell-dark-gray mb-2">Direct Purchase</h3>
                            <p className="text-sm text-gray-600">Direct links to Dell's official store</p>
                        </div>
                    </div>

                    <button
                        onClick={handleGetStarted}
                        className="btn-primary text-lg px-8 py-4 flex items-center mx-auto"
                    >
                        Start Your Journey
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>

                {/* Footer */}
                <div className="text-gray-500 text-sm">
                    <p>Powered by Dell Technologies and Google Gemini AI</p>
                    <p className="mt-1">Get personalized recommendations in just a few clicks</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage; 