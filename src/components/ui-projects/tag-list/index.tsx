import React from 'react';
import Flex from 'components/foundation/flex';
import Tag from 'components/ui-parts/tag';

export interface TagListProps {
  contents: any,
  justifyContent?: 'j-flex-start' | 'j-center' | 'j-flex-end' | 'j-between';
  spSize?: 'small' | 'medium' | 'large';
  pcSize?: 'small' | 'medium' | 'large';
}

export const TagList: React.FC<TagListProps> = ({
    contents,
    justifyContent = 'j-center',
    spSize = 'medium',
    pcSize = 'medium',
  }) => {
  return (
    <Flex justifyContent={justifyContent} gap='xsmall' flexWrap='wrap'>
      {contents.map((content) => (
        <li key={content.id}>
          <Tag content={content} spSize={spSize} pcSize={pcSize} />
        </li>
      ))}
    </Flex>
  );
}

export default React.memo(TagList);