import { AuthGuard } from 'src/guards/auth-guard';

export const withAuthGuard = (Component) => {
  const WrappedComponent = (props) => (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );

  // Set a displayName for the wrapped component
  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
