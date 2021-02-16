import {assertThat, assertThatThrownBy, fail, randomString} from '../index'

test('test basic assert', () => {
    const randomStr = randomString();

    assertThat(randomStr)
      .isEqualTo(randomStr);  
});

test('test assert thrown', () => {
    const randomStr = randomString();

    const functionThatThrowsException = (): any => {
        throw new Error(randomStr);
    };

    assertThatThrownBy(functionThatThrowsException)
      .hasField('message')
      .and().isEqualTo(randomStr);
});

test('test fails function', () => {
    const randomStr = randomString();

    assertThatThrownBy(() => fail(randomStr))
      .hasField('message')
      .and().isEqualTo(randomStr);
})