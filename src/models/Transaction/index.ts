export enum TransactionType {
  In = 'Crédito',
  Out= 'Débito',
}

export enum TransactionCategory {
  Food = "Comida",
  Transport = "Transporte",
  Services = "Serviços",
  Clothing = "Vestuário",
  Education = "Educação",
  Others = "Outros",
}

export interface Transaction {
  id?: string;
  title: string;
  type: TransactionType;
  category: TransactionCategory;
  value: number;
  date?: Date;
}
