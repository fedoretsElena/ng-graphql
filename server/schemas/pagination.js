function applyCursorsToEdges(allEdges, before, after) {
  if (after) {
    const afterEdge = allEdges.findIndex(edge => edge.cursor === parseInt(after));
    allEdges.splice(0, afterEdge + 1);
  }

  if (before) {
    const beforeEdge = allEdges.findIndex(edge => edge.cursor === parseInt(before));
    allEdges.splice(beforeEdge, allEdges.length - 1);
  }

  return allEdges;
};

exports.pageInfoToReturn = function pageInfoToReturn(allEdges, first, last, after, before) {
  const edges = applyCursorsToEdges([...allEdges], before, after);
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false
  };

  if (last || !!after) {
    const afterEdge = allEdges.findIndex(edge => edge.cursor === parseInt(after));
    pageInfo.hasPreviousPage = edges.length > last || afterEdge > -1;
  }

  if (first || !!before) {
    const beforeEdge = allEdges.findIndex(edge => edge.cursor === parseInt(before));
    pageInfo.hasNextPage = edges.length > first || beforeEdge > -1;
  }

  return pageInfo;
};

exports.edgesToReturn = function edgesToReturn(allEdges, first, last, after, before) {
  const edges = applyCursorsToEdges([...allEdges], before, after);

  if (first) {
    if (first < 0) {
      throw new Error('First cant be less then 0');
    }

    return edges.length > first ? edges.slice(0, first) : edges;
  }

  if (last) {
    if (last < 0) {
      throw new Error('Last cant be less then 0');
    }
    return edges.length >= last ? edges.slice(edges.length - last, edges.length) : edges;
  }

  return edges;
};
