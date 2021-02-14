// BDD functions to group sections of tests to make more readable
export const given = (fun: () => void): void => fun();
export const when = given;
export const then = given;

// Fluent Assertions
export const assertThat = (thing: any): FluentAssertion => {
    return new FluentAssertion(thing);
}

class FluentAssertion {
    constructor(private objectUnderTest: any) {}

    public hasField(field: any): FluentAssertion {
        if (!this.objectUnderTest[field]) {
            throw new Error(`Field ${field} does not exist.`);
        }
        return new FluentAssertion(this.objectUnderTest[field]);
    }

    public equals(expected: any): void {
        if (this.objectUnderTest !== expected) {
            throw new Error(`Actual value (${this.objectUnderTest}) and expected value (${expected}) do not match.`);
        }
    }

    public isNotEqualTo(expected: any): void {
        if (this.objectUnderTest === expect) {
            throw new Error(`Expected objects ${this.objectUnderTest} and ${expected} not to match but both were equal`);
        }
    }

    public equalTo(expected: any): void {
        this.equals(expected);
    }

    public is(expected: any): void {
        this.equals(expected);
    }

    public isEqualTo(expected: any): void {
        this.equals(expected);
    }

    public isTrue(): void {
        this.equals(true);
    }

    public isFalse(): void {
        this.equals(false);
    }

    public isIn(arr: any[]): void {
        if (arr.indexOf(this.objectUnderTest) === -1) {
            throw new Error(`${this.objectUnderTest} is not in ${arr}`);
        }
    }

    public isNotIn(arr: any[]): void {
        if (arr.indexOf(this.objectUnderTest) > -1) {
            throw new Error(`${this.objectUnderTest} is in ${arr}`);
        }
    }

    public containsElement(element: any): void {
        if (!Array.isArray(this.objectUnderTest)) {
            throw new Error(`${this.objectUnderTest} is not of type Array`);
        }
        if (this.objectUnderTest.indexOf(element) === -1) {
            throw new Error(`${element} is not in ${this.objectUnderTest}`);
        }
    }

    public contains(expected: string | number): void {
        if (typeof this.objectUnderTest !== 'string' || typeof expected === 'number') {
            this.objectUnderTest = '' + this.objectUnderTest;
            expected = '' + expected;
        }
        if (this.objectUnderTest.indexOf(expected) === -1) {
            throw new Error(`${expected} is not contained within ${this.objectUnderTest}`);
        }
    }

    public startsWith(expected: string | number): void {
        if (typeof this.objectUnderTest !== 'string' || typeof expected === 'number') {
            this.objectUnderTest = '' + this.objectUnderTest;
            expected = '' + expected;
        }
        if (this.objectUnderTest.substring(0, expected.length) !== expected) {
            throw new Error(`${this.objectUnderTest} does not start with ${expected}.`);
        }
    }

    public endsWith(expected: string | number): void {
        if (typeof this.objectUnderTest !== 'string' || typeof expected === 'number') {
            this.objectUnderTest = '' + this.objectUnderTest;
            expected = '' + expected;
        }
        if (this.objectUnderTest.substring(this.objectUnderTest.length - expected.length, this.objectUnderTest.length + expected.length) !== expected) {
            throw new Error(`${this.objectUnderTest} does not end with ${expected}.`);
        }
    }

    public and(): FluentAssertion {
        return this;
    }

    public isOfType(type: string): void {
        if (typeof this.objectUnderTest !== type) {
            throw new Error(`${typeof this.objectUnderTest} is not an instance of ${type}`);
        }
    }
}

// Test helpers
export const randomString = (): string => {
    return Math.random().toString(36);
}

export const randomNumber = (): number => {
    return Math.random();
}

export const fail = (message?: string): void => {
    if (message) {
        throw new Error(message);
    } else {
        throw Error();
    }
}
