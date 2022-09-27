export const debuggingOutput = (condition: boolean, name: string, output: string) => {
  if (condition) {
    console.log(`** DEBUG (${name}) **\n${output}`)
  }
}
