import { 
  LayoutDashboard, 
  History, 
  PlusCircle, 
  FileText,
  ShoppingBasket,
  UserCircle2,
  LogIn 
} from "lucide-react";

interface SidebarProps {
  activeProject: string;
  onSelectProject: (projectName: string) => void;
}

export default function Sidebar({ activeProject, onSelectProject }: SidebarProps) {
  const projects = [
    { id: 1, name: "Modern Dashboard" },
    { id: 2, name: "Login Page" },
    { id: 3, name: "E-commerce Product Cards" }
  ];
  
  const recentGenerations = [
    "Dashboard with analytics",
    "Social media profile page",
    "Contact form with validation"
  ];
  
  const templates = [
    { name: "Dashboard", icon: <LayoutDashboard className="text-gray-500 dark:text-gray-300 mb-1" size={18} /> },
    { name: "Login", icon: <LogIn className="text-gray-500 dark:text-gray-300 mb-1" size={18} /> },
    { name: "E-commerce", icon: <ShoppingBasket className="text-gray-500 dark:text-gray-300 mb-1" size={18} /> },
    { name: "Profile", icon: <UserCircle2 className="text-gray-500 dark:text-gray-300 mb-1" size={18} /> }
  ];
  
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</h2>
          <div className="space-y-1">
            {projects.map((project) => (
              <button 
                key={project.id}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeProject === project.name 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-colors`}
                onClick={() => onSelectProject(project.name)}
              >
                <div className="flex items-center space-x-2">
                  <FileText size={16} />
                  <span>{project.name}</span>
                </div>
                {activeProject === project.name && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Generations</h2>
          <ul className="mt-2 space-y-2">
            {recentGenerations.map((generation, idx) => (
              <li 
                key={idx}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
              >
                <History className="mr-2 text-gray-400" size={16} />
                <span>{generation}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Templates</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {templates.map((template, idx) => (
              <button 
                key={idx}
                className="px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors flex flex-col items-center"
              >
                {template.icon}
                <span>{template.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            <PlusCircle className="mr-1" size={16} />
            <span>New Project</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
