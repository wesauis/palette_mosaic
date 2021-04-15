const DEFAULT_COLORS = [
  '#6a737d',
  '#babfc4',
  '#e3e5e8',
  '#c792ea',
  '#ffd46c',
  '#d9b1d9',
  '#6a737d',
  '#babfc4',
  '#e3e5e8',
]

export function serializeColors(colors: string[]): string {
  return colors
    // remove `#` from color
    .map(color => color.substr(1))
    // separate them by dashes
    .join('-')
}

export function deserializeColors(serialized: string): string[] {
  return serialized
    // split on dashes
    .split('-')
    // add the `#`
    .map(color => `#${color}`)
}

export function queryColors(): string[] {
  const serialized = new URLSearchParams(location.search).get('colors');

  if (typeof serialized === 'string' && serialized.length > 0) {
    const colors = deserializeColors(serialized)

    if (colors.length > 0) {
      return colors
    }
  }

  return DEFAULT_COLORS;
}
