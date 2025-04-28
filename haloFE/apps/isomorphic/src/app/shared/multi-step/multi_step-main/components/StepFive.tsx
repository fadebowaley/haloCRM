import { useEffect } from 'react';
import { useRouter } from 'next/router';  // Import useRouter for Next.js routing

interface StepFiveProps {
  onFinish: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({ onFinish }) => {
  const router = useRouter();  // Use the Next.js router

  useEffect(() => {
    // Redirect after 5 seconds (simulating)
    const timer = setTimeout(() => {
      router.push('/dashboard');  // Redirect to the dashboard route
    }, 5000);  // 5 seconds delay for redirection
    
    return () => clearTimeout(timer);  // Cleanup timeout on component unmount
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Setup Complete!
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        Continue your work while the system sets up your business.
      </p>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="flex items-start">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Add your customers</p>
              <p className="text-sm text-gray-500">Import or create your customer database</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Schedule activities</p>
              <p className="text-sm text-gray-500">Plan customer follow-ups and tasks</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">Customize settings</p>
              <p className="text-sm text-gray-500">Fine-tune your HaloCRM preferences</p>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/dashboard')}  // Redirect manually when the button is clicked
        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Go to Dashboard
      </button>
      
      <p className="mt-4 text-sm text-gray-500">
        You'll be redirected to your dashboard in a few seconds...
      </p>
      
      <div className="mt-4">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
