export interface Encrypter {
  encrypter: (value: string) => Promise<string>
}
