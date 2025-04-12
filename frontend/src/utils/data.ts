
export const setSetting = (label: string, value: any) => {
  if (typeof window !== 'undefined' && window.localStorage) {
      // Store the value as a string
      localStorage[label] = value // Convert to string
  }
};

export const getSetting = (label: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage[label]; // No parsing needed
  }
};



export const handleError = (error: any) => {
  console.error(error);
}