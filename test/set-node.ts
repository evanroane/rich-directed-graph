import { assert } from 'chai';
import DirectedGraph from '../src/index';

describe('setNode', () => {
  const graph = new DirectedGraph();

  it('should add a node', () => {
    graph.setNode('desire', {
      def: 'appetite together with consciousness of the appetite'
    });

    assert.equal(graph.nodes.get('desire').def, 'appetite together with consciousness of the appetite');
  });

  it('should add a second, independent node', () => {
    graph.setNode('joy', {
      def: 'passage from a lesser to a greater perfection'
    });

    assert.equal(graph.nodes.get('desire').def, 'appetite together with consciousness of the appetite');
    assert.equal(graph.nodes.get('joy').def, 'passage from a lesser to a greater perfection');
  });

  it('should replace the node when set on the same key', () => {
    graph.setNode('desire', { def: 'something else' });

    assert.equal(graph.nodes.get('desire').def, 'something else');
  });
})
