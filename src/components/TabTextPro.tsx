import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, Save, FolderOpen, Search, RotateCcw, Moon, Sun, Sparkles, Key, Settings, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/lib/translations';

interface Document {
  id: string;
  title: string;
  content: string;
  saved: boolean;
  wordCount: number;
}

const TabTextPro = () => {
  const { language, t, changeLanguage } = useLanguage();
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: t.untitledDocument, content: '', saved: true, wordCount: 0 }
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mistralApiKey, setMistralApiKey] = useState(() => {
    return localStorage.getItem('mistral-api-key') || '';
  });
  const [isImproving, setIsImproving] = useState(false);
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

  // Save API key to localStorage
  const saveApiKey = (key: string) => {
    setMistralApiKey(key);
    localStorage.setItem('mistral-api-key', key);
    setIsSettingsOpen(false);
    toast({
      title: t.apiKeySaved,
      description: t.apiKeySavedDescription,
    });
  };

  const createNewDocument = () => {
    const newId = Date.now().toString();
    const newDoc: Document = {
      id: newId,
      title: t.untitledDocument,
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
      title: t.documentSaved,
      description: `${doc.title} ${t.documentSavedDescription}`,
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
        title: t.replaceCompleted,
        description: `${t.replaceCompletedDescription} "${searchTerm}" ${t.replaceCompletedDescription.includes('with') ? 'with' : 'con'} "${replaceTerm}".`,
      });
    } else {
      toast({
        title: t.noMatchesFound,
        description: `${t.noMatchesFoundDescription} "${searchTerm}" ${language === 'en' ? 'were found' : 'sono state trovate'}.`,
      });
    }
  };

  const improveText = async () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc || !doc.content.trim()) {
      toast({
        title: t.noContentToImprove,
        description: t.noContentToImproveDescription,
      });
      return;
    }

    // Get fresh API key from localStorage to ensure it's current
    const currentApiKey = localStorage.getItem('mistral-api-key') || mistralApiKey;
    
    if (!currentApiKey || currentApiKey.trim() === '') {
      toast({
        title: t.apiKeyRequired,
        description: t.apiKeyRequiredDescription,
      });
      setIsSettingsOpen(true);
      return;
    }

    setIsImproving(true);
    
    try {
      console.log('Making request to Mistral API...'); // Debug log
      
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentApiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'mistral-tiny',
          messages: [
            {
              role: 'system',
              content: 'You are a professional text editor. Improve the following text by correcting grammar, spelling, style, and tone. Return only the improved text without any explanations or additional commentary.'
            },
            {
              role: 'user',
              content: `Improve this text: ${doc.content}`
            }
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Mistral API key and try again.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('API response received:', data); // Debug log
      
      const improvedText = data.choices?.[0]?.message?.content;

      if (improvedText && improvedText.trim()) {
        updateDocument(activeTab, improvedText.trim());
        toast({
          title: t.textImproved,
          description: t.textImprovedDescription,
        });
      } else {
        throw new Error('No improved text received from API');
      }
    } catch (error) {
      console.error('Mistral API error:', error);
      toast({
        title: t.aiImprovementFailed,
        description: error instanceof Error ? error.message : t.aiImprovementFailedDescription,
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const undoAction = () => {
    // Mock undo functionality
    toast({
      title: t.undoAction,
      description: t.undoActionDescription,
    });
  };

  const activeDocument = documents.find(doc => doc.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-heading font-bold text-foreground">{t.appTitle}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={createNewDocument}>
            <Plus className="h-4 w-4 mr-1" />
            {t.newDocument}
          </Button>
          <Button variant="ghost" size="sm" onClick={openFile}>
            <FolderOpen className="h-4 w-4 mr-1" />
            {t.openFile}
          </Button>
          <Button variant="ghost" size="sm" onClick={saveDocument}>
            <Save className="h-4 w-4 mr-1" />
            {t.saveDocument}
          </Button>
          <Button variant="ghost" size="sm" onClick={undoAction}>
            <RotateCcw className="h-4 w-4 mr-1" />
            {t.undo}
          </Button>
          
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4 mr-1" />
                {t.findReplace}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.findReplaceTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder={t.findPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Input
                  placeholder={t.replacePlaceholder}
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
                  <label htmlFor="caseSensitive" className="text-sm">{t.caseSensitive}</label>
                </div>
                <Button onClick={findAndReplace} className="w-full">
                  {t.replaceAll}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" onClick={improveText} disabled={isImproving}>
            <Sparkles className="h-4 w-4 mr-1" />
            {isImproving ? t.improving : t.aiImprove}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Languages className="h-4 w-4 mr-1" />
                {t.language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => changeLanguage('en')}
                className={language === 'en' ? 'bg-accent' : ''}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('it')}
                className={language === 'it' ? 'bg-accent' : ''}
              >
                Italiano
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.settingsTitle}</DialogTitle>
                <DialogDescription>
                  {t.settingsDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">{t.apiKeyLabel}</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder={t.apiKeyPlaceholder}
                    defaultValue={mistralApiKey}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveApiKey((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.apiKeyDescription}
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    const input = document.getElementById('apiKey') as HTMLInputElement;
                    saveApiKey(input.value);
                  }}
                  className="w-full"
                >
                  <Key className="h-4 w-4 mr-2" />
                  {t.saveApiKey}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
                placeholder={t.editorPlaceholder}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Status Bar */}
      <footer className="status-bar px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{activeDocument?.title || t.noDocument}</span>
          <span>{t.words}: {activeDocument?.wordCount || 0}</span>
          <span>{activeDocument?.saved ? t.saved : t.unsaved}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t.version}</span>
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