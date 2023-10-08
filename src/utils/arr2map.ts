// [{label: 'key', value: 'value'}, {label: 'key1', value: 'value1'}] ---> { value: 'key', value1: 'key1' }
export function arr2map(
  arr: any[],
  options = { key: 'value', value: 'label' }
) {
  return Object.fromEntries(
    arr.map((item) => [item[options.key], item[options.value]])
  );
}
