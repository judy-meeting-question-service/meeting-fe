import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function RandomQuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [tag, setTag] = useState('');
  const [savedAnswers, setSavedAnswers] = useState([]);
  const [knownQuestions, setKnownQuestions] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const showInitialQuestion = useCallback((questionsList) => {
    if (questionsList.length > 0) {
      const randomIndex = Math.floor(Math.random() * questionsList.length);
      setCurrentQuestion(questionsList[randomIndex]);
      loadSavedAnswers(questionsList[randomIndex]?.id);
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/questions')
      .then(response => {
        setQuestions(response.data);
        const tags = Array.from(new Set(response.data.flatMap(q => q.tags)));
        setAvailableTags(tags);
        showInitialQuestion(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [showInitialQuestion]);

  const getRandomQuestion = (tag) => {
    if (questions.length === 0) return;
    const filteredQuestions = tag 
      ? questions.filter(q => q.tags.includes(tag) && !knownQuestions.includes(q.id))
      : questions.filter(q => !knownQuestions.includes(q.id));
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex]);
    setAnswer('');
    loadSavedAnswers(filteredQuestions[randomIndex]?.id);
    handleHideDescription();
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setTag(selectedTag);
    getRandomQuestion(selectedTag);
  };

  const handleSaveAnswer = () => {
    if (!currentQuestion) return;
    const newSavedAnswers = [...savedAnswers, { questionId: currentQuestion.id, answer }];
    setSavedAnswers(newSavedAnswers);
    localStorage.setItem('savedAnswers', JSON.stringify(newSavedAnswers));
    setAnswer('');
  };

  const handleDeleteAnswer = (index) => {
    const newSavedAnswers = savedAnswers.filter((_, i) => i !== index);
    setSavedAnswers(newSavedAnswers);
    localStorage.setItem('savedAnswers', JSON.stringify(newSavedAnswers));
  };

  const handleShowDescription = () => {
    document.getElementById('description').style.display = 'flex';
  };

  const handleHideDescription = () => {
    document.getElementById('description').style.display = 'none';
  };

  const handleKnown = () => {
    if (currentQuestion) {
      setKnownQuestions([...knownQuestions, currentQuestion.id]);
      getRandomQuestion(tag);
    }
  };

  const loadSavedAnswers = (questionId) => {
    const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers') || '[]');
    setSavedAnswers(savedAnswers.filter(answer => answer.questionId === questionId));
  };

  return (
    <div>
      <div className="questionlist-header">
        <h1 style={{ textAlign: "left", fontSize: "18px", fontWeight: "bold", width: "200px" }}>랜덤 퀴즈 풀기</h1>
        <div className="search-question">
          <select value={tag} onChange={handleTagChange}>
            <option value="">전체 질문 보기</option>
            {availableTags.map((t, index) => (
              <option key={index} value={t}>#{t}</option>
            ))}
          </select>
        </div>
      </div>

      {currentQuestion && (
        <div className="question-card">
          <div className='question-card-content'>
            <h1 style={{ textAlign: "left", fontSize: "16px", fontWeight: "bold" }}>{currentQuestion.question}</h1>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="이곳에 답변을 적어주세요."
            />
            <div className="card-floor">
              <div className="card-buttons ans">
                <button className="ans-button" onClick={handleShowDescription}>정답 보기</button>
                <button className="ans-button" onClick={handleSaveAnswer}>답변 추가하기</button>
              </div>
              <div className="card-buttons">
                <button className="ans-button" onClick={handleKnown}>다음엔 이 질문 넘어가기</button>
                <button onClick={() => getRandomQuestion(tag)}>Next</button>
              </div>
            </div>
            <div className="answer" id="description" style={{display: "none"}}>
              <h1 style={{ textAlign: "left", fontSize: "15px", fontWeight: "bold", width: "200px" }}>정답</h1>
              <p>{currentQuestion.description}</p>              
              <p className="tags">
                {currentQuestion.tags.map((tag, index) => (
                  <span key={index} className="tag-box">
                    #{tag}
                  </span>
                ))}
              </p>
              <hr />
              <h1 style={{ textAlign: "left", fontSize: "15px", fontWeight: "bold", width: "200px" }}>추가 답변</h1>
              <ul className="additional-ans">
                {savedAnswers.map((ans, index) => (
                  <li key={index}>
                    {ans.answer}
                    <div className="card-buttons"><button className="ans-button" onClick={() => handleDeleteAnswer(index)}>Delete</button></div>
                    <div className="space" style={{ height: "20px" }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="space" style={{ height: "10px" }} />
    </div>
  );
}

export default RandomQuestionPage;
