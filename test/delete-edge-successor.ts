import DirectedGraph from '../src/index';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('deleteEdgeSuccessor', () => {
  it('should delete an edge', () => {
    const graph = new DirectedGraph();

    graph
      .setNode('desire', {
        def: 'appetite together with consciousness of the appetite'
      })
      .setNode('joy', {
        def: 'passage from a less to a greater perfection'
      })
      .setNode('sadness', {
        def: 'passage from greater to a lesser perfection'
      })
      .setEdge('joy', 'desire')
      .setEdge('joy', 'sadness');


    expect(graph.edges.get('joy')).to.include('desire');
    expect(graph.edges.get('joy')).to.include('sadness');

    graph.deleteEdgeSuccessor('joy', 'sadness');

    expect(graph.edges.get('joy')).to.not.include('sadness');
  });
});