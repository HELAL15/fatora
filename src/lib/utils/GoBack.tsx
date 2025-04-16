import { useNavigate, useLocation } from 'react-router-dom';

const useGoBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return goBack;
};

export default useGoBack;
