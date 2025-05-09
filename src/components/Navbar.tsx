
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from 'react-router-dom';
import { Code, Settings } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2" onClick={() => navigate('/')} role="button">
          <Code size={24} className="text-blue" />
          <span className="font-bold text-xl">Deploy-It-Now</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate hover:text-blue transition-colors">Features</Link>
          <Link to="/dashboard" className="text-slate hover:text-blue transition-colors">Pipelines</Link>
          <Link to="/" className="text-slate hover:text-blue transition-colors">Documentation</Link>
          <Link to="/" className="text-slate hover:text-blue transition-colors">Pricing</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/register')}>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
