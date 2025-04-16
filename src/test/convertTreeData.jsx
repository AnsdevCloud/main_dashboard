// convertTreeData.js
export const convertTreeData = (tree) => {
  const nodes = [];
  const links = [];

  const traverse = (node) => {
    // Add current node
    nodes.push({ id: node.id, value: node.value });

    // Check all four directions and add links if the child exists
    ["top", "bottom", "left", "right"].forEach((dir) => {
      if (node[dir]) {
        links.push({ source: node.id, target: node[dir].id, direction: dir });
        traverse(node[dir]);
      }
    });
  };

  traverse(tree);
  return { nodes, links };
};
