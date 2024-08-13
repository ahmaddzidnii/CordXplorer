import "./switch-value.css";

export const SwitchValue = ({
  id,
  value,
  onValueChange,
  children,
}: {
  children: React.ReactNode;
  id: string;
  value?: boolean;
  onValueChange?: (checked: boolean) => void;
}) => {
  return (
    <div>
      <input
        checked={value}
        type="checkbox"
        id={id}
        onChange={(e) => {
          onValueChange?.(e.target.checked);
        }}
        className="checkbox-options hidden"
      />
      <label htmlFor={id} className="switch">
        {children}
      </label>
    </div>
  );
};
