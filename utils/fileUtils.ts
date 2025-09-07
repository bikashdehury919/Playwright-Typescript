import fs from 'fs';

export const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf-8');
};

export const deleteFileIfExists = (filePath: string): void => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};
