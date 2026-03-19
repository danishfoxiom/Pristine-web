import { useNavigate } from 'react-router-dom';
import AuthModal from '../../components/AuthModal';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <AuthModal 
        isOpen={true} 
        onClose={() => navigate('/dashboard')} 
      />
    </div>
  );
}
