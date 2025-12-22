// Horizontal 4‑step stepper, numerals → tick when completed

export default function Stepper({ steps, currentStep, completed }) {
  return (
    <div className="register-header">
      <div className="stepper-row">
        {steps.map((label, index) => {
          const stepNumber = index+1;
          const isCompleted = completed[index];
          const isActive = currentStep === stepNumber;

          return (
            <div key={label} className="stepper-item">
              <div
                className={
                  "step-indicator " +
                  (isCompleted
                    ? "step-indicator--completed"
                    : isActive
                    ? "step-indicator--active"
                    : "")
                }
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <div className="stepper-label">
				{label}
              </div>
              {stepNumber !== steps.length && <div className="stepper-line-h" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
