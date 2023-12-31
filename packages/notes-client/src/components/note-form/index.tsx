import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFormik } from 'formik';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NoteFormValues } from '../../redux/types';
import { CreateNoteDto, DayMood, Notes, UpdateNoteDto } from '../../redux';
import styles from './index.module.sass';
import {
  BaseMessageBus,
  NavigateCommand,
} from '@self-notes/clients-message-bus';
import { NOTES_LIST_PATH } from '@self-notes/utils';

type CommonProps = {
  isSaving: boolean;
  saveError: boolean;
  messageBus: BaseMessageBus;
};

type CreateProps = {
  onSubmit: (data: CreateNoteDto) => Promise<void>;
  mode: 'create';
} & CommonProps;

type EditProps = {
  onSubmit: (data: UpdateNoteDto) => Promise<void>;
  data: Notes;
  mode: 'edit';
} & CommonProps;

const MAX_TEXT_LENGTH = 256;
const REQUIRED_TEXT = 'Field is required';

const validationSchema = yup.object({
  text: yup
    .string()
    .max(MAX_TEXT_LENGTH, `Max length is ${MAX_TEXT_LENGTH}`)
    .required(REQUIRED_TEXT),
  date: yup.date().required(REQUIRED_TEXT),
});

export const NoteForm = (props: CreateProps | EditProps) => {
  const { mode, onSubmit, isSaving, messageBus } = props;

  const renderTitle = () => (
    <h1>{mode === 'edit' ? 'Edit note' : 'Create note'}</h1>
  );

  const getInitialValues = (): NoteFormValues => {
    if (mode === 'edit') {
      const { date, dayMood, text } = props.data;
      return {
        date: new Date(date),
        dayMood,
        text,
      };
    } else
      return {
        date: new Date(),
        dayMood: DayMood.good,
        text: '',
      };
  };

  const formik = useFormik<NoteFormValues>({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (mode === 'edit') {
        await onSubmit({
          id: props.data.id,
          ...values,
          date: values.date.toISOString(),
        });
      } else await onSubmit({ ...values, date: values.date.toISOString() });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: '100%', maxWidth: '600px' }}
    >
      {renderTitle()}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          slotProps={{
            textField: {
              fullWidth: true,
              error: formik.touched.date && Boolean(formik.errors.date),
              helperText:
                formik.touched.date && formik.errors.date ? (
                  <>{formik.errors.date}</>
                ) : null,
              onBlur: formik.handleBlur,
            },
          }}
          sx={{ mb: 3 }}
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue('date', value)}
          disabled={formik.isSubmitting}
        />
      </LocalizationProvider>
      <FormControl fullWidth sx={{ mb: 3 }} disabled={formik.isSubmitting}>
        <FormLabel>Your mood</FormLabel>

        <RadioGroup
          name="mood"
          value={formik.values.dayMood}
          onChange={(event) => {
            formik.setFieldValue('dayMood', event.target.value);
          }}
          onBlur={formik.handleBlur}
        >
          <FormControlLabel
            value={DayMood.good}
            control={
              <Radio
                icon={<SentimentVerySatisfiedIcon />}
                checkedIcon={<SentimentVerySatisfiedIcon />}
              />
            }
            label="Good"
          />
          <FormControlLabel
            value={DayMood.normal}
            control={
              <Radio
                icon={<SentimentNeutralIcon />}
                checkedIcon={<SentimentNeutralIcon />}
              />
            }
            label="Normal"
          />
          <FormControlLabel
            value={DayMood.bad}
            control={
              <Radio
                icon={<SentimentVeryDissatisfiedIcon />}
                checkedIcon={<SentimentVeryDissatisfiedIcon />}
              />
            }
            label="Bad"
          />
        </RadioGroup>
        {formik.touched.dayMood && Boolean(formik.errors.dayMood) && (
          <FormHelperText error>{formik.errors.dayMood}</FormHelperText>
        )}
      </FormControl>
      <TextField
        id="text"
        label="How do you feel?"
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 3 }}
        name="text"
        disabled={formik.isSubmitting}
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />
      <LoadingButton
        loading={isSaving}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
      >
        <span>Save</span>
      </LoadingButton>
      <Button
        variant="outlined"
        className={styles.cancelBtn}
        onClick={() =>
          props.messageBus.sendCommand<NavigateCommand>({
            name: 'navigate',
            data: NOTES_LIST_PATH,
          })
        }
      >
        Cancel
      </Button>
    </form>
  );
};
