export interface UseFetchReturn<T> {
  data: T | null;
  error: unknown;
  isFetching: boolean;
  fetchData: () => void;
}
