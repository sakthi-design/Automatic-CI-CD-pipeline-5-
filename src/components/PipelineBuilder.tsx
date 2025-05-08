
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Package, Server, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PipelineStep {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deploy';
  status: 'pending' | 'running' | 'success' | 'failed';
  command: string;
}

const PipelineBuilder = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [pipelineName, setPipelineName] = useState("Production Deployment");
  const [steps, setSteps] = useState<PipelineStep[]>([
    { 
      id: '1', 
      name: 'Build Application', 
      type: 'build', 
      status: 'success',
      command: 'docker build -t myapp:$VERSION .'
    },
    { 
      id: '2', 
      name: 'Run Tests', 
      type: 'test', 
      status: 'success',
      command: 'docker run --rm myapp:$VERSION npm test'
    },
    { 
      id: '3', 
      name: 'Deploy to Staging', 
      type: 'deploy', 
      status: 'running',
      command: 'jenkins-cli deploy --env=staging --version=$VERSION'
    }
  ]);

  // For editing active step
  const [activeStepName, setActiveStepName] = useState("");
  const [activeStepCommand, setActiveStepCommand] = useState("");

  // Update form fields when a new step is selected
  const handleStepSelect = (stepId: string) => {
    setActiveStep(stepId);
    const selectedStep = steps.find(s => s.id === stepId);
    if (selectedStep) {
      setActiveStepName(selectedStep.name);
      setActiveStepCommand(selectedStep.command);
    }
  };

  // Save changes to the active step
  const handleSaveStep = () => {
    if (activeStep) {
      setSteps(prev => prev.map(step => 
        step.id === activeStep 
          ? { ...step, name: activeStepName, command: activeStepCommand } 
          : step
      ));
    }
  };

  // Delete the active step
  const handleDeleteStep = () => {
    if (activeStep) {
      setSteps(prev => prev.filter(step => step.id !== activeStep));
      setActiveStep(null);
    }
  };

  const getStepIcon = (type: string) => {
    switch(type) {
      case 'build': return <Package size={18} />;
      case 'test': return <Code size={18} />;
      case 'deploy': return <Server size={18} />;
      default: return <Settings size={18} />;
    }
  };

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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visual Pipeline Builder</h2>
          <p className="text-muted-foreground text-lg">
            Design, visualize, and execute your CI/CD pipelines with our interactive builder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Pipeline Steps</h3>
                <div className="space-y-8">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`pipeline-step ${activeStep === step.id ? 'border-blue' : ''}`}
                      onClick={() => handleStepSelect(step.id)}
                    >
                      {step.status === 'running' ? (
                        <div className="running-indicator"></div>
                      ) : step.status === 'success' ? (
                        <div className="active-indicator"></div>
                      ) : null}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-muted rounded">
                            {getStepIcon(step.type)}
                          </div>
                          <h4 className="font-medium">{step.name}</h4>
                        </div>
                        <div>
                          {getStatusBadge(step.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    + Add Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Pipeline Configuration</h3>
                
                <Tabs defaultValue="visual">
                  <TabsList className="mb-6">
                    <TabsTrigger value="visual">Visual Editor</TabsTrigger>
                    <TabsTrigger value="yaml">YAML</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visual" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Pipeline Name</label>
                        <Input
                          type="text"
                          value={pipelineName}
                          onChange={(e) => setPipelineName(e.target.value)}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      
                      {activeStep && (
                        <div className="space-y-4 border-t border-border pt-4 mt-4">
                          <h4 className="font-medium">Step Configuration</h4>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">Step Name</label>
                            <Input
                              type="text"
                              value={activeStepName}
                              onChange={(e) => setActiveStepName(e.target.value)}
                              className="w-full px-3 py-2 border rounded"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">Command</label>
                            <Textarea
                              value={activeStepCommand}
                              onChange={(e) => setActiveStepCommand(e.target.value)}
                              className="w-full px-3 py-2 border rounded min-h-[100px] font-mono text-sm"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={handleSaveStep}>Save Changes</Button>
                            <Button size="sm" variant="destructive" onClick={handleDeleteStep}>Delete Step</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="yaml">
                    <pre className="bg-navy text-white p-4 rounded-md overflow-x-auto text-sm">
                      <code>{`version: '2.1'
name: Production Deployment
pipeline:
  build:
    docker:
      - image: node:16
    steps:
      - checkout
      - run:
          name: Build Application
          command: docker build -t myapp:$VERSION .
  
  test:
    docker:
      - image: node:16
    steps:
      - checkout
      - run:
          name: Run Tests
          command: docker run --rm myapp:$VERSION npm test
  
  deploy:
    docker:
      - image: jenkins-agent:latest
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Deploy to Staging
          command: jenkins-cli deploy --env=staging --version=$VERSION`}</code>
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="logs">
                    <div className="bg-navy text-white p-4 rounded-md h-[300px] overflow-y-auto font-mono text-sm">
                      <p className="text-green-400">[2025-05-08 10:15:32] Starting pipeline: Production Deployment</p>
                      <p className="text-blue-300">[2025-05-08 10:15:33] Step 1: Build Application</p>
                      <p className="text-gray-300">Pulling docker image node:16...</p>
                      <p className="text-gray-300">Building application...</p>
                      <p className="text-gray-300">Creating Docker image myapp:1.0.0...</p>
                      <p className="text-success-light">[2025-05-08 10:17:45] Step 1 completed successfully</p>
                      
                      <p className="text-blue-300">[2025-05-08 10:17:46] Step 2: Run Tests</p>
                      <p className="text-gray-300">Running test suite...</p>
                      <p className="text-gray-300">42 tests passed, 0 failures</p>
                      <p className="text-success-light">[2025-05-08 10:18:30] Step 2 completed successfully</p>
                      
                      <p className="text-blue-300">[2025-05-08 10:18:31] Step 3: Deploy to Staging</p>
                      <p className="text-gray-300">Connecting to Jenkins server...</p>
                      <p className="text-gray-300">Triggering deployment job...</p>
                      <p className="text-gray-300">Deployment in progress...</p>
                      <p className="animate-pulse">[Running...]</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Run Pipeline</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineBuilder;
