import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import SelectSector from './SelectSector';
import ChooseLaws from './ChooseLaws';
import SetDeadlines from './SetDeadlines';
import UploadDocs from './UploadDocs';

const STEPS = [
  { key: 'company', label: 'Company profile' },
  { key: 'sector', label: 'Select sector' },
  { key: 'laws', label: 'Choose laws' },
  { key: 'deadlines', label: 'Set deadlines' },
  { key: 'upload', label: 'Upload docs' },
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    company: { name: '', industry: '', size: '', country: '' },
    selectedSectors: [],
    selectedLaws: [],
    deadlines: {},
    documents: [],
  });

  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - complete onboarding
      navigate('/dashboard');
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyProfile data={data.company} onChange={(val) => updateData('company', val)} />;
      case 1:
        return <SelectSector selected={data.selectedSectors} onChange={(val) => updateData('selectedSectors', val)} />;
      case 2:
        return <ChooseLaws sectors={data.selectedSectors} selected={data.selectedLaws} onChange={(val) => updateData('selectedLaws', val)} />;
      case 3:
        return <SetDeadlines laws={data.selectedLaws} deadlines={data.deadlines} onChange={(val) => updateData('deadlines', val)} />;
      case 4:
        return <UploadDocs documents={data.documents} onChange={(val) => updateData('documents', val)} />;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((step, index) => (
            <div key={step.key} className="stepper-step">
              <div className={`stepper-dot ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`} />
              <span className={`stepper-label ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="wizard-nav">
          {currentStep > 0 && (
            <button className="btn-back" onClick={goBack}>Back</button>
          )}
          <button className="btn-continue" onClick={goNext}>
            {currentStep === STEPS.length - 1 ? 'Finish setup ✓' : `Continue — ${STEPS[currentStep + 1]?.label} ↗`}
          </button>
        </div>
      </div>
    </div>
  );
}
