/* @flow strict-local */

import React from 'react';
import type { Node } from 'react';

import * as NavigationService from '../nav/NavigationService';
import type { Narrow } from '../types';
import { useSelector } from '../react-redux';
import { getStreams } from '../selectors';
import NavButton from '../nav/NavButton';
import { navigateToTopicList } from '../actions';
import { streamNameOfNarrow } from '../utils/narrow';

type Props = $ReadOnly<{|
  narrow: Narrow,
  color: string,
|}>;

export default function ExtraNavButtonStream(props: Props): Node {
  const streams = useSelector(getStreams);
  const { color } = props;

  return (
    <NavButton
      name="list"
      color={color}
      onPress={() => {
        const { narrow } = props;
        const streamName = streamNameOfNarrow(narrow);
        const stream = streams.find(x => x.name === streamName);
        if (stream) {
          NavigationService.dispatch(navigateToTopicList(stream.stream_id));
        }
      }}
    />
  );
}
