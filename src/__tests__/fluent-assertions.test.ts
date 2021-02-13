import {assertThat} from '../index'

test('test1', () => {
    assertThat('hi')
        .isEqualTo('hi');
});