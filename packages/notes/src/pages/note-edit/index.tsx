import React from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { NoteForm } from '../../components';
import { useGetNoteQuery, useUpdateNoteMutation } from '../../redux';
import { Note } from '../../redux/types';

export const NoteEdit = () => {
  const noteId = '1';
  const { data, isLoading, error } = useGetNoteQuery(noteId);
  const [updateNote, { isLoading: isSaving, isError: saveError }] =
    useUpdateNoteMutation();

  const handleEditNote = async (data: Note) => {
    await updateNote(data);
  };

  return (
    <React.Fragment>
      {error ? (
        <Alert severity="error">Oops, somthing went wrong...</Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : data ? (
        <NoteForm
          mode="edit"
          data={data}
          onSubmit={handleEditNote}
          isSaving={isSaving}
          saveError={saveError}
        />
      ) : null}
    </React.Fragment>
  );
};
