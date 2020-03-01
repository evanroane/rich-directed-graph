import { expect } from 'chai';
import DirectedGraph from '../src/index';
import { describe, it } from 'mocha';

describe('setNode', () => {
  const graph = new DirectedGraph();

  it('should set a node with an empty object if no content is provided', () => {
    graph.setNode('');
    expect(graph.nodes.size).to.equal(1);
  });

  it('should add a node', () => {
    graph.setNode('desire', {
      def: 'appetite together with consciousness of the appetite'
    });

    expect(graph.nodes.get('desire').def).to.equal('appetite together with consciousness of the appetite');
  });

  it('should add a second, independent node', () => {
    graph.setNode('joy', {
      def: 'passage from a lesser to a greater perfection'
    });

    expect(graph.nodes.get('desire').def).to.equal('appetite together with consciousness of the appetite');
    expect(graph.nodes.get('joy').def).to.equal('passage from a lesser to a greater perfection');
  });

  it('should replace the node when set on the same key', () => {
    graph.setNode('desire', { def: 'something else' });

    expect(graph.nodes.get('desire').def).to.equal('something else');
  });
});
