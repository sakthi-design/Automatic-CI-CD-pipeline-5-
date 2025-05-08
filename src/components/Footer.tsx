
import { Github } from "lucide-react";
import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code size={24} className="text-blue" />
              <span className="font-bold text-xl">Deploy-It-Now</span>
            </div>
            <p className="text-gray-300 text-sm">
              Seamless CI/CD pipelines with Jenkins and Docker integration.
              Automate your deployments with ease.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-blue transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="text-gray-300 hover:text-blue transition-colors">Features</a></li>
              <li><a href="/pipelines" className="text-gray-300 hover:text-blue transition-colors">Pipelines</a></li>
              <li><a href="/integrations" className="text-gray-300 hover:text-blue transition-colors">Integrations</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-blue transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/documentation" className="text-gray-300 hover:text-blue transition-colors">Documentation</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-blue transition-colors">Blog</a></li>
              <li><a href="/case-studies" className="text-gray-300 hover:text-blue transition-colors">Case Studies</a></li>
              <li><a href="/tutorials" className="text-gray-300 hover:text-blue transition-colors">Tutorials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-blue transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-blue transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue transition-colors">Contact</a></li>
              <li><a href="/legal" className="text-gray-300 hover:text-blue transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Deploy-It-Now. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-400 hover:text-blue text-sm transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-gray-400 hover:text-blue text-sm transition-colors">Privacy Policy</a>
            <a href="/cookies" className="text-gray-400 hover:text-blue text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
