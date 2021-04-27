import DirectedGraph from '../src/index';
import { ethicaLinkedList } from './ethica-linked-list';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Linked list to graph', () => {
  it('should populate a rich directed graph from a linked list', () => {
    const graph = new DirectedGraph();

    ethicaLinkedList.forEach(({child, parent}: {child: string, parent: string}) => {
      graph.setNode(child);
      graph.setNode(parent);
    });

    ethicaLinkedList.forEach(({child, parent}: {child: string, parent: string}) => {
      graph.setEdge(parent, child);
    });

    const sectionThreePropositionSeven = graph.get('3P07');

    const expectedResult = {
      data: {},
      edges: new Set([
        '3P09', '3P10', '3P37', '3P54', '4P04', '4P05', '4P08', '4P15', '4P18',
        '4P20', '4P21', '4P22', '4P25', '4P26', '4P32', '4P33', '4P60', '4P64',
        '5P08', '5P09', '5P25'
      ]),
      inDegree: 3,
      node: '3P07',
      outDegree: 21
    };

    expect(sectionThreePropositionSeven).to.deep.equal(expectedResult);
  });
});
