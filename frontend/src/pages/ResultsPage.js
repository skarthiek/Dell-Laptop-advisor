import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, CheckCircle, Zap, Battery, Briefcase } from 'lucide-react';

const ResultsPage = ({ recommendation, userPreferences }) => {
    const navigate = useNavigate();
    const { laptop, marketing_text, reasoning } = recommendation;

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'performance':
                return <Zap className="w-5 h-5 text-yellow-500" />;
            case 'battery':
                return <Battery className="w-5 h-5 text-green-500" />;
            case 'portability':
                return <Briefcase className="w-5 h-5 text-blue-500" />;
            default:
                return <Star className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBudgetColor = (budget) => {
        switch (budget) {
            case 'budget':
                return 'text-green-600';
            case 'mid-range':
                return 'text-blue-600';
            case 'premium':
                return 'text-purple-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-dell-blue hover:text-dell-dark-blue mb-4 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-dell-dark-gray mb-2">
                        Your Perfect Dell Laptop
                    </h1>
                    <p className="text-gray-600">
                        Based on your preferences, here's our recommendation
                    </p>
                </div>

                {/* Main Result Card */}
                <div className="laptop-card mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Laptop Details */}
                        <div>
                            <h2 className="text-3xl font-bold text-dell-dark-gray mb-4">
                                {laptop.model}
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="font-medium">CPU: {laptop.cpu}</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="font-medium">RAM: {laptop.ram}</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="font-medium">Storage: {laptop.storage}</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                    <span className="font-medium">GPU: {laptop.gpu}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-dell-dark-gray mb-3">
                                    Perfect For:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {laptop.use_case.map((useCase, index) => (
                                        <span
                                            key={index}
                                            className="bg-dell-light-blue text-dell-blue px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {useCase}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-dell-dark-gray mb-3">
                                    Key Features:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {laptop.priority.map((priority, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                                        >
                                            {getPriorityIcon(priority)}
                                            <span className="ml-1">{priority}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-dell-blue mb-6">
                                {laptop.price}
                            </div>

                            <a
                                href={laptop.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-lg px-8 py-4 flex items-center justify-center w-full"
                            >
                                Buy Now on Dell.com
                                <ExternalLink className="ml-2 w-5 h-5" />
                            </a>
                        </div>

                        {/* Marketing Content */}
                        <div>
                            <div className="bg-gradient-to-br from-dell-light-blue to-white p-6 rounded-xl mb-6">
                                <h3 className="text-xl font-semibold text-dell-dark-gray mb-4">
                                    Why This Laptop is Perfect for You
                                </h3>
                                <div className="prose prose-sm">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {marketing_text}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-dell-dark-gray mb-3">
                                    Why We Chose This for You
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {reasoning}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Preferences Summary */}
                <div className="card mb-8">
                    <h3 className="text-xl font-semibold text-dell-dark-gray mb-4">
                        Your Preferences Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-medium mr-2">Student:</span>
                                <span className={userPreferences.is_student ? 'text-green-600' : 'text-gray-600'}>
                                    {userPreferences.is_student ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium mr-2">Gaming:</span>
                                <span className={userPreferences.likes_gaming ? 'text-green-600' : 'text-gray-600'}>
                                    {userPreferences.likes_gaming ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium mr-2">AI/ML Work:</span>
                                <span className={userPreferences.ai_ml_work ? 'text-green-600' : 'text-gray-600'}>
                                    {userPreferences.ai_ml_work ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-medium mr-2">Priority:</span>
                                <span className="text-dell-blue font-medium">
                                    {userPreferences.priority.charAt(0).toUpperCase() + userPreferences.priority.slice(1)}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium mr-2">Budget:</span>
                                <span className={`font-medium ${getBudgetColor(userPreferences.budget)}`}>
                                    {userPreferences.budget.charAt(0).toUpperCase() + userPreferences.budget.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/questionnaire')}
                        className="btn-secondary"
                    >
                        Start Over
                    </button>
                    <a
                        href={laptop.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-center"
                    >
                        Explore on Dell.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage; 