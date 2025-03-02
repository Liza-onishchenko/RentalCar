import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState, useRef, useEffect } from 'react';
import { BookingSchema } from '../../schemas';
import css from './BookingForm.module.css';
import Calendar from '../Calendar/Calendar.jsx';

const BookingForm = ({ carId }) => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const dateFieldId = useId();
  const commentFieldId = useId();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);

  const initialValues = {
    name: '',
    email: '',
    bookingDate: null,
    comment: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setSubmitting(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !dateInputRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.bookingForm}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div>
              <Field
                name="name"
                id={nameFieldId}
                className={css.input}
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>
            <div>
              <Field
                name="email"
                id={emailFieldId}
                className={css.input}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.datePickerContainer} ref={calendarRef}>
              <div
                ref={dateInputRef}
                className={css.input}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {values.bookingDate
                  ? values.bookingDate.toLocaleDateString('uk-UA')
                  : 'Booking date'}
              </div>
              {isCalendarOpen && (
                <div className={css.calendarPopup}>
                  <Calendar
                    selectedDate={values.bookingDate}
                    onDateChange={date => {
                      setFieldValue('bookingDate', date);
                      setIsCalendarOpen(false);
                    }}
                  />
                </div>
              )}
              <Field
                type="hidden"
                name="bookingDate"
                value={values.bookingDate || ''}
              />
              <ErrorMessage
                name="bookingDate"
                component="span"
                className={css.error}
              />
            </div>
            <div>
              <Field
                as="textarea"
                name="comment"
                id={commentFieldId}
                className={css.input}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              Send
              {isSubmitting}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
