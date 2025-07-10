import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, Save, FolderOpen, Search, RotateCcw, Moon, Sun, Sparkles, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface Document {
  id: string;
  title: string;
  content: string;
  saved: boolean;
  wordCount: number;
  history: string[];
  historyIndex: number;
}

const TabTextPro = () => {
  const { language, t, changeLanguage } = useLanguage();
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: t.untitledDocument, content: '', saved: true, wordCount: 0, history: [''], historyIndex: 0 }
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
  const [isSaveAsOpen, setIsSaveAsOpen] = useState(false);
  const [customFileName, setCustomFileName] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);
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
      title: t.untitledDocument,
      content: '',
      saved: true,
      wordCount: 0,
      history: [''],
      historyIndex: 0
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
              wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
              history: [...doc.history.slice(0, doc.historyIndex + 1), content],
              historyIndex: doc.historyIndex + 1
            }
          : doc
      )
    );
  };



  const saveAsDocument = () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc) return;

    // Set initial filename for the dialog
    const initialFileName = doc.title === t.untitledDocument ? '' : doc.title.replace(/\.txt$/, '');
    setCustomFileName(initialFileName);
    setIsSaveAsOpen(true);
  };

  const handleSaveAs = () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc || !customFileName.trim()) return;

    // Create and download file with custom name
    const fileName = customFileName.endsWith('.txt') ? customFileName : `${customFileName}.txt`;
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Update document title and mark as saved
    setDocuments(docs => 
      docs.map(d => d.id === activeTab ? { ...d, title: fileName, saved: true } : d)
    );
    
    setIsSaveAsOpen(false);
    setCustomFileName('');
    
    toast({
      title: t.documentSaved,
      description: `${fileName} ${t.documentSavedDescription}`,
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
        wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
        history: [content],
        historyIndex: 0
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

  // Helper function to wait for a specified time
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper function to calculate retry delay with exponential backoff
  const getRetryDelay = (attempt: number) => {
    return Math.min(1000 * Math.pow(2, attempt), 30000); // Max 30 seconds
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

    // Get API key from .env file
    const currentApiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    
    if (!currentApiKey || currentApiKey.trim() === '') {
      toast({
        title: t.apiKeyRequired,
        description: language === 'it' 
          ? 'Configura la chiave API Mistral nel file .env per utilizzare il miglioramento IA.'
          : 'Configure your Mistral API key in the .env file to use AI improvement.',
        variant: "destructive",
      });
      return;
    }

    // Check if we should wait before making another request (minimum 1 second between requests)
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      await wait(1000 - timeSinceLastRequest);
    }

    setIsImproving(true);
    setLastRequestTime(Date.now());
    
    const makeRequest = async (attempt: number = 0): Promise<{ choices?: Array<{ message?: { content?: string } }> }> => {
      try {
        console.log(`Making request to Mistral API (attempt ${attempt + 1})...`);
        
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentApiKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [
              {
                role: 'system',
                content: language === 'it' 
                  ? 'Sei un editor di testo professionale. Migliora il seguente testo correggendo grammatica, ortografia, stile e tono. Mantieni la lingua originale del testo. Restituisci solo il testo migliorato senza spiegazioni o commenti aggiuntivi.'
                  : 'You are a professional text editor. Improve the following text by correcting grammar, spelling, style, and tone. Maintain the original language of the text. Return only the improved text without any explanations or additional commentary.'
              },
              {
                role: 'user',
                content: language === 'it' 
                  ? `Migliora questo testo: ${doc.content}`
                  : `Improve this text: ${doc.content}`
              }
            ],
            temperature: 0.3,
            max_tokens: 4000,
          }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API key. Please check your Mistral API key and try again.');
          } else if (response.status === 429) {
            // Rate limit exceeded - implement retry with exponential backoff
            if (attempt < 3) { // Max 3 retries
              const delay = getRetryDelay(attempt);
              const waitSeconds = Math.ceil(delay / 1000);
              
              toast({
                title: language === 'it' ? 'Limite di richieste raggiunto' : 'Rate limit reached',
                description: language === 'it' 
                  ? `Riprovo tra ${waitSeconds} secondi... (tentativo ${attempt + 2}/4)`
                  : `Retrying in ${waitSeconds} seconds... (attempt ${attempt + 2}/4)`,
                duration: delay,
              });
              
              await wait(delay);
              return makeRequest(attempt + 1);
            } else {
              throw new Error(language === 'it' 
                ? 'Limite di richieste raggiunto. Riprova tra qualche minuto.'
                : 'Rate limit exceeded. Please try again in a few minutes.');
            }
          } else {
            throw new Error(`API request failed with status ${response.status}`);
          }
        }

        const data = await response.json();
        console.log('API response received:', data);
        
        return data;
      } catch (error) {
        // If it's a network error and we haven't exceeded retry attempts, try again
        if (attempt < 2 && error instanceof TypeError && error.message.includes('fetch')) {
          const delay = getRetryDelay(attempt);
          toast({
            title: language === 'it' ? 'Errore di connessione' : 'Connection error',
            description: language === 'it' 
              ? `Riprovo tra ${Math.ceil(delay / 1000)} secondi...`
              : `Retrying in ${Math.ceil(delay / 1000)} seconds...`,
            duration: delay,
          });
          await wait(delay);
          return makeRequest(attempt + 1);
        }
        throw error;
      }
    };

    try {
      const data = await makeRequest();
      const improvedText = data.choices?.[0]?.message?.content;

      if (improvedText && improvedText.trim()) {
        updateDocument(activeTab, improvedText.trim());
        setRetryCount(0); // Reset retry count on success
        toast({
          title: t.textImproved,
          description: t.textImprovedDescription,
        });
      } else {
        throw new Error('No improved text received from API');
      }
    } catch (error) {
      console.error('Mistral API error:', error);
      
      // Provide more specific error messages
      let errorMessage = t.aiImprovementFailedDescription;
      if (error instanceof Error) {
        if (error.message.includes('Rate limit')) {
          errorMessage = language === 'it' 
            ? 'Hai raggiunto il limite di richieste API. Attendi qualche minuto prima di riprovare.'
            : 'You have reached the API rate limit. Please wait a few minutes before trying again.';
        } else if (error.message.includes('Invalid API key')) {
          errorMessage = language === 'it'
            ? 'Chiave API non valida. Controlla la tua chiave Mistral nelle impostazioni.'
            : 'Invalid API key. Please check your Mistral API key in settings.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: t.aiImprovementFailed,
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
      });
    } finally {
      setIsImproving(false);
    }
  };

  const undoAction = () => {
    const doc = documents.find(d => d.id === activeTab);
    if (!doc || doc.historyIndex <= 0) {
      toast({
        title: t.undoAction,
        description: t.nothingToUndo,
      });
      return;
    }

    const newHistoryIndex = doc.historyIndex - 1;
    const previousContent = doc.history[newHistoryIndex];
    
    setDocuments(docs => 
      docs.map(d => 
        d.id === activeTab 
          ? { 
              ...d, 
              content: previousContent,
              saved: false,
              wordCount: previousContent.trim().split(/\s+/).filter(word => word.length > 0).length,
              historyIndex: newHistoryIndex
            }
          : d
      )
    );

    toast({
      title: t.undoAction,
      description: t.undoActionDescription,
    });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undoAction();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, documents, undoAction]);

  const activeDocument = documents.find(doc => doc.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 flex items-center justify-between shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
          <h1 className="text-xl font-heading font-bold text-foreground tracking-tight transition-colors duration-300 hover:text-accent-foreground">
            {t.appTitle}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={createNewDocument} className="transition-all duration-200 hover:scale-105 active:scale-95">
            <Plus className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:rotate-12" />
            {t.newDocument}
          </Button>
          <Button variant="ghost" size="sm" onClick={openFile} className="transition-all duration-200 hover:scale-105 active:scale-95">
            <FolderOpen className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:rotate-12" />
            {t.openFile}
          </Button>
          <Button variant="ghost" size="sm" onClick={saveAsDocument} className="transition-all duration-200 hover:scale-105 active:scale-95">
            <Save className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:rotate-12" />
            {t.saveAsDocument}
          </Button>
          <Button variant="ghost" size="sm" onClick={undoAction} className="transition-all duration-200 hover:scale-105 active:scale-95">
            <RotateCcw className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:-rotate-12" />
            {t.undo}
          </Button>
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105 active:scale-95">
                <Search className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:scale-125" />
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
                  className="transition-shadow duration-200 focus:shadow-lg"
                />
                <Input
                  placeholder={t.replacePlaceholder}
                  value={replaceTerm}
                  onChange={(e) => setReplaceTerm(e.target.value)}
                  className="transition-shadow duration-200 focus:shadow-lg"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="caseSensitive"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="rounded accent-accent transition-colors duration-200"
                  />
                  <label htmlFor="caseSensitive" className="text-sm select-none cursor-pointer">{t.caseSensitive}</label>
                </div>
                <Button onClick={findAndReplace} className="w-full transition-all duration-200 hover:scale-105 active:scale-95">
                  {t.replaceAll}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isSaveAsOpen} onOpenChange={setIsSaveAsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.saveAsTitle}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder={t.fileNamePlaceholder}
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveAs();
                    }
                  }}
                  className="transition-shadow duration-200 focus:shadow-lg"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveAs} className="flex-1 transition-all duration-200 hover:scale-105 active:scale-95" disabled={!customFileName.trim()}>
                    {t.saveButton}
                  </Button>
                  <Button variant="outline" onClick={() => setIsSaveAsOpen(false)} className="flex-1 transition-all duration-200 hover:scale-105 active:scale-95">
                    {t.cancelButton}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm" onClick={improveText} disabled={isImproving} className="transition-all duration-200 hover:scale-105 active:scale-95">
            <Sparkles className={`h-4 w-4 mr-1 transition-transform duration-300 ${isImproving ? 'animate-spin' : 'group-hover:scale-125'}`} />
            {isImproving ? t.improving : t.aiImprove}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105 active:scale-95">
                <Languages className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:scale-125" />
                {t.language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="animate-in fade-in-0 zoom-in-95">
              <DropdownMenuItem 
                onClick={() => changeLanguage('en')}
                className={language === 'en' ? 'bg-accent' : ''}
              >
                English {language === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('it')}
                className={language === 'it' ? 'bg-accent' : ''}
              >
                Italiano {language === 'it' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('es')}
                className={language === 'es' ? 'bg-accent' : ''}
              >
                Español {language === 'es' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('ru')}
                className={language === 'ru' ? 'bg-accent' : ''}
              >
                Русский {language === 'ru' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('zh')}
                className={language === 'zh' ? 'bg-accent' : ''}
              >
                中文 {language === 'zh' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDarkMode(!darkMode)}
            className="transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {darkMode ? <Sun className="h-4 w-4 transition-transform duration-200 hover:rotate-12" /> : <Moon className="h-4 w-4 transition-transform duration-200 hover:-rotate-12" />}
          </Button>
        </div>
      </header>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none bg-muted/50 p-0 h-auto shadow-inner">
          {documents.map((doc) => (
            <TabsTrigger
              key={doc.id}
              value={doc.id}
              className="tab-item relative px-4 py-2 flex items-center gap-2 rounded-none transition-all duration-200 hover:bg-accent/60 hover:text-accent-foreground focus:scale-105 data-[state=active]:scale-105 data-[state=active]:shadow-md"
            >
              <span className="truncate max-w-32">
                {doc.title}{!doc.saved && '*'}
              </span>
              {documents.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-125"
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
                className="editor-area h-full min-h-[500px] resize-none border-0 focus:ring-0 font-body text-base leading-relaxed p-6 transition-shadow duration-200 focus:shadow-lg bg-background/80"
                placeholder={t.editorPlaceholder}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
      {/* Status Bar */}
      <footer className="status-bar px-4 py-2 flex items-center justify-between text-sm text-muted-foreground bg-card/80 border-t border-border shadow-inner transition-shadow duration-300">
        <div className="flex items-center gap-4">
          <span className="transition-colors duration-200 hover:text-foreground cursor-default">{activeDocument?.title || t.noDocument}</span>
          <span className="transition-colors duration-200 hover:text-foreground cursor-default">{t.words}: {activeDocument?.wordCount || 0}</span>
          <span className="transition-colors duration-200 hover:text-foreground cursor-default">{activeDocument?.saved ? t.saved : t.unsaved}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="tracking-tight font-mono transition-colors duration-200 hover:text-foreground cursor-default">{t.version}</span>
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