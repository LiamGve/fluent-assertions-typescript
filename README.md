# fluent-assertions (flasst)
This is a lightweight library with no dependencies for to create fluent assertions in Jest/Karma/Cypress/Protractor (though can be used by any test framework as it has no dependencies). This can also be used with javascript applications.

```
npm i flasst --save-dev
```

If you like the library, send me a tweet [@LiamGarvie](https://twitter.com/LiamGarvie) to let me know you're using it or to suggest improvements!

## Usage

### Fluent assertion examples

#### Basic field checking

```typescript
test('...', () => {
    const testObject = { hello: "world!" };

    assertThat(testObject)
      .hasField('hello')
      .and()              
      .isEqualTo('world!');
});
```

A few things to note here

-  `hasField(...)` can be used to de-reference a field. In addition, this will also perform a check that the field exists.
- `and()` this is purely scaffolding to make test more readable. This can be inserted anywhere within the chain of assertions.
- `isEqualTo(...)` this is basic object comparison. this call is equivalent to using `is(...)`, `equals(...)`, or `equalTo(...)` it is up to the developer which is most readable for the use case.
- Comparison can be of any type, it does *not* have to be `string` for example `assertThat(foo()).is(bar())`

#### A more complex example of a nested structure

```typescript
test('...', () => {
    const moreComplexTestObject = { 
      hello: { 
        to: 'you' 
      } 
    };

    assertThat(moreComplexTestObject)
      .hasField('hello')
      .and().hasField('to')
      .and().isEqualTo('you');
});
```

A few things to note here

- As you de-reference fields, the newly de-referenced field becomes the test object.
- In the example above we start at the root `moreComplexTestObject` then move to `hello` then to `to` which we compare against the string 'you'.

#### Assertions with strings | numbers

```typescript
test('...', () => {
    assertThat('some text here')
      .startsWith('some');

    assertThat('some text here')
      .endsWith('here');
    
    assertThat('some text here')
      .contains('text');
});
```

A few things to note here

- All of the above are comparisons of strings, the same for each can be done with number types too.
- Example: `assertThat(123456).startsWith(123)`.
- This can also be used with more complex objects that can be `toString()`'ed. Else you will be doing a comparison against `[Object object]` which will likely fail.

#### Boolean assertions

```typescript
test('...', () => {
    assertThat(true)
      .isTrue();
    
    assertThat(false)
      .isFalse();
});
```

#### Negative assertions

```typescript
test('...', () => {
    assertThat(foo)
      .isNotEqualTo(bar);
  
    assertThat(foo)
      .isNot(bar);
  
    assertThat(foo)
      .hasField(bar)
      .isNotEqualTo(baz);
});
```

#### Array assertions

```typescript
test('...', () => {
    const foo = [1, 2, 3];
    assertThat(foo)
      .containsElement(1);

    const bar = 3
    assertThat(bar)
      .isIn([1, 2, 3]);

    assertThat(bar)
      .isNotIn([1, 2, 4]);
});
```

This can be used for arrays of any type.

#### Exception handling assertions

```typescript
test('...', () => {
    // example 1
    const functionThatThrowsException = (): any => { // function can have any return type
        throw new Error('issue');
    };

    assertThatThrownBy(functionThatThrowsException)
      .hasField('message')
      .and().isEqualTo('issue');
  
    // example 2
    assertThatThrownBy(() => fail(randomStr)) // see fail in helper section
      .hasField('message')
      .and().isEqualTo(randomStr);
});
```

A few things to note here

- `assertThatThrownBy` can take in functions that return any type.

- You can also pass functions with parameters (example 2).

  

### BDD helper

Below is an example of wrapping sections of your test in given/when/then functions. These functions aid readability of your test and will not interfere with running.
```typescript
test('...', () => {
    let objectUnderTest;
    let result;

    given(() => objectUnderTest = new Thing());

    when(() => result = objectUnderTest.performSomeFunction());

    then(() => assertThat(result)
            .isTrue());
});
```



### Other Test helpers

```typescript
test('...', ()=> {
    const testStr = randomString(); // random string generator

    const testNum = randomNumber(); // random number generator

    fail(); // fail test
});
```