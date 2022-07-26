import { Formik, Form } from 'formik';
import Modal from 'react-modal';
import { memo, useState } from 'react';



const ReviewModal = memo(({closeModal}) => {

	return (
		<Formik>
            <Form className='submit-message-modal'>
                <button onClick={() => closeModal(false)} type='button'>X</button>
                <label htmlFor=""></label>
                <input type="text" id='' name='' placeholder='' />
                <button type='submit'></button>
            </Form>
        </Formik>
	);
})

export default ReviewModal;
