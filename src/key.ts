import * as Crypto from "crypto";
import * as secp256k1 from "secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import base58 from "base58-encode";

type VersionPrefix = {
  public: string;
  private: string;
};

export class Key {
  privateKey: string;
  publicKey: string;
  address: string;
  wifPrivateKey: string; // Base58Check encoded value of privateKey
  compressedPublicKey: string;

  // Version Prefix: https://en.bitcoin.it/wiki/List_of_address_prefixes
  static VERSION_PREFIX: VersionPrefix = {
    public: "00",
    private: "80",
  };
  static IS_COMPRESSED = true;

  constructor() {
    this.privateKey = this.generateRandomValues();
    this.wifPrivateKey = this.generateWifPrivateKey(this.privateKey);
    this.publicKey = this.generatePublicKey(this.privateKey);
    this.address = this.generateAddress(this.publicKey);
  }

  // 真に暗号学的に安全な乱数を生成
  generateRandomValues(): string {
    const privateKeyBuffer = Crypto.randomBytes(32);
    const privateKeyHex = privateKeyBuffer.toString("hex").toUpperCase();
    console.log("privateKey", privateKeyHex);

    return "18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725";
  }

  generatePublicKey(privateKey: string) {
    const buffer = Buffer.from(privateKey, "hex");

    if (!secp256k1.privateKeyVerify(buffer))
      throw new Error("The format of the private key is incorrect.");

    const publicKeyUint8Arr: Uint8Array = secp256k1.publicKeyCreate(
      buffer,
      Key.IS_COMPRESSED
    );
    const publicKeyHex = Buffer.from(publicKeyUint8Arr).toString("hex");

    console.log("publicKey", publicKeyHex);

    return publicKeyHex;
  }

  generateWifPrivateKey(privateKey: string): string {
    const wifPrivateKey = this.base58Check("private", privateKey);
    console.log("wifPrivateKey", wifPrivateKey);
    return wifPrivateKey;
  }

  generateAddress(publicKey: string): string {
    const hashValue160 = ripemd160(sha256(Buffer.from(publicKey, "hex")));
    const hashValue160Hex = Buffer.from(hashValue160).toString("hex");
    const address = this.base58Check("public", hashValue160Hex);
    console.log("address", address);

    return address;
  }

  base58Check(prefix: keyof VersionPrefix, key: string) {
    const raw = Key.VERSION_PREFIX[prefix] + key;
    const hashValue = sha256(sha256(Buffer.from(raw, "hex")));
    const hashValueHex = Buffer.from(hashValue).toString("hex");
    const checksum = hashValueHex.substring(0, 8).toUpperCase();
    const encodedKey = base58(Buffer.from(raw + checksum, "hex"));

    return encodedKey;
  }
}

async function main() {
  new Key();
}

main();
