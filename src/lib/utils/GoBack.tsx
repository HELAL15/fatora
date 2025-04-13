import { useNavigate } from 'react-router-dom';

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return goBack;
};

export default useGoBack;
