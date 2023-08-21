import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getStore } from './redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  NOTES_CREATE_PATH,
  NOTES_EDIT_PATH,
  NOTES_LIST_PATH,
} from '@self-notes/utils';
import { NotesList, NoteCreate, NoteEdit } from './pages';
import { BaseMessageBus } from '@self-notes/clients-message-bus';
import { Subject } from 'rxjs';

const messageBusMock: BaseMessageBus = {
  sendCommand: () => {},
  sendQuery: () => {
    return new Subject();
  },
  listenCommands: () => {},
};

const router = createBrowserRouter([
  {
    path: NOTES_LIST_PATH,
    element: <NotesList messageBus={messageBusMock} />,
  },
  {
    path: NOTES_CREATE_PATH,
    element: <NoteCreate messageBus={messageBusMock} />,
  },
  {
    path: `${NOTES_EDIT_PATH}/:noteId`,
    element: <NoteEdit messageBus={messageBusMock} />,
  },
]);

const store = getStore({ messageBus: messageBusMock });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
