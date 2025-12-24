// Reusable Button across the application

export function Button({
 
  buttonClassName,
  children,
  ...buttonProps
}) {
  return (
    <button {...buttonProps} className={buttonClassName}>
      {children}
    </button>
  );
}
