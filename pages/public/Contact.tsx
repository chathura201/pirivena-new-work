import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif font-bold text-center text-maroon-900 dark:text-saffron-500 mb-10 animate-zoom-in">සම්බන්ධ වන්න</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Info Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg h-full border border-gray-100 dark:border-slate-800 animate-slide-in-left">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">විමසීම්</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="bg-saffron-100 dark:bg-slate-800 p-3 rounded-full text-maroon-900 dark:text-saffron-500 group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">ලිපිනය</h4>
                <p className="text-gray-600 dark:text-gray-400">ශ්‍රී සුමන මහා පිරිවෙන,<br/>මුද්දුව, රත්නපුර.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-saffron-100 dark:bg-slate-800 p-3 rounded-full text-maroon-900 dark:text-saffron-500 group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">දුරකථන</h4>
                <p className="text-gray-600 dark:text-gray-400">045-222XXXX</p>
                <p className="text-gray-600 dark:text-gray-400">077-XXXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-saffron-100 dark:bg-slate-800 p-3 rounded-full text-maroon-900 dark:text-saffron-500 group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">විද්‍යුත් තැපෑල</h4>
                <p className="text-gray-600 dark:text-gray-400">info@srisumanapirivena.lk</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-saffron-100 dark:bg-slate-800 p-3 rounded-full text-maroon-900 dark:text-saffron-500 group-hover:bg-maroon-900 group-hover:text-white transition-colors duration-300">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">කාර්යාල වේලාවන්</h4>
                <p className="text-gray-600 dark:text-gray-400">සඳුදා - සිකුරාදා: පෙ.ව 8.00 - ප.ව 4.00</p>
                <p className="text-gray-600 dark:text-gray-400">සෙනසුරාදා: පෙ.ව 8.00 - ප.ව 12.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] md:h-auto bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg animate-slide-in-right delay-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.067332219717!2d80.3920!3d6.7610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDUnNDAuMCJOIDgwwrAyMyczMS4yIkU!5e0!3m2!1sen!2slk!4v1634567890123!5m2!1sen!2slk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Google Map"
            className="filter dark:grayscale dark:invert-[0.9] dark:contrast-[0.85] transition-all duration-300"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;