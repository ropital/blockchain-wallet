import { Key } from "./Key";
import * as secp256k1 from "secp256k1";

describe("key", () => {
  it("Should generate private key correctly", () => {
    const key = new Key();
    const privateKey = key.generateRandomValues();
    const buffer = Buffer.from(privateKey, "hex");

    const isValid = secp256k1.privateKeyVerify(buffer);
    expect(isValid).toBeTruthy();
  });

  it("Should generate public key correctly ", () => {
    const privateKey =
      "18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725";
    const key = new Key();
    const publicKey = key.generatePublicKey(privateKey);

    expect(publicKey).toBe(
      "0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352"
    );
  });

  it("Should generate WIF PrivateKey correctly", () => {
    const privateKey =
      "1184CD2CDD640CA42CFC3A091C51D549B2F016D454B2774019C2B2D2E08529FD";
    const key = new Key();
    const wifPrivateKey = key.generateWifPrivateKey(privateKey);

    expect(wifPrivateKey).toBe(
      "5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD"
    );
  });

  it("Should generate address correctly", () => {
    const publicKey =
      "0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352";
    const key = new Key();
    const address = key.generateAddress(publicKey);

    expect(address).toBe("1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs");
  });
});
