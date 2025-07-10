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
  },
  es: {
    // Header
    appTitle: "TabText Pro",
    newDocument: "Nuevo",
    openFile: "Abrir",
    saveAsDocument: "Guardar",
    undo: "Deshacer",
    findReplace: "Buscar",
    aiImprove: "Mejorar IA",
    // Find and Replace Dialog
    findReplaceTitle: "Buscar y Reemplazar",
    findPlaceholder: "Buscar...",
    replacePlaceholder: "Reemplazar con...",
    caseSensitive: "Distinguir mayúsculas/minúsculas",
    replaceAll: "Reemplazar Todo",
    // Save As Dialog
    saveAsTitle: "Guardar Documento Como",
    fileNamePlaceholder: "Ingrese el nombre del archivo...",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    // Document
    untitledDocument: "Documento Sin Título",
    editorPlaceholder: "Empieza a escribir tu documento...",
    // Status Bar
    noDocument: "Sin documento",
    words: "Palabras",
    saved: "Guardado",
    unsaved: "No guardado",
    version: "TabText Pro v1.0",
    // Toast Messages
    documentSaved: "Documento guardado",
    documentSavedDescription: "ha sido guardado exitosamente.",
    replaceCompleted: "Reemplazo completado",
    replaceCompletedDescription: "Reemplazado",
    noMatchesFound: "No se encontraron coincidencias",
    noMatchesFoundDescription: "No hay instancias de",
    noContentToImprove: "No hay contenido para mejorar",
    noContentToImproveDescription: "Por favor, agregue texto antes de usar el mejorador de IA.",
    apiKeyRequired: "Clave API requerida",
    apiKeyRequiredDescription: "Agregue su clave API de Mistral en la configuración para usar la mejora de IA.",
    textImproved: "Texto mejorado",
    textImprovedDescription: "Su texto ha sido mejorado por IA.",
    aiImprovementFailed: "Mejora de IA fallida",
    aiImprovementFailedDescription: "Hubo un error al mejorar su texto. Por favor, verifique su clave API e intente de nuevo.",
    undoAction: "Deshacer",
    undoActionDescription: "El último cambio ha sido deshecho.",
    nothingToUndo: "Nada que deshacer.",
    // AI Improvement
    improving: "Mejorando...",
    // Language
    language: "Idioma",
  },
  ru: {
    // Header
    appTitle: "TabText Pro",
    newDocument: "Новый",
    openFile: "Открыть",
    saveAsDocument: "Сохранить",
    undo: "Отменить",
    findReplace: "Найти",
    aiImprove: "Улучшить ИИ",
    // Find and Replace Dialog
    findReplaceTitle: "Найти и заменить",
    findPlaceholder: "Найти...",
    replacePlaceholder: "Заменить на...",
    caseSensitive: "С учетом регистра",
    replaceAll: "Заменить все",
    // Save As Dialog
    saveAsTitle: "Сохранить документ как",
    fileNamePlaceholder: "Введите имя файла...",
    saveButton: "Сохранить",
    cancelButton: "Отмена",
    // Document
    untitledDocument: "Безымянный документ",
    editorPlaceholder: "Начните вводить ваш документ...",
    // Status Bar
    noDocument: "Нет документа",
    words: "Слова",
    saved: "Сохранено",
    unsaved: "Не сохранено",
    version: "TabText Pro v1.0",
    // Toast Messages
    documentSaved: "Документ сохранен",
    documentSavedDescription: "успешно сохранен.",
    replaceCompleted: "Замена завершена",
    replaceCompletedDescription: "Заменено",
    noMatchesFound: "Совпадений не найдено",
    noMatchesFoundDescription: "Нет экземпляров",
    noContentToImprove: "Нет содержимого для улучшения",
    noContentToImproveDescription: "Пожалуйста, добавьте текст перед использованием улучшения ИИ.",
    apiKeyRequired: "Требуется API ключ",
    apiKeyRequiredDescription: "Пожалуйста, добавьте ваш Mistral API ключ в настройках для использования улучшения ИИ.",
    textImproved: "Текст улучшен",
    textImprovedDescription: "Ваш текст был улучшен ИИ.",
    aiImprovementFailed: "Ошибка улучшения ИИ",
    aiImprovementFailedDescription: "Произошла ошибка при улучшении текста. Проверьте ваш API ключ и попробуйте снова.",
    undoAction: "Отменить",
    undoActionDescription: "Последнее изменение отменено.",
    nothingToUndo: "Нечего отменять.",
    // AI Improvement
    improving: "Улучшается...",
    // Language
    language: "Язык",
  },
  zh: {
    // Header
    appTitle: "TabText Pro",
    newDocument: "新建",
    openFile: "打开",
    saveAsDocument: "保存",
    undo: "撤销",
    findReplace: "查找",
    aiImprove: "AI优化",
    // Find and Replace Dialog
    findReplaceTitle: "查找和替换",
    findPlaceholder: "查找...",
    replacePlaceholder: "替换为...",
    caseSensitive: "区分大小写",
    replaceAll: "全部替换",
    // Save As Dialog
    saveAsTitle: "文档另存为",
    fileNamePlaceholder: "输入文件名...",
    saveButton: "保存",
    cancelButton: "取消",
    // Document
    untitledDocument: "未命名文档",
    editorPlaceholder: "开始输入您的文档...",
    // Status Bar
    noDocument: "无文档",
    words: "字数",
    saved: "已保存",
    unsaved: "未保存",
    version: "TabText Pro v1.0",
    // Toast Messages
    documentSaved: "文档已保存",
    documentSavedDescription: "已成功保存。",
    replaceCompleted: "替换完成",
    replaceCompletedDescription: "已替换",
    noMatchesFound: "未找到匹配项",
    noMatchesFoundDescription: "没有",
    noContentToImprove: "没有可优化的内容",
    noContentToImproveDescription: "请先添加文本再使用AI优化。",
    apiKeyRequired: "需要API密钥",
    apiKeyRequiredDescription: "请在设置中添加您的Mistral API密钥以使用AI优化。",
    textImproved: "文本已优化",
    textImprovedDescription: "您的文本已被AI优化。",
    aiImprovementFailed: "AI优化失败",
    aiImprovementFailedDescription: "优化文本时出错。请检查API密钥并重试。",
    undoAction: "撤销",
    undoActionDescription: "上次更改已撤销。",
    nothingToUndo: "无可撤销内容。",
    // AI Improvement
    improving: "优化中...",
    // Language
    language: "语言",
  },
};

export type Language = keyof typeof translations;

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};