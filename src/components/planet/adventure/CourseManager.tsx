import { IconChevronDown } from '@tabler/icons-react';
import { Checkbox, Group, RenderTreeNodePayload, Tree } from '@mantine/core';
import { getCourse } from '@/components/../utils/data';


const formatTreeData = (courseData: any) => {
    return courseData.map((step: any) => ({
      label: step.title,
      initiallyOpen: false,
      children: step.units.map((unit: any) => ({
        label: unit.title,
        initiallyOpen: false,
        children: unit.lessons.map((lesson: any) => ({
          label: lesson.title,
          initiallyOpen: false,
          children: lesson.modules.map((module: any, moduleIndex: number) => ({
            label: `Module ${moduleIndex + 1}`,
            initiallyOpen: false,
            children: module.map((content: any) => ({
              label: content.title
            }))
          }))
        }))
      }))
    }));
  };

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  return <Tree data={getCourse("eo")} levelOffset={23} expandOnClick={false} renderNode={renderTreeNode} />;
}

export default Demo;