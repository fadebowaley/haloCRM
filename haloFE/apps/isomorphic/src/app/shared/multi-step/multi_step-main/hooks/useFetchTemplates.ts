// hooks/useFetchTemplates.ts
import { useState, useEffect } from 'react';
import { IndustryTemplate } from '../utils/types';

interface ApiResponse {
  industryTemplates: IndustryTemplate[];
}

const useFetchTemplates = () => {
  const [industryTemplates, setIndustryTemplates] = useState<IndustryTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your backend API endpoint
    const fetchIndustryTemplates = async () => {
      try {
        const response = await fetch('http://localhost:3000/v1/roles/templates');  // Example API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch industry templates');
        }

        // Type assertion here: assert the response as the correct type
        const data = (await response.json()) as ApiResponse;  // Assert the response as ApiResponse

        // Access the industryTemplates array from the response object
        const templates = data.industryTemplates;

        if (Array.isArray(templates)) {
          setIndustryTemplates(templates);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        setError('Failed to load industry templates.');
      } finally {
        setLoading(false);
      }
    };

    fetchIndustryTemplates();
  }, []);  // Empty dependency array means this runs once on mount

  return { industryTemplates, loading, error };
};

export default useFetchTemplates;
