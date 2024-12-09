import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      name: 'Workshops',
      description: 'Enhance your skills with hands-on workshops led by industry experts.',
      icon: AcademicCapIcon,
    },
    {
      name: 'Seminars',
      description: 'Stay updated with the latest trends through informative seminars.',
      icon: UserGroupIcon,
    },
    {
      name: 'Club Activities',
      description: 'Join various club activities and connect with like-minded peers.',
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Campus Event Management System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover and participate in exciting campus events, workshops, seminars, and club activities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Link
                  to="/events"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Browse Events
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started
                </Link>
              )}
              <Link
                to="/calendar"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                View Calendar <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover Campus Events
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore a variety of events designed to enhance your campus experience and professional development.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 