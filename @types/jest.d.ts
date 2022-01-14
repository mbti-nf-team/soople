declare const given: {
  <T = any>(key: string, callback: () => T): T
  [key: string]: any
};
