import { FaFileAlt } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="h-[89dvh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          <div className="bg-primary inline-block p-6 rounded-full mb-8">
            <FaFileAlt className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-secondary mb-6">
            Page Not Found
          </h2>
          <p className="text-primary/70 mb-8 text-lg">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center px-6 py-3 cursor-pointer bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200 font-medium"
          >
            Go Back
            <IoArrowBack className="w-5 h-5 mr-2" />
          </button>
        </div>

        {/* ERP System Navigation Hint */}
        <div className="mt-12 text-center">
          <p className="text-primary/50 text-sm">
            If you believe this is an error, please contact your system
            administrator
          </p>
          <p className="text-primary/50 text-sm mt-1">
            Error Code: ERR_PAGE_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
