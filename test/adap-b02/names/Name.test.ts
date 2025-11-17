import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b02/names/Name";
import { StringName } from "../../../src/adap-b02/names/StringName";
import { StringArrayName } from "../../../src/adap-b02/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Empty StringName", () => {
  it("test empty string", () => {
    let n: Name = new StringName("");
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("")
    n.append("test");
    expect(n.asString()).toBe(".test");
  });
});

describe("Empty StringArrayName", () => {
  it("test empty string", () => {
    let n: Name = new StringArrayName([""]);
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("")
    n.append("test");
    expect(n.asString()).toBe(".test");
  });
});

describe("StringName Escape delimiter character", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\.cs.fau.de"
    let n: Name = new StringName("oss\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de.people");
  });
});

describe("StringArrayName Escape delimiter character", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\.cs.fau.de"
    let n: Name = new StringArrayName(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de.people");
  });
});

describe("StringArrayName Single Escape character in Component", () => {
  it("test single escape in component", () => {
    // Original name string = "oss\cs.fau.de"
    let n: Name = new StringArrayName(["oss\\\\cs.fau.de"], '.');
    expect(n.asString()).toBe("oss\\cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss\\cs.fau.de.people");
  });
});

describe("StringName Single Escape character in Component", () => {
  it("test single escape in component", () => {
    // Original name string = "oss\cs.fau.de"
    let n: Name = new StringName("oss\\\\cs.fau.de", '.');
    expect(n.asString()).toBe("oss\\cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss\\cs.fau.de.people");
  });
});

describe("StringArrayName Escape delimiter character + ", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\\.cs.fau.de"
    let n: Name = new StringArrayName(["oss\\\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss\\.cs.fau.de");
    n.append("people");
    expect(n.getNoComponents()).toBe(5);
    expect(n.asString()).toBe("oss\\.cs.fau.de.people");
  });
});

describe("StringName Escape delimiter character + ", () => {
  it("test escape and delimiter boundary conditions single component", () => {
    // Original name string = "oss\\.cs.fau.de"
    let n: Name = new StringName("oss\\\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss\\.cs.fau.de");
    n.append("people");
    expect(n.getNoComponents()).toBe(5);
    expect(n.asString()).toBe("oss\\.cs.fau.de.people");
  });
});

describe("StringArrayName Escape character in multiple components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss\.cs.fau.de"
    console.log("StartingTest")
    let n: Name = new StringArrayName(["oss\\\\", "cs", "fau\\.", "de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss\\.cs.fau..de");
    console.log(n.asDataString())
    
    n.append("people");
    expect(n.asString()).toBe("oss\\.cs.fau..de.people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("StringName Escape character in multiple components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss\.cs.fau.de"
    let n: Name = new StringName("oss\\\\.cs.fau\\..de", '.');
    
    expect(n.asString()).toBe("oss\\.cs.fau..de");
    expect(n.getNoComponents()).toBe(4);
    console.log(n.asDataString())
    n.append("people");
    expect(n.asString()).toBe("oss\\.cs.fau..de.people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("StringArrayName Escape character in whole string", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "Oh\.\.\."
    let n: Name = new StringArrayName(["Oh\\.\\.\\."], '.');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("Oh...");
    
    n.append("people");
    expect(n.asString()).toBe("Oh....people");
    expect(n.getNoComponents()).toBe(2);
  });
});

describe("StringName Escape character in whole string", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "Oh\.\.\."
    let n: Name = new StringName("Oh\\.\\.\\.", '.');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("Oh...");
    
    n.append("people");
    expect(n.asString()).toBe("Oh....people");
    expect(n.getNoComponents()).toBe(2);
  });
});

describe("StringArrayName Escape character with empty components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["///"], '/');
    expect(n.asString()).toBe("///");
    expect(n.getNoComponents()).toBe(4);
    n.append("people");
    expect(n.asString()).toBe("////people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("StringName Escape character with empty components", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("///", '/');
    expect(n.asString()).toBe("///");
    expect(n.getNoComponents()).toBe(4);
    n.append("people");
    expect(n.asString()).toBe("////people");
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("Reconstuct StringArrayName -> StringArrayName", () => {
  it("Reconstruct Base Test 1", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["oss.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss.cs.fau.de");
  });
});

describe("Reconstuct StringArrayName -> StringName", () => {
  it("Reconstruct Base Test 1", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["oss.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss.cs.fau.de");
  });
});

describe("Reconstuct StringName -> StringArrayName", () => {
  it("Reconstruct Base Test 1", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("oss.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss.cs.fau.de");
  });
});

describe("Reconstuct StringName -> StringName", () => {
  it("Reconstruct Base Test 1", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("oss.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(4);
    expect(n2.asDataString()).toBe("oss.cs.fau.de");
  });
});

