import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout({ children, authentication = true }) {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && !isAuthenticated) {
      // If route requires auth but user is not logged in, redirect to login
      navigate('/login');
    } else if (!authentication && isAuthenticated) {
      // If route does NOT require auth but user is logged in, redirect home
      navigate('/');
    }
  }, [authentication, isAuthenticated, navigate]);

  return <>{children}</>;
}
