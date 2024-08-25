export interface PaginationProps {
  pageSize?: number;
  defaultSelectedPage?: number;
  total?: number;
  onClick: (pageNumber: number) => void;
}
