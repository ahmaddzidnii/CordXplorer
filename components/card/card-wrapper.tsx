export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-12 gap-2">{children}</div>;
};
