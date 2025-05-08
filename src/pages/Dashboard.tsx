import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Package, Server, Code, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Pipeline {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  lastRun: string;
  steps: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Frontend Deploy',
      status: 'success',
      lastRun: '10 minutes ago',
      steps: 3
    },
    {
      id: '2',
      name: 'Backend API',
      status: 'running',
      lastRun: 'Just now',
      steps: 4
    },
    {
      id: '3',
      name: 'Database Backup',
      status: 'pending',
      lastRun: '2 hours ago',
      steps: 2
    }
  ]);
  
  // Form state for settings
  const [jenkinsUrl, setJenkinsUrl] = useState("https://jenkins.example.com");
  const [jenkinsToken, setJenkinsToken] = useState("");
  const [jenkinsUsername, setJenkinsUsername] = useState("jenkins_user");
  const [registryUrl, setRegistryUrl] = useState("docker.example.com");
  const [registryType, setRegistryType] = useState("Docker Hub");
  const [registryUsername, setRegistryUsername] = useState("docker_user");
  const [registryPassword, setRegistryPassword] = useState("");
  const [pipelineName, setPipelineName] = useState("Production Deployment");
  
  // Pipeline editing state
  const [activeStepName, setActiveStepName] = useState("");
  const [activeStepCommand, setActiveStepCommand] = useState("");

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'success':
        return <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">Success</span>;
      case 'running':
        return <span className="px-2 py-1 text-xs bg-blue/10 text-blue rounded-full flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue animate-pulse"></span> Running
        </span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">Pending</span>;
    }
  };

  const triggerPipeline = (id: string) => {
    setPipelines(prev => 
      prev.map(pipeline => 
        pipeline.id === id 
          ? { ...pipeline, status: 'running', lastRun: 'Just now' } 
          : pipeline
      )
    );
    
    toast({
      title: "Pipeline triggered",
      description: "Your pipeline is now running.",
    });
  };
  
  const handleSaveJenkinsConfig = () => {
    toast({
      title: "Jenkins configuration saved",
      description: "Your Jenkins settings have been updated.",
    });
  };
  
  const handleSaveDockerConfig = () => {
    toast({
      title: "Docker registry configuration saved",
      description: "Your Docker registry settings have been updated.",
    });
  };
  
  const handleSaveStepChanges = () => {
    toast({
      title: "Step configuration saved",
      description: "Your pipeline step has been updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button>
              <Package className="mr-2 h-4 w-4" /> New Pipeline
            </Button>
          </div>
          
          <Tabs defaultValue="pipelines">
            <TabsList>
              <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
              <TabsTrigger value="builds">Builds</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pipelines" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pipelines.map((pipeline) => (
                  <Card key={pipeline.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{pipeline.name}</CardTitle>
                        {getStatusBadge(pipeline.status)}
                      </div>
                      <CardDescription>Last run: {pipeline.lastRun}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-muted-foreground">{pipeline.steps} steps</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => triggerPipeline(pipeline.id)}>
                            Run
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            pipeline.status === 'success' 
                              ? 'bg-success' 
                              : pipeline.status === 'running' 
                                ? 'bg-blue animate-pulse' 
                                : 'bg-muted'
                          }`} 
                          style={{ width: pipeline.status === 'success' ? '100%' : pipeline.status === 'running' ? '60%' : '0%' }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed border-2 flex items-center justify-center h-[190px] card-hover">
                  <CardContent>
                    <Button variant="ghost" className="h-20 w-20 rounded-full">
                      <span className="text-2xl">+</span>
                    </Button>
                    <p className="text-center mt-2">Create New Pipeline</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="builds">
              <div className="bg-card shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="text-left py-3 px-4">Build ID</th>
                        <th className="text-left py-3 px-4">Pipeline</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Started</th>
                        <th className="text-left py-3 px-4">Duration</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">#1234</td>
                        <td className="py-3 px-4">Frontend Deploy</td>
                        <td className="py-3 px-4">{getStatusBadge('success')}</td>
                        <td className="py-3 px-4">10 minutes ago</td>
                        <td className="py-3 px-4">1m 24s</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">View Logs</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">#1233</td>
                        <td className="py-3 px-4">Backend API</td>
                        <td className="py-3 px-4">{getStatusBadge('running')}</td>
                        <td className="py-3 px-4">Just now</td>
                        <td className="py-3 px-4">43s</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">View Logs</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">#1232</td>
                        <td className="py-3 px-4">Database Backup</td>
                        <td className="py-3 px-4">{getStatusBadge('pending')}</td>
                        <td className="py-3 px-4">2 hours ago</td>
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="ghost">View Logs</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Jenkins Configuration</CardTitle>
                  <CardDescription>Configure your Jenkins server connection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Jenkins URL</label>
                      <Input
                        type="text"
                        value={jenkinsUrl}
                        onChange={(e) => setJenkinsUrl(e.target.value)}
                        placeholder="https://jenkins.example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Token</label>
                      <Input
                        type="password"
                        value={jenkinsToken}
                        onChange={(e) => setJenkinsToken(e.target.value)}
                        placeholder="••••••••••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <Input
                      type="text"
                      value={jenkinsUsername}
                      onChange={(e) => setJenkinsUsername(e.target.value)}
                      placeholder="jenkins_user"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveJenkinsConfig}>Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Docker Registry</CardTitle>
                  <CardDescription>Configure your Docker registry settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Registry URL</label>
                      <Input
                        type="text"
                        value={registryUrl}
                        onChange={(e) => setRegistryUrl(e.target.value)}
                        placeholder="docker.example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Registry Type</label>
                      <select 
                        className="w-full px-3 py-2 border rounded"
                        value={registryType}
                        onChange={(e) => setRegistryType(e.target.value)}
                      >
                        <option>Docker Hub</option>
                        <option>Amazon ECR</option>
                        <option>Google GCR</option>
                        <option>Azure Container Registry</option>
                        <option>Private Registry</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        type="text"
                        value={registryUsername}
                        onChange={(e) => setRegistryUsername(e.target.value)}
                        placeholder="docker_user"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password/Token</label>
                      <Input
                        type="password"
                        value={registryPassword}
                        onChange={(e) => setRegistryPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveDockerConfig}>Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
