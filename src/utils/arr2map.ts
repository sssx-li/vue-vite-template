// [{label: '1', value: 1}, {label: '2', value: 2}] ---> { 1: '1', 2: '2' }
export function arr2map(
  arr: any[],
  options = { key: 'label', value: 'value' }
) {
  return Object.fromEntries(
    arr.map((item) => [item[options.key], item[options.value]])
  );
}
