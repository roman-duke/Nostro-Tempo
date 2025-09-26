export default function camelToSnakeCase(camelCase: string) {
  return camelCase.split("").reduce((prev, curr) => {
    let nextLetter = curr;

    const currCharCode = curr.charCodeAt(0);
    if (currCharCode >= 65 && currCharCode <= 90) {
      nextLetter = `_${curr.toLowerCase()}`;
    }

    return prev + nextLetter;
  }, "");
}
