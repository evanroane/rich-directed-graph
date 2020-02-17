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
  });
});
