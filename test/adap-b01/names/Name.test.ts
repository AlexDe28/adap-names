import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Escape character in whole string", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '.');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de.people");
  });
});

describe("Escape character in whole string", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss\\.cs.fau.de");
    
    n.append("people");
    expect(n.asString()).toBe("oss\\.cs.fau.de.people");
    expect(n.getNoComponents()).toBe(4);
  });
});

describe("Escape character with empty components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["///"], '/');
    expect(n.asString()).toBe("///");
    expect(n.getNoComponents()).toBe(4);
    n.append("people");
    expect(n.asString()).toBe("////people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("Reconstuct", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    let n2: Name = new Name([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
  });
});

describe("Escape character to Reconstuct", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new Name([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss\\.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss\\\\.cs.fau.de");
  });
});