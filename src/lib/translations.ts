export interface Translations {
  // Header
  appTitle: string;
  newDocument: string;
  openFile: string;
  saveDocument: string;
  undo: string;
  findReplace: string;
  aiImprove: string;
  settings: string;
  
  // Find and Replace Dialog
  findReplaceTitle: string;
  findPlaceholder: string;
  replacePlaceholder: string;
  caseSensitive: string;
  replaceAll: string;
  
  // Settings Dialog
  settingsTitle: string;
  settingsDescription: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  apiKeyDescription: string;
  saveApiKey: string;
  
  // Document
  untitledDocument: string;
  editorPlaceholder: string;
  
  // Status Bar
  noDocument: string;
  words: string;
  saved: string;
  unsaved: string;
  version: string;
  
  // Toast Messages
  documentSaved: string;
  documentSavedDescription: string;
  apiKeySaved: string;
  apiKeySavedDescription: string;
  replaceCompleted: string;
  replaceCompletedDescription: string;
  noMatchesFound: string;
  noMatchesFoundDescription: string;
  noContentToImprove: string;
  noContentToImproveDescription: string;
  apiKeyRequired: string;
  apiKeyRequiredDescription: string;
  textImproved: string;
  textImprovedDescription: string;
  aiImprovementFailed: string;
  aiImprovementFailedDescription: string;
  undoAction: string;
  undoActionDescription: string;
  
  // AI Improvement
  improving: string;
  
  // Language
  language: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    appTitle: "TabText Pro",
    newDocument: "New",
    openFile: "Open",
    saveDocument: "Save",
    undo: "Undo",
    findReplace: "Find",
    aiImprove: "AI Improve",
    settings: "Settings",
    
    // Find and Replace Dialog
    findReplaceTitle: "Find and Replace",
    findPlaceholder: "Find...",
    replacePlaceholder: "Replace with...",
    caseSensitive: "Case sensitive",
    replaceAll: "Replace All",
    
    // Settings Dialog
    settingsTitle: "Settings",
    settingsDescription: "Configure your Mistral API key to enable AI text improvement. Now using Mistral Large for superior results.",
    apiKeyLabel: "Mistral API Key",
    apiKeyPlaceholder: "Enter your Mistral API key...",
    apiKeyDescription: "Your API key is stored locally in your browser and never shared.",
    saveApiKey: "Save API Key",
    
    // Document
    untitledDocument: "Untitled Document",
    editorPlaceholder: "Start typing your document...",
    
    // Status Bar
    noDocument: "No document",
    words: "Words",
    saved: "Saved",
    unsaved: "Unsaved",
    version: "TabText Pro v1.0",
    
    // Toast Messages
    documentSaved: "Document saved",
    documentSavedDescription: "has been saved successfully.",
    apiKeySaved: "API Key Saved",
    apiKeySavedDescription: "Your Mistral API key has been saved securely in your browser.",
    replaceCompleted: "Replace completed",
    replaceCompletedDescription: "Replaced",
    noMatchesFound: "No matches found",
    noMatchesFoundDescription: "No instances of",
    noContentToImprove: "No content to improve",
    noContentToImproveDescription: "Please add some text before using the AI improver.",
    apiKeyRequired: "API Key Required",
    apiKeyRequiredDescription: "Please add your Mistral API key in settings to use AI improvement.",
    textImproved: "Text Improved",
    textImprovedDescription: "Your text has been enhanced by AI.",
    aiImprovementFailed: "AI Improvement Failed",
    aiImprovementFailedDescription: "There was an error improving your text. Please check your API key and try again.",
    undoAction: "Undo",
    undoActionDescription: "Undo functionality would revert the last change.",
    
    // AI Improvement
    improving: "Improving...",
    
    // Language
    language: "Language",
  },
  
  it: {
    // Header
    appTitle: "TabText Pro",
    newDocument: "Nuovo",
    openFile: "Apri",
    saveDocument: "Salva",
    undo: "Annulla",
    findReplace: "Trova",
    aiImprove: "Migliora IA",
    settings: "Impostazioni",
    
    // Find and Replace Dialog
    findReplaceTitle: "Trova e Sostituisci",
    findPlaceholder: "Trova...",
    replacePlaceholder: "Sostituisci con...",
    caseSensitive: "Maiuscole/minuscole",
    replaceAll: "Sostituisci Tutto",
    
    // Settings Dialog
    settingsTitle: "Impostazioni",
    settingsDescription: "Configura la tua chiave API Mistral per abilitare il miglioramento del testo con IA. Ora utilizza Mistral Large per risultati superiori.",
    apiKeyLabel: "Chiave API Mistral",
    apiKeyPlaceholder: "Inserisci la tua chiave API Mistral...",
    apiKeyDescription: "La tua chiave API è memorizzata localmente nel browser e non viene mai condivisa.",
    saveApiKey: "Salva Chiave API",
    
    // Document
    untitledDocument: "Documento Senza Titolo",
    editorPlaceholder: "Inizia a scrivere il tuo documento...",
    
    // Status Bar
    noDocument: "Nessun documento",
    words: "Parole",
    saved: "Salvato",
    unsaved: "Non salvato",
    version: "TabText Pro v1.0",
    
    // Toast Messages
    documentSaved: "Documento salvato",
    documentSavedDescription: "è stato salvato con successo.",
    apiKeySaved: "Chiave API Salvata",
    apiKeySavedDescription: "La tua chiave API Mistral è stata salvata in modo sicuro nel browser.",
    replaceCompleted: "Sostituzione completata",
    replaceCompletedDescription: "Sostituito",
    noMatchesFound: "Nessuna corrispondenza trovata",
    noMatchesFoundDescription: "Nessuna istanza di",
    noContentToImprove: "Nessun contenuto da migliorare",
    noContentToImproveDescription: "Aggiungi del testo prima di usare il miglioratore IA.",
    apiKeyRequired: "Chiave API Richiesta",
    apiKeyRequiredDescription: "Aggiungi la tua chiave API Mistral nelle impostazioni per usare il miglioramento IA.",
    textImproved: "Testo Migliorato",
    textImprovedDescription: "Il tuo testo è stato migliorato dall'IA.",
    aiImprovementFailed: "Miglioramento IA Fallito",
    aiImprovementFailedDescription: "C'è stato un errore nel migliorare il testo. Controlla la tua chiave API e riprova.",
    undoAction: "Annulla",
    undoActionDescription: "La funzione Annulla ripristinerebbe l'ultima modifica.",
    
    // AI Improvement
    improving: "Migliorando...",
    
    // Language
    language: "Lingua",
  }
};

export type Language = keyof typeof translations;

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};