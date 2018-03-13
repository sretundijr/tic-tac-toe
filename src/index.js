import './styles.css';

const getUserAgent = () => {
  const ua = navigator.userAgent;
  return {
    iphone: ua.match(/(iPhone|iPod|iPad)/),
    android: ua.match(/Android/)
  }
}

const ratingListEvent = () => {
  const ratingList = document.getElementsByClassName('rating-item-js');
  Array.from(ratingList).forEach((item) => {
    if (getUserAgent().iphone || getUserAgent().andriod) {
      item.addEventListener('click', ratingClickEvent);
    } else {
      item.addEventListener('click', ratingClickEvent);
      item.addEventListener('mouseenter', mouseEnterEvent);
      item.addEventListener('keypress', enterKeyEvent);
    }
  })
}

// added for accessibility, button element presses are expected to be space or enter
const enterKeyEvent = (e) => {
  const key = e.which || e.keyCode;
  const enterKey = 13;
  const spaceKey = 32;
  if (key === enterKey || key === spaceKey) {
    const stateUpdate = AppState.setUserSelection(extractUserSelection(e.target.id));
    setHtml(stateUpdate);
    showUserCommentTemplate(stateUpdate);
  }
}

const ratingClickEvent = (e) => {
  const targetId = e.target.id || e.target.parentElement.id || e.target.farthestViewportElement.parentElement.id;
  const userSelection = extractUserSelection(targetId);
  const stateUpdate = AppState.setUserSelection(userSelection);
  setHtml(stateUpdate);
  showUserCommentTemplate(userSelection);
}

const mouseEnterEvent = (e) => {
  const stateUpdate = AppState.setUserSelection(extractUserSelection(e.target.id));
  setHtml(stateUpdate);
}

const setHtml = (stateUpdated) => {
  if (stateUpdated) {
    document.getElementById('rating-list').innerHTML = AppState.ratingTemplate();
    ratingListEvent();
  }
}

const extractUserSelection = (elementId) => {
  const fillRate = elementId.replace('-star', '');
  return parseInt(fillRate, 10);
}

const showUserCommentTemplate = (userSelection) => {
  document.getElementById('feedback-container').innerHTML = AppState.userFeedbackTemplate();
  if (AppState.userFeedbackTemplate() !== '') {
    userFeedbackEvent();
  } else {
    //     for ratings of 4 or better submission can happen here
    console.log(AppState.getUserFeedback());
  }
}

const userFeedbackEvent = () => {
  const feedbackSubmit = document.getElementById('user-feedback-btn');
  const comment = document.getElementById('user-comment');
  feedbackSubmit.addEventListener('click', () => {
    AppState.setUserComment(comment.value);
    //     for ratings of 3 or less submission happens here after getting some comments from the user
    console.log(AppState.getUserFeedback());
  })
}

const incrementElementIndex = (number) => {
  return number + 1;
}

const unratedListItemTemplate = (idNumber) => {
  return (
    `<li 
      id="${incrementElementIndex(idNumber)}-star" 
      class="rating-item-js rating-item-style" 
      role="button" 
      tabindex="${incrementElementIndex(idNumber)}"
      >
        <i class="far fa-star"></i>
    </li>`
  )
}

const ratedListItemTemplate = (idNumber) => {
  return (
    `<li 
      id="${incrementElementIndex(idNumber)}-star" 
      class="rating-item-js selected-rating-style" 
      role="button" 
      tabindex="${incrementElementIndex(idNumber)}"  
      >
        <i class="fas fa-star"></i>
    </li>`
  )
}

const clientFeedbackTemplate = () => {
  return (
    `
    <p class="feedback-note">
      Thanks for the feedback.  We are always trying to improve the client experience, if you wouldn't mind leaving a comment so we can improve upon your next visit. **Optional
    </p>
    <div id="comment-container">
      <textarea 
      class="user-comment-style" 
      name="user-comment" 
      id="user-comment" 
      placeholder="Leave blank and press submit if you would like to skip this step" cols="30" rows="10"
      ></textarea>
    </div>
    <button id="user-feedback-btn" class="feedback-btn-style">Submit</button>
  `
  )
}

// state management
class RatingState {
  constructor() {
    this.state = {
      initialRatingScale: 5,
      requireFeedbackRating: 3,
      htmlTemplateArray: [],
      user: {
        userSelection: 0,
        _id: 1111111,
        comment: '',
      }
    }
  }

  getUserFeedback() {
    return this.state.user;
  }

  setUserComment(comment) {
    this.state.user.comment = comment;
  }

  getInitialRatingScale() {
    return this.state.initialRatingScale;
  }

  setUserSelection(amount) {
    if (amount !== this.state.user.userSelection) {
      this.state.user.userSelection = amount;
      return true;
    }
    return false;
  }

  getUserSelection() {
    return this.state.user.userSelection;
  }

  ratingTemplate() {
    for (let i = 0; i < this.state.initialRatingScale; i++) {
      if (i < this.state.user.userSelection) {
        this.state.htmlTemplateArray[i] = ratedListItemTemplate(i);
      } else {
        this.state.htmlTemplateArray[i] = unratedListItemTemplate(i);
      }
    }

    return this.state.htmlTemplateArray.join('');
  }

  userFeedbackTemplate() {
    if (this.state.user.userSelection <= this.state.requireFeedbackRating) {
      return clientFeedbackTemplate();
    }
    return '';
  }
}

const AppState = new RatingState();

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('rating-list').innerHTML = AppState.ratingTemplate();
  ratingListEvent();
});


