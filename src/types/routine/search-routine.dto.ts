export interface SearchRoutineDto {
  title?: string;
  userId?: number;
  customerId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  page: number;
  pageSize: number;
}