describe("Reconstuct with Escaped Delimiter StringArrayName -> StringArrayName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Reconstuct with Escaped Delimiter StringArrayName -> StringName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["oss\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Reconstuct with Escaped Delimiter StringName -> StringArrayName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("oss\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Reconstuct with Escaped Delimiter StringName -> StringName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("oss\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss\\.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("oss.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("Reconstuct with Escape Character  StringArrayName -> StringArrayName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("os\\s.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("os\\\\s\\.cs.fau.de");
  });
});

describe("Reconstuct with Escape Character  StringArrayName -> StringName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("os\\s.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("os\\\\s\\.cs.fau.de");
  });
});

describe("Reconstuct with Escape Character  StringName -> StringArrayName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de");
    let n2: Name = new StringArrayName([n.asDataString()], '.')
    expect(n2.asString()).toBe("os\\s.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("os\\\\s\\.cs.fau.de");
  });
});

describe("Reconstuct with Escape Character  StringName -> StringName", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    expect(n.getNoComponents()).toBe(3);
    expect(n.asString()).toBe("os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de");
    let n2: Name = new StringName(n.asDataString(), '.')
    expect(n2.asString()).toBe("os\\s.cs.fau.de");
    expect(n2.getNoComponents()).toBe(3);
    expect(n2.asDataString()).toBe("os\\\\s\\.cs.fau.de");
  });
});

describe("StringArrayName Construct name with four empty components", () => {
  it("test escape and delimiter boundary conditions", () => {

    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["","","",""], '/');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("///");
    //expect(n.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("StringName Construct name with four empty components", () => {
  it("test escape and delimiter boundary conditions", () => {

    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("///", '/');
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("///");
    //expect(n.asDataString()).toBe("oss\\.cs.fau.de");
  });
});

describe("StringArrayName Test inserting complex component", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    n.insert(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.fau.de");
  });
});

describe("StringName Test inserting complex component", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    n.insert(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.fau.de");
  });
});

describe("StringArrayName Test appending complex component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    n.append( "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.fau.de.os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de.os\\\\s\\.cs.fau.de");
  });
});

describe("StringName Test appending complex component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    n.append( "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.fau.de.os\\s.cs.fau.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.fau.de.os\\\\s\\.cs.fau.de");
  });
});

describe("StringArrayName Test setting complex component", () => {
  it("set complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    n.setComponent(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.de");
  });
});

describe("StringName Test setting complex component", () => {
  it("set complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    n.setComponent(1, "os\\\\s\\.cs.fau.de");
    expect(n.asString()).toBe("os\\s.cs.os\\s.cs.fau.de.de");
    expect(n.asDataString()).toBe("os\\\\s\\.cs.os\\\\s\\.cs.fau.de.de");
  });
});


describe("StringArrayName Test removing complex component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["os\\\\s\\.cs.fau.de"], '.');
    n.remove(0);
    expect(n.asString()).toBe("fau.de");
    expect(n.asDataString()).toBe("fau.de");
  });
});

describe("StringName Test removing complex component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("os\\\\s\\.cs.fau.de", '.');
    n.remove(0);
    expect(n.asString()).toBe("fau.de");
    expect(n.asDataString()).toBe("fau.de");
  });
});

describe("StringArrayName Test removing empty component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["..."], '.');
    n.remove(0);
    expect(n.asString()).toBe("..");
    expect(n.asDataString()).toBe("..");
  });
});

describe("StringName Test removing empty component", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("...", '.');
    n.remove(0);
    expect(n.asString()).toBe("..");
    expect(n.asDataString()).toBe("..");
  });
});

describe("StringArrayName Test Check Empty Positive", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName([""], '.');

    n.remove(0);
    expect(n.asString()).toBe("");
    expect(n.isEmpty()).toBe(true);
  });
});

describe("StringName Test Check Empty Positive", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("", '.');

    n.remove(0);
    expect(n.asString()).toBe("");
    expect(n.isEmpty()).toBe(true);
  });
});

describe("StringArrayName Test Check Empty Append", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName([""], '.');

    n.remove(0);
    expect(n.asString()).toBe("");
    expect(n.isEmpty()).toBe(true);
    n.append("5");
    expect(n.asString()).toBe("5");
    expect(n.isEmpty()).toBe(false);
  });
});

describe("StringName Test Check Empty Append", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("", '.');

    n.remove(0);
    expect(n.asString()).toBe("");
    expect(n.isEmpty()).toBe(true);
    n.append("5");
    expect(n.asString()).toBe("5");
    expect(n.isEmpty()).toBe(false);
  });
});

describe("StringArrayName Test Check Empty Negative", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringArrayName(["5"], '.');

    //n.remove(0);
    expect(n.asString()).toBe("5");
    expect(n.isEmpty()).toBe(false);
  });
});

describe("StringName Test Check Empty Negative", () => {
  it("append complex component", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new StringName("5", '.');

    //n.remove(0);
    expect(n.asString()).toBe("5");
    expect(n.isEmpty()).toBe(false);
  });
});


