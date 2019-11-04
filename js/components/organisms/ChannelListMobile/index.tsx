import React, { InputHTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Channel } from '../../../types/global';
import Play from '@material-ui/icons/PlayArrow';
import { Paper, Typography, Fab, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
  }),
);

type ComponentProps = {
  list: Channel[];
};
type ActionProps = {};

type PropsType = ComponentProps & ActionProps;

const ChannelList: React.SFC<PropsType> = props => {
  const classes = useStyles();

  const [list, setList] = React.useState(props.list);
  React.useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const [search, setSearch] = React.useState('');

  const handleClick = (rowData: Channel) => {
    window.open(`http://peca.live/channels/${rowData.channelId}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const searchWord = event.target.value;
    setSearch(searchWord);

    const newList = props.list.filter(channel => {
      return channel.name.includes(searchWord) || channel.description.includes(searchWord) || channel.genre.includes(searchWord);
    });
    setList(newList);
  };

  const createChannel = (channel: Channel, index: number) => {
    return (
      <Paper className={classes.paper} key={index}>
        <div style={{ display: 'flex' }}>
          <Fab
            variant={'round'}
            size={'small'}
            onClick={() => {
              handleClick(channel);
            }}
            color={'primary'}
          >
            <Play />
          </Fab>
          <div style={{ display: 'block', width: 'calc(100% - 45px)', marginLeft: '5px' }}>
            <Typography variant="h6">{channel.name}</Typography>
            <Typography variant="caption">
              {channel.genre} - {channel.description}
            </Typography>
          </div>
        </div>
      </Paper>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* 絞り込み */}
      <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white' }}>
        <TextField value={search} onChange={handleChange} fullWidth={true} placeholder={'検索ワード'} />
      </div>
      {list.map(createChannel)}
    </div>
  );
};

export default ChannelList;
