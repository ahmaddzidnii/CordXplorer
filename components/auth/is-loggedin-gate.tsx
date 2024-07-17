interface IsLoggedinGateProps {
  children: React.ReactNode;
}

export const isLoggedinGate = ({ children }: IsLoggedinGateProps) => {
  return <>{children}</>;
};
