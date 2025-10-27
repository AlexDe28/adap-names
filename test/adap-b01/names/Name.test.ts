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

describe("Escape delimiter character", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\.cs.fau.de"
    let n: Name = new Name(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de.people");
  });
});

describe("Single Escape character in Component", () => {
  it("test single escape in component", () => {
    // Original name string = "oss\cs.fau.de"
    let n: Name = new Name(["oss\\\\cs.fau.de"], '.');
    expect(n.asString()).toBe("oss\\cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss\\cs.fau.de.people");
  });
});

describe("Escape delimiter character + ", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\\.cs.fau.de"
    let n: Name = new Name(["oss\\\\.cs.fau.de"], '.');
    expect(n.asString()).toBe("oss\\.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss\\.cs.fau.de.people");
  });
});

describe("Escape character in multiple components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss\.cs.fau.de"
    let n: Name = new Name(["oss\\\\", "cs", "fau\\.", "de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss\\.cs.fau..de");
    
    n.append("people");
    expect(n.asString()).toBe("oss\\.cs.fau..de.people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("Escape character in whole string", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "Oh\.\.\."
    let n: Name = new Name(["Oh\\.\\.\\."], '.');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("Oh...");
    
    n.append("people");
    expect(n.asString()).toBe("Oh....people");
    expect(n.getNoComponents()).toBe(2);
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
  it("Reconstruct Base Test 1", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    let n2: Name = new Name([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss.cs.fau.de");
  });
});


describe("Reconstuct with Escaped Delimiter", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new Name([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Reconstuct with Escape Character", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["os\\\\s\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de");
    let n2: Name = new Name([n.asDataString()], '.')
    expect(n2.asString()).toBe("os\\s.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("os\\\\s\\.cs.fau.de");
  });
});

describe("Construct name with four empty components", () => {
  it("test escape and delimiter boundary conditions", () => {

    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["","","",""], '/');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("///");
    //expect(n.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Test inserting complex component", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["os\\\\s\\.cs.fau.de"], '.');
    n.insert(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.fau.de");
  });
});

describe("Test appending complex component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["os\\\\s\\.cs.fau.de"], '.');
    n.append( "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.fau.de.os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de.os\\\\s\\.cs.fau.de");
  });
});


describe("Test setting complex component", () => {
  it("set complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["os\\\\s\\.cs.fau.de"], '.');
    n.setComponent(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.de");
  });
});