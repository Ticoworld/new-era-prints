import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from './Loader';

const ProtectedRouteContest = ({ children }) => {
  const [contestActive, setContestActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchContestStatus = async () => {
      try {
        const response = await fetch(`${serverUrl}/setting/getContestStatus`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setContestActive(data.contestActive);

        // If contest is inactive, show a warning and redirect
        if (!data.contestActive) {
          Swal.fire({
            icon: 'warning',
            title: 'Contest Inactive',
            text: 'The contest is currently inactive. You cannot access this page.',
            timer: 2000,
            showConfirmButton: false,
            didClose: () => navigate('/'),
          });
        }
      } catch (error) {
        console.error('Failed to fetch contest status:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContestStatus();
  }, [navigate]);

  if (loading) return <div><Loader /></div>;

  return contestActive ? children : null;
};

export default ProtectedRouteContest;
