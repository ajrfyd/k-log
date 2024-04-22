import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

type TagProps = {
  // key: string;
  title: string;
  onClick: () => void;
  selected: boolean;
};

// const Tag = ({ title, onClick }: TagProps) => <TagContainer onClick={onClick}>{title}</TagContainer>;
const Tag = ({ title, onClick, selected }: TagProps) => {
  return (
    <TagContainer onClick={onClick} selected={selected}>
      {title}
    </TagContainer>
  );
};

export default React.memo(Tag);
// export default Tag;

const TagContainer = styled.li<Pick<TagProps, 'selected'>>`
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.3rem 1rem;
  border-radius: 7px;
  color: ${darken(0.05, 'purple')};

  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--teal);
    `}

  &:hover {
    color: ${lighten(0.1, 'purple')};
  }

  & + & {
    margin-left: 1rem;
  }
`;
