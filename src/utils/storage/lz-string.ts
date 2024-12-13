// A lightweight string compression algorithm
export const compress = (input: string): string => {
  if (input.length === 0) return '';
  
  const dictionary: { [key: string]: number } = {};
  const result: string[] = [];
  let dictSize = 256;
  
  for (let i = 0; i < 256; i++) {
    dictionary[String.fromCharCode(i)] = i;
  }

  let phrase = input[0];
  for (let i = 1; i < input.length; i++) {
    const char = input[i];
    const combined = phrase + char;
    
    if (dictionary[combined] !== undefined) {
      phrase = combined;
    } else {
      result.push(String.fromCharCode(dictionary[phrase]));
      dictionary[combined] = dictSize++;
      phrase = char;
    }
  }
  
  if (phrase !== '') {
    result.push(String.fromCharCode(dictionary[phrase]));
  }
  
  return result.join('');
};

export const decompress = (compressed: string): string => {
  if (compressed.length === 0) return '';
  
  const dictionary: string[] = [];
  for (let i = 0; i < 256; i++) {
    dictionary[i] = String.fromCharCode(i);
  }
  
  const result: string[] = [];
  let dictSize = 256;
  let entry = '';
  
  for (let i = 0; i < compressed.length; i++) {
    const code = compressed.charCodeAt(i);
    const current = dictionary[code] || (code === dictSize ? entry + entry[0] : '');
    
    result.push(current);
    
    if (entry !== '') {
      dictionary[dictSize++] = entry + current[0];
    }
    
    entry = current;
  }
  
  return result.join('');
};