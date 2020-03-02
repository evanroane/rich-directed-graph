import DirectedGraph from '../src';

function getPopulatedGraph(): any {
  return new DirectedGraph()
    .setNode('desire', {def: 'appetite with the consciousness of it'})
    .setNode('joy', {def: 'passage from a lesser to a greater perfection'})
    .setNode('sadness', {def: 'passage from a greater to a lesser perfection'})
    .setNode('wonder', {def: 'an imagination of a thing the Mind in which the mind remains fixed because this singular imagination has no connection with the others'})
    .setNode('disdain', {def: 'an imagination of a thing which touches the Mind so little that the thing\'s presence moves the Mind to imagining more what is not in it than what is'})
    .setEdge('disdain', 'sadness')
    .setNode('love', {def: 'a Joy accompanied by the idea of an external cause'})
    .setEdge('love', 'joy')
    .setNode('hate', {def: 'a Sadness, accompanied by the idea of an external cause'})
    .setEdge('hate', 'sadness')
    .setNode('inclination', {def: 'a Joy accompanied by the idea of a thing which is the accidental cause of Joy'})
    .setEdge('inclination', 'joy')
    .setNode('aversion', {def: 'a Sadness accompanied by the idea of something which is the accidental cause of Sadness'})
    .setEdge('aversion', 'sadness')
    .setNode('devotion', {def: 'a Love of one whom we wonder at'})
    .setEdge('devotion', 'love')
    .setEdge('devotion', 'wonder')
    .setNode('mockery', {def: 'a Joy born of the fact that we imagine something we Disdain in a thing we Hate'})
    .setEdge('mockery', 'joy')
    .setEdge('mockery', 'disdain')
    .setEdge('mockery', 'hate');
}

export default getPopulatedGraph;