import { DataStats, TableData } from '../../common/types';
import { fromPairs } from 'lodash';
import { histogramBuckets } from '../../common/constants';

export const getNumericalCounts = (numbers: Array<number>): DataStats => {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i] || 0;
    min = Math.min(num, min);
    max = Math.max(num, max);
    sum += num;
  }
  const mean = sum / (numbers.length);
  const stdDev = Math.sqrt(numbers.map(x => Math.pow(x || 0 - mean, 2)).reduce((a,b) => a+b)/numbers.length);
  return {
    min,
    max,
    mean,
    stdDev
  }
}

export const getUniqueCounts = (values: Array<string>) => {
  const counts: Record<string, number> = {};
  for(let i = 0; i < values.length; i++) {
    const current = values[i];
    if (counts[current]) {
      counts[current] = counts[current] + 1;
    } else {
      counts[current] = 1;
    }
  }
  return counts;
}

export const getRows = (data: TableData): Array<Record<string, string>> => {
  let result = data.rows.map(row => {
    return fromPairs(row.map((col, idx) => {
      return [data.header[idx], col]
    }))
  })
  return result;
}

export const createHistogramValues = (values: Array<number>, min: number, max: number) => {
  const valuesPerBucket = values.length / histogramBuckets;
  values.sort((a, b) => a - b);
  let currentStart = min;
  let result = [];
  while(currentStart <= max) {
    result.push([currentStart]);
    currentStart += valuesPerBucket;
  }
  return result;
}
