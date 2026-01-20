import React from 'react';
import { useData } from '../../context/DataContext';
import { Bell, Calendar, Image as ImageIcon, PlusCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { notices, events, gallery } = useData();

  const stats = [
    { 
      title: 'Notices', 
      count: notices.length, 
      icon: Bell, 
      color: 'bg-blue-500', 
      lightColor: 'bg-blue-50 dark:bg-slate-800',
      textColor: 'text-blue-600 dark:text-blue-400',
      link: '/admin/notices' 
    },
    { 
      title: 'Events', 
      count: events.length, 
      icon: Calendar, 
      color: 'bg-emerald-500', 
      lightColor: 'bg-emerald-50 dark:bg-slate-800',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      link: '/admin/events' 
    },
    { 
      title: 'Photos', 
      count: gallery.length, 
      icon: ImageIcon, 
      color: 'bg-purple-500', 
      lightColor: 'bg-purple-50 dark:bg-slate-800',
      textColor: 'text-purple-600 dark:text-purple-400',
      link: '/admin/gallery' 
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Link 
            key={stat.title} 
            to={stat.link} 
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.lightColor} ${stat.textColor} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                <stat.icon size={26} />
              </div>
              <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs px-2 py-1 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-slate-700 transition-colors">
                Manage
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stat.count}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-maroon-900 to-maroon-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-xl mb-4 text-saffron-500">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin/notices" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors backdrop-blur-sm">
                <PlusCircle size={20} className="text-saffron-400" />
                <span className="font-medium text-white">Post New Notice</span>
              </Link>
              <Link to="/admin/events" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors backdrop-blur-sm">
                <PlusCircle size={20} className="text-saffron-400" />
                <span className="font-medium text-white">Add Upcoming Event</span>
              </Link>
              <Link to="/admin/gallery" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors backdrop-blur-sm">
                <PlusCircle size={20} className="text-saffron-400" />
                <span className="font-medium text-white">Upload Photos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">Recent Updates</h3>
            <Link to="/" className="text-sm text-maroon-900 dark:text-saffron-500 hover:underline flex items-center gap-1">
              View Site <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {notices.length > 0 && (
              <div className="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-xl border border-blue-100 dark:border-slate-700 flex gap-4 items-center">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-blue-500 shrink-0">
                  <Bell size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-0.5">Latest Notice</p>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm line-clamp-1">{notices[0].title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notices[0].date}</p>
                </div>
              </div>
            )}

            {events.length > 0 && (
              <div className="bg-emerald-50 dark:bg-slate-800/50 p-4 rounded-xl border border-emerald-100 dark:border-slate-700 flex gap-4 items-center">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-emerald-500 shrink-0">
                  <Calendar size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-0.5">Upcoming Event</p>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm line-clamp-1">{events[0].title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{events[0].date} • {events[0].location}</p>
                </div>
              </div>
            )}

            {notices.length === 0 && events.length === 0 && (
              <p className="text-gray-400 text-center py-8">No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;