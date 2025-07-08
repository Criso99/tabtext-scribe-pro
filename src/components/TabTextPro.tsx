import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, Save, FolderOpen, Search, RotateCcw, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  title: string;
  content: string;
  saved: boolean;
  wordCount: number;
}

const TabTextPro = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: 'Untitled Document', content: '', saved: true, wordCount: 0 }
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('tabtext-theme');
    return saved ? saved === 'dark' : false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('tabtext-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const createNewDocument = () => {
    const newId = Date.now().toString();
    const newDoc: Document = {
      id: newId,
      title: 'Untitled Document',
      content: '',
      saved: true,
      wordCount: 0
    };
    setDocuments([...documents, newDoc]);
    setActiveTab(newId);
  };

  const closeDocument = (id: string) => {
    if (documents.length === 1) return;
    
    const newDocs = documents.filter(doc => doc.id !== id);
    setDocuments(newDocs);
    
    if (activeTab === id) {
      setActiveTab(newDocs[0].id);
    }
  };

  const updateDocument = (id: string, content: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id 
          ? { 
              ...doc, 
              content, 
              saved: false,
              wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length
            }
          : doc
      )
    );
  };

  const saveDocument = () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc) return;

    // Mock save functionality
    setDocuments(docs => 
      docs.map(d => d.id === activeTab ? { ...d, saved: true } : d)
    );
    
    toast({
      title: "Document saved",
      description: `${doc.title} has been saved successfully.`,
    });
  };

  const openFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newId = Date.now().toString();
      const newDoc: Document = {
        id: newId,
        title: file.name,
        content,
        saved: true,
        wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length
      };
      setDocuments([...documents, newDoc]);
      setActiveTab(newId);
    };
    reader.readAsText(file);
  };

  const findAndReplace = () => {
    if (!searchTerm) return;

    const doc = documents.find(d => d.id === activeTab);
    if (!doc) return;

    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const newContent = doc.content.replace(regex, replaceTerm);
    
    if (newContent !== doc.content) {
      updateDocument(activeTab, newContent);
      toast({
        title: "Replace completed",
        description: `Replaced "${searchTerm}" with "${replaceTerm}".`,
      });
    } else {
      toast({
        title: "No matches found",
        description: `No instances of "${searchTerm}" were found.`,
      });
    }
  };

  const improveText = async () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc || !doc.content.trim()) {
      toast({
        title: "No content to improve",
        description: "Please add some text before using the AI improver.",
      });
      return;
    }

    // Mock AI improvement - in real app would call LLM API
    toast({
      title: "AI Improvement",
      description: "AI text improvement would analyze and enhance your content here.",
    });
  };

  const undoAction = () => {
    // Mock undo functionality
    toast({
      title: "Undo",
      description: "Undo functionality would revert the last change.",
    });
  };

  const activeDocument = documents.find(doc => doc.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-heading font-bold text-foreground">TabText Pro</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={createNewDocument}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
          <Button variant="ghost" size="sm" onClick={openFile}>
            <FolderOpen className="h-4 w-4 mr-1" />
            Open
          </Button>
          <Button variant="ghost" size="sm" onClick={saveDocument}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={undoAction}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Undo
          </Button>
          
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4 mr-1" />
                Find
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Find and Replace</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Find..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Input
                  placeholder="Replace with..."
                  value={replaceTerm}
                  onChange={(e) => setReplaceTerm(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="caseSensitive"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="caseSensitive" className="text-sm">Case sensitive</label>
                </div>
                <Button onClick={findAndReplace} className="w-full">
                  Replace All
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" onClick={improveText}>
            <Sparkles className="h-4 w-4 mr-1" />
            AI Improve
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none bg-muted/50 p-0 h-auto">
          {documents.map((doc) => (
            <TabsTrigger
              key={doc.id}
              value={doc.id}
              className="tab-item relative px-4 py-2 flex items-center gap-2 rounded-none"
            >
              <span className="truncate max-w-32">
                {doc.title}{!doc.saved && '*'}
              </span>
              {documents.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeDocument(doc.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Editor Area */}
        <div className="flex-1">
          {documents.map((doc) => (
            <TabsContent key={doc.id} value={doc.id} className="h-full m-0">
              <Textarea
                value={doc.content}
                onChange={(e) => updateDocument(doc.id, e.target.value)}
                className="editor-area h-full min-h-[500px] resize-none border-0 focus:ring-0 font-body text-base leading-relaxed p-6"
                placeholder="Start typing your document..."
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Status Bar */}
      <footer className="status-bar px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{activeDocument?.title || 'No document'}</span>
          <span>Words: {activeDocument?.wordCount || 0}</span>
          <span>{activeDocument?.saved ? 'Saved' : 'Unsaved'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>TabText Pro v1.0</span>
        </div>
      </footer>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md"
        onChange={handleFileOpen}
        className="hidden"
      />
    </div>
  );
};

export default TabTextPro;