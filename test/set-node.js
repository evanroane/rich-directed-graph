const { assert } = require('chai');
const DirectedGraph = require('../dist/directed-graph');

describe('Directed Graph', () => {
  const graph = new DirectedGraph();

  describe('setNode', () => {
    it('should add a node', () => {
      graph.setNode('desire', {
        def: 'appetite together with consciousness of the appetite'
      });

      assert.equal(graph.nodes.get('desire').def, 'appetite together with consciousness of the appetite');
    });

    it('should add a second, independent node', () => {
      graph.setNode('joy', {
        def: 'Joy is man\'s passage from a less to a greater perfection'
      });

      assert.equal(graph.nodes.get('desire').def, 'appetite together with consciousness of the appetite');
      assert.equal(graph.nodes.get('joy').def, 'Joy is man\'s passage from a less to a greater perfection');
    });

    it('should replace the node when set on the same key', () => {
      graph.setNode('desire', { def: 'something else' });

      assert.equal(graph.nodes.get('desire').def, 'something else');
    });
  });
});
