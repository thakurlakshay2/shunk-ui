import { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
  pageSize?: number;
  defaultSelectedPage?: number;
  total?: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}
