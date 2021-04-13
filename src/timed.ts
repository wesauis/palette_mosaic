export default function timed<I,O>(
  time: number,
  handler: (input: I) => O
): (input: I) => Promise<O> {
  let id: NodeJS.Timeout;

  return (...args) => new Promise(resolve => {
    if (id != null) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      resolve(handler(...args))
    }, time);
  })
}