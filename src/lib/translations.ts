export interface Translations {
  // Header
  appTitle: string;
  newDocument: string;
  openFile: string;
  saveAsDocument: string;
  undo: string;
  findReplace: string;
  aiImprove: string;
  
  // Find and Replace Dialog
  findReplaceTitle: string;
  findPlaceholder: string;
  replacePlaceholder: string;
  caseSensitive: string;
  replaceAll: string;
  
  // Save As Dialog
  saveAsTitle: string;
  fileNamePlaceholder: string;
  saveButton: string;
  cancelButton: string;
  
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
  nothingToUndo: string;
  
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
    saveAsDocument: "Save",
    undo: "Undo",
    findReplace: "Find",
    aiImprove: "AI Improve",
    
    // Find and Replace Dialog
    findReplaceTitle: "Find and Replace",
    findPlaceholder: "Find...",
    replacePlaceholder: "Replace with...",
    caseSensitive: "Case sensitive",
    replaceAll: "Replace All",
    
    // Save As Dialog
    saveAsTitle: "Save Document As",
    fileNamePlaceholder: "Enter file name...",
    saveButton: "Save",
    cancelButton: "Cancel",
    
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
    undoActionDescription: "Last change has been undone.",
    nothingToUndo: "Nothing to undo.",
    
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
    saveAsDocument: "Salva",
    undo: "Annulla",
    findReplace: "Trova",
    aiImprove: "Migliora IA",
    
    // Find and Replace Dialog
    findReplaceTitle: "Trova e Sostituisci",
    findPlaceholder: "Trova...",
    replacePlaceholder: "Sostituisci con...",
    caseSensitive: "Maiuscole/minuscole",
    replaceAll: "Sostituisci Tutto",
    
    // Save As Dialog
    saveAsTitle: "Salva Documento Come",
    fileNamePlaceholder: "Inserisci nome file...",
    saveButton: "Salva",
    cancelButton: "Annulla",
    
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
    undoActionDescription: "L'ultima modifica è stata annullata.",
    nothingToUndo: "Niente da annullare.",
    
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