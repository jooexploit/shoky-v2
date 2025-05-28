import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BookOpenText, Compass, Search, Home, Info } from "lucide-react"; // Combined icons

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-gray-900 p-6 text-center selection:bg-indigo-500 selection:text-white">
      <div className="max-w-xl w-full">
        {/* Icon from Option 1's color scheme */}
        <BookOpenText className="h-24 w-24 text-indigo-500 dark:text-indigo-400 mx-auto mb-6" strokeWidth={1.2} />
        
        {/* Thematic title from Option 2, with Option 1's color */}
        <h1 className="text-5xl sm:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          Lost in the Stacks?
        </h1>
        {/* Thematic description from Option 2, with Option 1's text color style */}
        <p className="text-xl text-gray-700 dark:text-neutral-300 mb-2">
          It seems this page has been misplaced or doesn't exist in our library.
        </p>
        <p className="text-gray-500 dark:text-neutral-400 mb-8 text-sm sm:text-base">
          Don't worry, even the best librarians misplace a book sometimes!
          The page at <code className="bg-indigo-100 dark:bg-neutral-700 p-0.5 rounded text-indigo-700 dark:text-indigo-400">{location.pathname}</code> couldn't be found.
        </p>

        {/* Card structure from Option 2, styled with Option 1's card and button colors */}
        <div className="bg-white dark:bg-neutral-800 p-6 sm:p-8 rounded-xl shadow-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-neutral-200 mb-5">Let's find your way:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/"
              className="group flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-neutral-800 transition-all shadow-md"
            >
              <Home className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              Go to Homepage
            </Link>
            <Link
              to="/courses" // Assuming you have a courses page
              className="group flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-neutral-800 transition-all shadow-md"
            >
              <Compass className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
              Explore Courses
            </Link>
          </div>
          
        </div>
        
        <Link to="#" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline flex items-center justify-center mt-2">
            <Info className="h-4 w-4 mr-1" /> Contact Support if you need help
        </Link>

        <p className="mt-8 text-xs text-gray-500 dark:text-neutral-500">
          Error Code: 404 - Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;