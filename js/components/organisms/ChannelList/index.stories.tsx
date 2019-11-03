import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Component from '.';
import { Channel } from '../../../types/global';

const channel: Channel = {
  album: '',
  bitrate: 0,
  channelId: '',
  comment: '',
  contactUrl: '',
  contentType: '',
  creator: '',
  description: '',
  genre: '',
  listeners: 0,
  name: '',
  relays: 0,
  trackTitle: '',
  trackUrl: '',
  tracker: '',
  uptime: 0,
  yellowPage: '',
};

const actionProps = {};

storiesOf('ChannelList', module).add('normal', () => (
  <div style={{ width: 600, backgroundColor: 'orange' }}>
    <Component list={[channel, channel]} {...actionProps} />
  </div>
));
