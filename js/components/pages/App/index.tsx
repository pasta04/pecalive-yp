import React from 'react';
import { connect } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../actions';
import Snackbar from '../../molecules/SnackBar';
import Modal from '../../molecules/Modal';
import { GlobalState, RootState } from '../../../reducers';
import Dialog from '../../organisms/Dialog';
import ChannelList from '../../organisms/ChannelList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      top: '-60px',
    },
    icon: {},
  }),
);

type ComponentProps = {
  notify: GlobalState['notify'];
  list: GlobalState['list'];
  dialog: GlobalState['dialog'];
};
type ActionProps = typeof mapDispatchToProps;

type PropsType = ComponentProps & ActionProps;
const App: React.SFC<PropsType> = (props: PropsType) => {
  const classes = useStyles({});

  return (
    <div>
      {/* リスト */}
      <ChannelList list={props.list} />

      {/* 通知系 */}
      <Dialog />
      <Modal open={props.dialog.show} modalClose={props.closeModal}>
        {props.dialog.message}
      </Modal>
      <Snackbar open={props.notify.show} message={props.notify.message} variant={props.notify.type} onClose={props.closeNotify} />
    </div>
  );
};

// state
const mapStateToProps = (state: RootState): ComponentProps => {
  return {
    notify: state.reducer.notify,
    list: state.reducer.list,
    dialog: state.reducer.dialog,
  };
};

// action
const mapDispatchToProps = {
  closeNotify: actions.closeNotify,
  closeModal: actions.closeDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
