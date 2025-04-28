import { useState } from 'react';
import { User } from '../utils/types';
import FileUpload from './FileUpload';
import { Role } from '../utils/types'; // adjust the path based on your directory structure


interface StepThreeProps {
  roles: Role[]; // Ensure that the 'Role' type is defined and passed
  onContinue: (users: User[]) => void;
  onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ roles = [], onContinue, onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleFileUpload = (uploadedUsers: User[]) => {
    setUsers(uploadedUsers);
    setFormErrors({}); // Clear any previous errors on file upload
  };

  const handleContinue = () => {
    // You might want to validate the users after file upload if needed
    if (users.length > 0) {
      onContinue(users); // Proceed with the uploaded users
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bulk Upload Users</h2>
      <p className="text-gray-600 mb-8">
        You can upload a CSV file to add users in bulk.
      </p>

      <div className="bg-gray-100 rounded-lg mb-8">
        <div className="p-6 bg-white rounded-lg">
          <FileUpload onFileUpload={handleFileUpload} />

          {users.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Preview: {users.length} user{users.length > 1 ? 's' : ''} loaded
              </h3>
              <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map((user, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{user.role}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{user.phone || '-'}</td>
                      </tr>
                    ))}
                    {users.length > 5 && (
                      <tr className="border-t border-gray-200">
                        <td colSpan={4} className="px-4 py-2 text-sm text-gray-500 italic">
                          ...and {users.length - 5} more
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={users.length === 0}
          className={`px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            users.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepThree;
