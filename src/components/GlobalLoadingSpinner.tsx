import { useLoading } from '../context/LoadingContext';
import Loader from './loadingSpin';

export default function GlobalLoadingSpinner() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader />
        <p className="text-white text-lg font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
