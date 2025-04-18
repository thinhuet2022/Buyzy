import React from 'react';

const StepIndicator = ({currentStep, totalSteps, stepLabels}) => {
    return (
        <div className="flex justify-between items-center mb-8">
            {Array.from({length: totalSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index + 1 <= currentStep
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {index + 1}
                        </div>
                        <div className="ml-2 text-sm font-medium">{stepLabels[index]}</div>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className="flex-1 h-1 mx-4 bg-gray-200">
                            <div
                                className={`h-full bg-primary-600 transition-all duration-300 ${
                                    index + 1 < currentStep ? 'w-full' : 'w-0'
                                }`}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator; 