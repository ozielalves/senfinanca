import { TransactionCategory, TransactionType } from "../Transaction";

export enum FilterOption {
  Type = "type",
  Category = "category",
  Keyword = "keyword",
}

export type Filters = {
  [key in FilterOption.Type | FilterOption.Category | FilterOption.Keyword]: TransactionType |
  TransactionCategory |
  string;
};