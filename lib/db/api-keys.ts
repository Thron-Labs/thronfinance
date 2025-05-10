import { getLocalStorage, setLocalStorage } from "../utils";

export const getOpenAIApiKey = () => {
  // Only check env variable on server side
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  }
  
  // Check localStorage on client side
  const apiKey = getLocalStorage('openaiApiKey');
  return apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
};

export const setOpenAIApiKey = async (apiKey: string) => {
  if (typeof window === 'undefined') return;
  setLocalStorage('openaiApiKey', apiKey);
};

export const getFinancialDatasetsApiKey = () => {
  // Prefer localStorage first on client, then env variable
  if (typeof window !== 'undefined') {
    const apiKey = getLocalStorage('financialDatasetsApiKey');
    if (apiKey) return apiKey;
  }
  // Fallback to env variable (works on server, and on client if localStorage is empty)
  return process.env.NEXT_PUBLIC_FINANCIAL_DATASETS_API_KEY;
};

export const setFinancialDatasetsApiKey = async (apiKey: string) => {
  if (typeof window === 'undefined') return;
  setLocalStorage('financialDatasetsApiKey', apiKey);
};

export const getLocalOpenAIApiKey = () => {
  if (typeof window === 'undefined') return null;
  return getLocalStorage('openaiApiKey');
};