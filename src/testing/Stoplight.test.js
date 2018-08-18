import { testStatechart } from 'react-automata';
import { statechart, StoplightComponent } from './Stoplight';

test('Stoplight', () => {
  testStatechart({ statechart }, StoplightComponent);
});
