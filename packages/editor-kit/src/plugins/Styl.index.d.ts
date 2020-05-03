/**
 * Only nested selectors are supported and not
 * the full Stylus syntax. Using this extension
 * stops VS Code from complaining that the files
 * aren't valid CSS.
 */
declare module "*.styl" {
  const content: any;
  export default content;
}
