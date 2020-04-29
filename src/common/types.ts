export type Dataset = {
  name: string;
  row_count: number;
  url: string;
};

export type TableData = {
  header: Array<string>;
  rows: Array<Array<string>>;
  types: Array<string>;
}

export type DataStats = {
  min: number;
  max: number;
  mean: number;
  stdDev?: number;
}
