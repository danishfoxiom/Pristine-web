import { useGlobalLoader } from '../hooks/useGlobalLoader';
import { useToast } from '../context/ToastContext';

// Example of how to use the global loading spinner in any component
export function ExampleUsage() {
  const { showLoader, hideLoader, isLoading } = useGlobalLoader();
  const { addToast } = useToast();

  const handleAsyncOperation = async () => {
    // Show the global loading spinner
    showLoader();
    
    try {
      // Simulate an API call or async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Your async logic here
      addToast('Operation completed successfully!', 'success');
      
    } catch (error) {
      addToast('Operation failed. Please try again.', 'error');
    } finally {
      // Hide the global loading spinner
      hideLoader();
    }
  };

  return (
    <div>
      <button 
        onClick={handleAsyncOperation}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Start Operation'}
      </button>
    </div>
  );
}
