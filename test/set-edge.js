const { expect } = require('chai');
const DirectedGraph = require('../dist/directed-graph');

describe('Directed Graph', () => {

  describe('setEdge', () => {
    it('should add an edge', () => {
      const graph = new DirectedGraph();

      graph.setNode('desire', {
        def: 'appetite together with consciousness of the appetite'
      });
      graph.setNode('joy', {
        def: 'passage from a less to a greater perfection'
      });

      graph.setEdge('joy', 'desire');

      expect(graph.edges.get('joy')).to.include('desire');
    });

    it('should add an an additional successor to an edge', () => {
      const graph = new DirectedGraph();

      graph.setNode('desire', {
        def: 'appetite together with consciousness of the appetite'
      });
      graph.setNode('joy', {
        def: 'passage from a less to a greater perfection'
      });
      graph.setNode('sadness', {
        def: 'passage from a less to a greater perfection'
      });

      graph.setEdge('joy', 'desire');
      graph.setEdge('joy', 'sadness');

      expect(graph.edges.get('joy')).to.include('desire');
      expect(graph.edges.get('joy')).to.include('sadness');
    });

    it('should not add an edge for a node that does not exist', () => {
      const graph = new DirectedGraph();

      graph.setNode('joy', {
        def: 'Joy is man\'s passage from a less to a greater perfection'
      });

      graph.setEdge('joy', 'desire');

      expect(graph.edges.get('joy')).to.be.undefined;
    });
  });
});
