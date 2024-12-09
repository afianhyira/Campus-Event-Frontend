import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const eventResponse = await axios.get(`/events/${id}`);
      setEvent(eventResponse.data);

      if (user) {
        const registrationResponse = await axios.get(`/events/${id}/check-registration`);
        setIsRegistered(registrationResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Fetch Event Details Error:', error);
      toast.error('Failed to fetch event details');
      navigate('/events');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`/events/${id}/register`);
      toast.success('Successfully registered for the event!');
      setIsRegistered(true);
      fetchEventDetails(); // Refresh event details to update available seats
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register for event');
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await axios.delete(`/events/${id}/register`);
      toast.success('Registration cancelled successfully');
      setIsRegistered(false);
      fetchEventDetails(); // Refresh event details to update available seats
    } catch (error) {
      toast.error('Failed to cancel registration');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-2xl leading-6 font-medium text-gray-900">
              {event.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {event.description}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Event Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                    <ClockIcon className="h-5 w-5 text-gray-400 mx-2" />
                    {new Date(event.date).toLocaleTimeString()}
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {event.location}
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Available Seats</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {event.availableSeats} seats available
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-5 sm:px-6">
            {user ? (
              isRegistered ? (
                <button
                  onClick={handleCancelRegistration}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Cancel Registration
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={event.availableSeats === 0}
                  className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    event.availableSeats === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                  }`}
                >
                  {event.availableSeats === 0 ? 'Event Full' : 'Register for Event'}
                </button>
              )
            ) : (
              <p className="text-sm text-gray-500">
                Please{' '}
                <a href="/login" className="text-indigo-600 hover:text-indigo-500">
                  login
                </a>{' '}
                to register for this event.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}