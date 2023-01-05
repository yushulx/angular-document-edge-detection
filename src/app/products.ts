export interface Product {
  id: string;
  name: string;
  description: string;
}

export const products = [
  {
    id: 'file-detection',
    name: 'Document Edge Detection (File)',
    description: 'Normalize the document with edge detection',
  },
  {
    id: 'camera-detection',
    name: 'Document Edge Detection (Camera)',
    description: 'Normalize the document with edge detection',
  },
];

