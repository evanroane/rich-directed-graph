import DirectedGraph from '../src/index';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('deleteEdge', () => {
  it('should delete an edge', () => {
    const graph = new DirectedGraph();

    graph
      .setNode('desire', {
        def: 'appetite together with consciousness of the appetite'
      })
      .setNode('joy', {
        def: 'passage from a less to a greater perfection'
      })
      .setEdge('joy', 'desire');


    expect(graph.edges.get('joy')).to.include('desire');

    graph.deleteEdge('joy');

    expect(graph.edges.size).to.equal(0);
  });
});