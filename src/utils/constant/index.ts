import { isGetTenantFromUrl } from "../helpers/getBaseUrl";

export const colorPrimary = '#247DBD'
export const colorSecondary = '#0FAC6D'
export const font = 'Almarai';

export const BASE_URL = import.meta.env.VITE_BASE_URL || `https://api-${isGetTenantFromUrl}.altebr.jewelry`;


export const LANG = localStorage.getItem("i18nextLng") || "en";