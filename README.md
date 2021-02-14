# fluent-assertions
This is a lightweight library with no dependencies to create fluent assertions in Jest/Karma/Cypress/Protractor. This can also be used with javascript applications

If you like the library, send me a tweet @LiamGarvie to let me know you're using it or to suggest improvements!

## Usage:

Fluent assertion examples:
```
test('...', () => {
    const testObject = { hello: "world" };

    assertThat(testObject) // <-- testObject can be any type
      .hasField('hello')   // <-- de-reference a field. This will also perform a check that the field exists
      .and()               // <-- optional to make test more readable
      .isEqualTo('world'); // <-- object comparison

    const moreComplexTestObject = { hello: { to: 'you' } };

    assertThat(moreComplexTestObject)
      .hasField('hello')
      .and().hasField('to')
      .and().isEqualTo('you');

    assertThat('some text here')
      .startsWith('some') // <-- Note, this can only be performed with strings or numbers or objects that implement toString()

    assertThat('some text here')
      .endsWith('here') // <-- Note, this can only be performed with strings or numbers or objects that implement toString()
    
    assertThat('some text here')
      .contains('text') // <-- Note, this can only be performed with strings or numbers or objects that implement toString()

    assertThat(true)
      .isTrue();
    
    assertThat(false)
      .isFalse();

    assertThat(foo())
      .is(bar());

    // negative assertions can be made too
    assertThat(foo)
      .isNotEqualTo(bar);

    assertThat(foo)
      .hasField(bar)
      .isNotEqualTo(baz);

    // support for array checks
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

BDD helper:

Below is an example of wrapping sections of your test in given/when/then functions. These functions aid readability of your test and will not interfere with running.
```
test('...', () => {
    let objectUnderTest;
    let result;

    given(() => {
        objectUnderTest = new Thing();
    });

    when(() => {
        result = objectUnderTest.performSomeFunction();
    });

    then(() => {
        assertThat(result)
            .isTrue();
    });
});
```

Other Test helpers:
```
test('...', ()=> {
    const testStr = randomString(); // random string generator

    const testNum = randomNumber(); // random number generator

    fail(); // fail test
});
```