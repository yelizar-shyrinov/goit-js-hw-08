import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailInputRef = document.querySelector("[name='email']");
const textareaMessageRef = document.querySelector("[name='message']");

const FEEDBACK_STATE_KEY = 'feedback-form-state';

emailInputRef.addEventListener('input', createInputEventListener('email'));

textareaMessageRef.addEventListener('input', createInputEventListener('message'));

formRef.addEventListener('submit', formSubmitListener);

window.addEventListener('load', initialLoad);

function formSubmitListener(event) {
    event.preventDefault();

    const feedbackState = getFeedbackState();

    console.log(feedbackState);

    localStorage.removeItem(FEEDBACK_STATE_KEY);
    emailInputRef.value = '';
    textareaMessageRef.value = '';
}

function initialLoad() {
    const feedbackStateString = localStorage.getItem(FEEDBACK_STATE_KEY);

    if (feedbackStateString) {
        const feedbackState = JSON.parse(feedbackStateString);

        emailInputRef.value = feedbackState.email;
        textareaMessageRef.value = feedbackState.message;
    }
}

function createInputEventListener(fieldName) {
    return throttle(function (event) {
        const value = event.target.value;

        saveField(fieldName, value);
    }, 500); 
}

function saveField(fieldName, value) {
    const feedbackState = getFeedbackState();

    feedbackState[fieldName] = value;

    localStorage.setItem(FEEDBACK_STATE_KEY, JSON.stringify(feedbackState));
}

function getFeedbackState () {
    const feedbackStateString = localStorage.getItem(FEEDBACK_STATE_KEY);
    let feedbackState;

    if (feedbackStateString) {
        feedbackState = JSON.parse(feedbackStateString);
    } else {
        feedbackState = { email: '', message: '' };
    }

    return feedbackState;
}