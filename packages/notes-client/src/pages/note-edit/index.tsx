import React, { useContext } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { NoteForm } from '../../components';
import { UpdateNoteDto } from '../../redux';
import { useParams } from 'react-router-dom';
import {
  BaseMessageBus,
  NavigateCommand,
  NotificationCommand,
} from '@self-notes/clients-message-bus';
import { NOTES_LIST_PATH } from '@self-notes/utils';
import { ApiContext } from '../../contexts/api';

type Props = {
  messageBus: BaseMessageBus;
};

export const NoteEdit = (props: Props) => {
  const noteId =
    useParams().noteId || window.location.pathname.split('/')?.pop();
  const api = useContext(ApiContext)!;
  const { data, isLoading, error } = api.useNotesControllerFindAllQuery({
    'filter.id': `$eq:${noteId}`,
  });
  const note = data?.data?.[0];
  const [updateNote, { isLoading: isSaving, isError: saveError }] =
    api.useNotesControllerUpdateMutation();

  const { messageBus } = props;

  const handleEditNote = async (data: UpdateNoteDto) => {
    await updateNote({ id: String(data.id), updateNoteDto: data }).then(
      (response) => {
        if (!('error' in response)) {
          messageBus.sendCommand<NotificationCommand>({
            name: 'showNotification',
            data: {
              type: 'success',
              message: 'Successfuly updated',
            },
          });
          messageBus.sendCommand<NavigateCommand>({
            name: 'navigate',
            data: NOTES_LIST_PATH,
          });
        }
      }
    );
  };

  return (
    <React.Fragment>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : note ? (
        <NoteForm
          mode="edit"
          data={note}
          onSubmit={handleEditNote}
          isSaving={isSaving}
          saveError={saveError}
          messageBus={messageBus}
        />
      ) : null}
    </React.Fragment>
  );
};
