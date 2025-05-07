export const getTenantFromUrl = (() => {
  const url = window.location.hostname;
  const parts = url.split(".");
  return parts.length > 1 ? parts[0] : null;
})();

export const isGetTenantFromUrl =
  getTenantFromUrl === null ? "fatora" : getTenantFromUrl;

