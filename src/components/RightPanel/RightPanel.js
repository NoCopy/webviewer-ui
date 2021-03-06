import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ResizeBar from 'components/ResizeBar';
import selectors from 'selectors';
import useMedia from 'hooks/useMedia';
import classNames from 'classnames';

import './RightPanel.scss';

const RightPanel = ({ children, dataElement, onResize }) => {
  const [
    currentToolbarGroup,
    isToolsHeaderOpen,
    isOpen,
    isDisabled,
  ] = useSelector(
    state => [
      selectors.getCurrentToolbarGroup(state),
      selectors.isElementOpen(state, 'toolsHeader'),
      selectors.isElementOpen(state, dataElement),
      selectors.isElementDisabled(state, dataElement),
    ],
    shallowEqual,
  );

  const isTabletAndMobile = useMedia(
    // Media queries
    ['(max-width: 900px)'],
    [true],
    // Default value
    false,
  );

  const isVisible = isOpen && !isDisabled;

  return (
    <div
      className={classNames({
        'right-panel': true,
        'closed': !isVisible,
        'tools-header-open': isToolsHeaderOpen && currentToolbarGroup !== 'toolbarGroup-View',
      })}
    >
      {!isTabletAndMobile &&
        <ResizeBar
          dataElement={`${dataElement}ResizeBar`}
          minWidth={293}
          onResize={onResize}
          leftDirection
        />}
      {children}
    </div>
  );
};

export default RightPanel;
