/* eslint-disable react/display-name */
import * as React from 'react';
import { RenderLeaf } from '@udecode/plate-core';
import { RenderLeafProps } from 'slate-react';
import { PreviewLeaf } from './PreviewLeaf/PreviewLeaf';

export const getPreviewRenderLeaf = (): RenderLeaf => () => (
  props: RenderLeafProps
) => <PreviewLeaf {...props} />;
