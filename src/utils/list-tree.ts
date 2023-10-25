/**
 * 列表转树结构
 * @param list 列表
 * @returns
 */
export function listToTree(list: any[]) {
  const listMap = new Map();
  for (const item of list) {
    listMap.set(item.id, item);
  }
  return list.filter((item) => {
    const parent = listMap.get(item.parentId);
    if (parent) {
      parent.children = parent.children ?? [];
      parent.children.push(item);
    }
    return !item.parentId;
  });
}
