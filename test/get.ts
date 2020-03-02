import { getPopulatedGraph } from './populated-graph';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('get', () => {
  it('should get all data related to joy', () => {
    const graph = getPopulatedGraph();

    const joy = graph.get('joy');

    expect(joy).to.deep.equal({
      node: 'joy',
      data: { def: 'passage from a lesser to a greater perfection' },
      edges: new Set(),
      inDegree: 3,
      outDegree: 0
    });
  });

  it('should get all data related to devotion', () => {
    const graph = getPopulatedGraph();

    const devotion = graph.get('devotion');

    expect(devotion).to.deep.equal({
      node: 'devotion',
      data: { def: 'a Love of one whom we wonder at' },
      edges: new Set(['love', 'wonder']),
      inDegree: 0,
      outDegree: 2
    });
  });
});