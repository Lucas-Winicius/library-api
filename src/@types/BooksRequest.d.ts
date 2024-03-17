type BooksRequest = {
  id: string;
  name: string;
  category: string;
  amount: number;
  author: string;
  tag?: string;
  createdAt: Date;
  updatedAt: Date;
};
